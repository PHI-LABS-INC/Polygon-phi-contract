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
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { BaseObject } from "../utils/BaseObject.sol";

/// @title QuestObject
// QuestObject smart contract inherits ERC1155 interface
contract QuestObject is BaseObject, ERC1155Supply {
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    address public immutable phiMapAddress;
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event CreateQuestObject(
        uint256 tokenId,
        string uri,
        Size size,
        address payable creator,
        uint256 maxClaimed,
        uint256 price
    );
    event LogGetQuestObject(address indexed sender, uint256 tokenId);

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    constructor(address payable _treasuryAddress, address _phiMapAddress) ERC1155("") {
        require(_treasuryAddress != address(0), "cant set address 0");
        require(_phiMapAddress != address(0), "cant set address 0");
        // name = "Phi Quest Object";
        // symbol = "Phi-QOS";
        name = "Test Object";
        symbol = "Test QOS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        phiMapAddress = _phiMapAddress;
        secondaryRoyalty = 500;
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   PHIMAP                                   */
    /* -------------------------------------------------------------------------- */
    // always allow PhiMap contract to move Object
    // then users don't need to call `setApprovalForAll`
    // reference: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol#L110
    function isApprovedForAll(address account, address operator) public view override returns (bool) {
        if (operator == phiMapAddress) {
            return true;
        }
        return super.isApprovedForAll(account, operator);
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  TOKEN URI                                 */
    /* -------------------------------------------------------------------------- */
    function uri(uint256 tokenId) public view override returns (string memory) {
        if (!created[tokenId]) revert InvalidTokenID();
        return string(abi.encodePacked(baseMetadataURI, getTokenURI(tokenId)));
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                OBJECT METHOD                               */
    /* -------------------------------------------------------------------------- */
    /* Utility Functions */
    function isValid(uint256 tokenId) internal view override {
        if (tokenId == 0 || totalSupply(tokenId) >= allObjects[tokenId].maxClaimed) revert InvalidTokenID();
        if (!created[tokenId]) revert InvalidTokenID();
    }

    /*
     * @title createObject
     * @notice create object for the first time
     * @param tokenId : object nft tokenId
     * @param tokenUri : object nft tokenUri
     * @param size : object's size (x,y,z)
     * @param creator : creator address, 0 also allowed.
     * @param maxClaimed : Maximum supply number
     * @param exp : exp
     * @dev check that token is not created and set object settings
     */
    function createObject(
        uint256 tokenId,
        string memory tokenUri,
        Size memory size,
        address payable creator,
        uint256 maxClaimed,
        uint256 exp
    ) external onlyOwner {
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, tokenUri);
        setSize(tokenId, size);
        setCreatorAddress(tokenId, creator);
        setMaxClaimed(tokenId, maxClaimed);
        changeTokenPrice(tokenId, 0);
        setExp(tokenId, exp);
        setOpenForSale(tokenId, true);
        created[tokenId] = true;
        emit CreateQuestObject(tokenId, tokenUri, size, creator, maxClaimed, 0);
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                QUEST METHOD                                */
    /* -------------------------------------------------------------------------- */
    /*
     * @title getObject
     * @notice mint Object to verify user
     * @param to : receiver address
     * @param tokenId : object nft token_id
     * @dev onlyOwnerMethod. generally, this method is invoked by phiClaim contract
     */
    function getObject(address to, uint256 tokenId) external onlyOwner {
        // check if the function caller is not an zero account address
        require(to != address(0), "to(0) is invalid");
        // check token is open for sale
        require(allObjects[tokenId].forSale, "not open forSale");
        // check the token id exists
        isValid(tokenId);
        // check token's MaxClaimed
        require(super.totalSupply(tokenId) <= allObjects[tokenId].maxClaimed, "reach maxClaimed");
        // mint the token
        super._mint(to, tokenId, 1, "0x00");
        emit LogGetQuestObject(msg.sender, tokenId);
    }
}
