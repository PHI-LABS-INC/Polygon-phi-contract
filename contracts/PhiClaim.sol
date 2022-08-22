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
import { IQuestObject } from "./interfaces/IQuestObject.sol";
import { AccessControlUpgradeable } from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

/// @title Users claim Quest Objects
contract PhiClaim is AccessControlUpgradeable {
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    address private _adminSigner;
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

    //@notice Status:the coupon is used by msg sender
    uint256 private constant _NOT_CLAIMED = 0;
    uint256 private constant _CLAIMED = 1;
    uint256 private _status;

    mapping(address => mapping(address => mapping(uint256 => uint256))) public phiClaimedLists;
    mapping(string => uint256) private couponType;
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event Hello();
    event SetAdminSigner(address indexed verifierAddress);
    event SetCoupon(string condition, uint256 tokenid);
    event LogClaimObject(address indexed sender, uint256 tokenid);
    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error AllreadyClaimedObject(address sender, uint256 tokenId);
    error NotAdminCall(address sender);
    error ECDSAInvalidSignature(address sender, address signer, bytes32 digest, Coupon coupon);

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(address admin, address adminSigner) external initializer {
        require(adminSigner != address(0));
        _adminSigner = adminSigner;
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _status = _NOT_CLAIMED;
        emit Hello();
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  MODIFIERS                                 */
    /* -------------------------------------------------------------------------- */
    /**
     * @notice Require: First time claim by msg.sender
     */
    modifier onlyIfAllreadyClaimedObject(address contractAddress, uint256 tokenId) {
        if (phiClaimedLists[msg.sender][contractAddress][tokenId] == _CLAIMED) {
            revert AllreadyClaimedObject({ sender: msg.sender, tokenId: tokenId });
        }
        _;
    }
    /**
     * @notice Require: Execution by admin.
     */
    modifier onlyOwner() {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert NotAdminCall({ sender: msg.sender });
        }
        _;
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                   Coupon                                   */
    /* -------------------------------------------------------------------------- */
    /// @dev get adminsigner
    function getAdminSigner() external view returns (address) {
        return _adminSigner;
    }

    /// @dev set adminsigner
    function setAdminSigner(address verifierAdderss) external onlyOwner {
        require(verifierAdderss != address(0), "cant set address(0)");
        _adminSigner = verifierAdderss;
        emit SetAdminSigner(verifierAdderss);
    }

    /// @dev get object conditon and number (related with offcahin validation)
    function getCouponType(string memory condition) external view returns (uint256) {
        return couponType[condition];
    }

    /// @dev set object conditon and number (related with offcahin validation)
    function setCouponType(string memory condition, uint256 tokenId) external onlyOwner {
        couponType[condition] = tokenId;
        emit SetCoupon(condition, tokenId);
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
    /*                                   OBJECT                                   */
    /* -------------------------------------------------------------------------- */
    /*
     * @title claimPhiObject
     * @notice Send create Message to PhiObject
     * @param contractAddress : object contractAddress
     * @param tokenId : object nft token_id
     * @param condition : object related name.
     * @param coupon : coupon api response (ECDSA　signature format)
     * @dev check that the coupon sent was signed by the admin signer
     */
    function claimQuestObject(
        address contractAddress,
        uint256 tokenId,
        string calldata condition,
        Coupon memory coupon
    ) external onlyIfAllreadyClaimedObject(contractAddress, tokenId) {
        // to prevent bots minting from a contract
        require(msg.sender == tx.origin);
        IQuestObject _questObject = IQuestObject(contractAddress);
        // Check that the coupon sent was signed by the admin signer
        bytes32 digest = keccak256(abi.encode(contractAddress, couponType[condition], msg.sender));
        require(isVerifiedCoupon(digest, coupon), "Invalid coupon");
        // Register as an already CLAIMED ADDRESS
        phiClaimedLists[msg.sender][contractAddress][tokenId] = _CLAIMED;
        _questObject.getObject(msg.sender, tokenId);
        emit LogClaimObject(msg.sender, tokenId);
    }

    /*
     * @title checkClaimedStatus
     * @notice check QuestObject claim status
     * @param contractAddress : quest object contractAddress
     * @param tokenId : quest object nft tokenId
     * @dev check that the coupon was already used
     */
    function checkClaimedStatus(
        address sender,
        address contractAddress,
        uint256 tokenId
    ) external view returns (uint256) {
        return phiClaimedLists[sender][contractAddress][tokenId];
    }
}
