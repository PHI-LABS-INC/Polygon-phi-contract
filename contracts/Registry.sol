// SPDX-License-Identifier: GPL-2.0-or-later

//                 ____    ____
//                /\___\  /\___\
//       ________/ /   /_ \/___/
//      /\_______\/   /__\___\
//     / /       /       /   /
//    / /   /   /   /   /   /
//   / /   /___/___/___/___/
//  / /   /
//  \/___/

pragma solidity ^0.8.7;
import { IPhiMap } from "./interfaces/IPhiMap.sol";
import { AccessControlUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

/// @title Phi Registry Contract
contract Registry is AccessControlUpgradeable {
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------- INTERFACE ------------------------------- */
    address public map;
    address private _adminSigner;
    /* --------------------------------- COUNTER -------------------------------- */
    uint256 public claimed;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   STORAGE                                  */
    /* -------------------------------------------------------------------------- */
    //@notice the coupon sent was signed by the admin signer
    struct Coupon {
        bytes32 r;
        bytes32 s;
        uint8 v;
    }
    mapping(address => mapping(string => address)) public ownerLists;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event Hello();
    event SetBaseNode(bytes32 basenode);
    event SetAdminSigner(address indexed verifierAddress);
    event LogCreatePhiland(address indexed sender, string name);
    event LogChangePhilandOwner(address indexed sender, string name);
    event LogChangePhilandAddress(address indexed sender, address phiMapAddress);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error NotAdminCall(address sender);
    error InvalidCoupon(string name, address sender, address contractAddress);
    error AllreadyClaimedPhiland(address sender, address owner, string name);
    error NotReadyPhiland(address sender, address owner, string name);
    error ECDSAInvalidSignature(address sender, address signer, bytes32 digest, Coupon coupon);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  MODIFIERS                                 */
    /* -------------------------------------------------------------------------- */
    /**
     * @notice Require: Execution by admin.
     */
    modifier onlyOwner() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotAdminCall({ sender: msg.sender });
        }
        _;
    }
    modifier onlyENSOwner(string memory name, Coupon memory coupon) {
        // Check that the coupon sent was signed by the admin signer
        bytes32 digest = keccak256(abi.encode(name, msg.sender, address(this)));
        if (!isVerifiedCoupon(digest, coupon)) {
            require(isVerifiedCoupon(digest, coupon), "Invalid coupon");
        }
        _;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(
        address admin,
        address initMap,
        address initAdminSigner
    ) external initializer {
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        require(initMap != address(0), "cant set address 0");
        require(initAdminSigner != address(0), "cant set address 0");
        map = initMap;
        _adminSigner = initAdminSigner;
        claimed = 0;
        emit Hello();
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   Coupon                                   */
    /* -------------------------------------------------------------------------- */
    /// @dev get adminsigner
    function getPhiMapAddress() external view returns (address) {
        return map;
    }

    /// @dev get adminsigner
    function getAdminSigner() external view returns (address) {
        return _adminSigner;
    }

    /// @dev set adminsigner
    function setAdminSigner(address verifierAdderss) external onlyOwner {
        require(verifierAdderss != address(0), "cant set address 0");
        _adminSigner = verifierAdderss;
        emit SetAdminSigner(verifierAdderss);
    }

    /// @dev check that the coupon sent was signed by the admin signer
    function isVerifiedCoupon(bytes32 digest, Coupon memory coupon) internal view returns (bool) {
        address signer = ecrecover(digest, coupon.v, coupon.r, coupon.s);
        if (signer == address(0)) {
            revert ECDSAInvalidSignature({ sender: msg.sender, signer: signer, digest: digest, coupon: coupon });
        }
        return signer == _adminSigner;
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                               PUBLIC FUNCTION                              */
    /* -------------------------------------------------------------------------- */
    /* ------------------------------ Map Contract ------------------------------ */
    /*
     * @title createPhiland
     * @notice Send create message to phimap
     * @param name : ens name
     * @dev include check ENS using coupon
     */
    function createPhiland(string memory name, Coupon memory coupon) external onlyENSOwner(name, coupon) {
        if (ownerLists[map][name] != address(0)) {
            revert AllreadyClaimedPhiland({ sender: msg.sender, owner: ownerLists[map][name], name: name });
        }
        unchecked {
            claimed++;
        }
        ownerLists[map][name] = msg.sender;
        IPhiMap _phimap = IPhiMap(map);
        _phimap.create(name, msg.sender);
        emit LogCreatePhiland(msg.sender, name);
    }

    /*
     * @title changePhilandOwner
     * @notice Send owner change message to phimap
     * @param name : ens name
     * @dev include check ENS using coupon
     */
    function changePhilandOwner(string memory name, Coupon memory coupon) external onlyENSOwner(name, coupon) {
        if (ownerLists[map][name] == address(0)) {
            revert NotReadyPhiland({ sender: msg.sender, owner: ownerLists[map][name], name: name });
        }
        ownerLists[map][name] = msg.sender;
        IPhiMap _phimap = IPhiMap(map);
        _phimap.changePhilandOwner(name, msg.sender);
        emit LogChangePhilandOwner(msg.sender, name);
    }

    /*
     * @title changePhilandAddress
     * @param phiMapAddress : phiMapAddress
     */
    function changePhiMapAddress(address phiMapAddress) external onlyOwner {
        require(phiMapAddress != address(0), "cant set address 0");
        map = phiMapAddress;
        emit LogChangePhilandAddress(msg.sender, phiMapAddress);
    }
}
