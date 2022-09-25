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

/// @title FreeObject
// FreeObject smart contract inherits ERC1155 interface
contract FreeObject is BaseObject, ERC1155Supply {
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    address public immutable phiMapAddress;
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event CreateFreeObject(uint256 tokenId, string uri, Size size, address payable creator, uint256 price);
    event LogGetObject(address indexed sender, uint256 tokenId);

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    // initialize contract while deployment with contract's collection name and token
    constructor(address payable _treasuryAddress, address _phiMapAddress) ERC1155("") {
        require(_treasuryAddress != address(0), "cant set address 0");
        require(_phiMapAddress != address(0), "cant set address 0");
        name = "Phi Free Object";
        symbol = "Phi-FOS";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        secondaryRoyalty = 100;
        phiMapAddress = _phiMapAddress;
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   PHIMAP                                   */
    /* -------------------------------------------------------------------------- */
    // Always allow PhiMap contract to move Object
    // then users don't need to call `setApprovalForAll`
    function isApprovedForAll(address account, address operator) public view override returns (bool) {
        if (operator == phiMapAddress) {
            return true;
        }
        return super.isApprovedForAll(account, operator);
    }

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
        if (tokenId == 0 || !created[tokenId]) revert InvalidTokenID();
    }

    /*
     * @title createObject
     * @notice create object for the first time
     * @param tokenId : object nft tokenId
     * @param tokenUri : object nft tokenUri
     * @param size : object's size (x,y,z)
     * @param creator : creator address, 0 also allowed.
     * @dev check that token is not created and set object settings
     * @notify free object not set maxClaimed
     */
    function createObject(
        uint256 tokenId,
        string memory tokenUri,
        Size calldata size,
        address payable creator
    ) external onlyOwner {
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, tokenUri);
        setSize(tokenId, size);
        setCreatorAddress(tokenId, creator);
        changeTokenPrice(tokenId, 0);
        setOpenForSale(tokenId, true);
        created[tokenId] = true;
        emit CreateFreeObject(tokenId, tokenUri, size, creator, 0);
    }

    /* --------------------------------- ****** --------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                 BUY METHOD                                 */
    /* -------------------------------------------------------------------------- */
    /*
     * @title  getFreeObject
     * @notice mint Object to token buyer
     * @param tokenId : object nft token_id
     * @dev pay royality to phi wallet and creator
     */
    function _getFreeObject(uint256 tokenId) internal {
        // check token is open for sale
        require(allObjects[tokenId].forSale, "not open for sale");
        // check the token id exists
        isValid(tokenId);
        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x00");
        emit LogGetObject(msg.sender, tokenId);
    }

    function batchGetFreeObject(uint256[] memory tokenIds) external {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0), "caller is invalid");
        // to prevent bots minting from a contract
        require(msg.sender == tx.origin, "msg sender invalid");
        uint256 tokenIdsLength = tokenIds.length;
        for (uint256 i = 0; i < tokenIdsLength; ++i) {
            _getFreeObject(tokenIds[i]);
        }
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                SHOP METHOD                                 */
    /* -------------------------------------------------------------------------- */
    function _getFreeObject(address to, uint256 tokenId) internal {
        // check token is open for sale
        require(allObjects[tokenId].forSale, "not open for sale");
        // check the token id exists
        isValid(tokenId);
        // mint the token
        super._mint(to, tokenId, 1, "0x00");
        emit LogGetObject(to, tokenId);
    }

    /*
     * @title batchGetFreeObjectFromShop
     * @notice mint Object to reciever address
     * @param to : reciever address
     * @param tokenIds : object nft token_id
     * @dev only executed by shop contract
     * @notify This method needs to setShopAddress
     */
    function batchGetFreeObjectFromShop(address to, uint256[] memory tokenIds) external {
        // to prevent bots minting from a contract
        require(msg.sender == shopAddress, "msg sender invalid");

        uint256 tokenIdsLength = tokenIds.length;
        for (uint256 i = 0; i < tokenIdsLength; ++i) {
            _getFreeObject(to, tokenIds[i]);
        }
    }
}
