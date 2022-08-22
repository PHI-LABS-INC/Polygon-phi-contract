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
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { BaseObject } from "../utils/BaseObject.sol";

/// @title WallPaper
// WallPaper smart contract inherits ERC1155 interface
contract WallPaper is BaseObject, ERC1155Supply {
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    address public immutable phiMapAddress;
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event CreateWallPaper(
        uint256 tokenId,
        string tokenUri,
        Size size,
        address payable creator,
        uint256 maxClaimed,
        uint256 price
    );
    event LogBuyWallPaper(address indexed sender, uint256 tokenId, uint256 value);

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    // initialize contract while deployment with contract's collection name and token
    constructor(address payable _treasuryAddress, address _phiMapAddress) ERC1155("") {
        require(_treasuryAddress != address(0), "cant set address 0");
        require(_phiMapAddress != address(0), "cant set address 0");
        name = "Phi Wall Paper";
        symbol = "Phi-WAL";
        baseMetadataURI = "https://www.arweave.net/";
        treasuryAddress = _treasuryAddress;
        phiMapAddress = _phiMapAddress;
        royalityFee = 0;
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
        // Validate that the token is within range when querying
        if (tokenId == 0 || totalSupply(tokenId) >= allObjects[tokenId].maxClaimed) revert InvalidTokenID();
        if (!created[tokenId]) revert InvalidTokenID();
    }

    /*
     * @title createWallPaper
     * @notice create WallPaper for the first time
     * @param tokenId : WallPaper nft tokenId
     * @param tokenUri : object nft tokenUri
     * @param size : object's size (x,y,z)
     * @param creator : creator address, 0 also allowed.
     * @param maxClaimed : Maximum supply number
     * @param price : WallPaper price
     * @dev check that token is not created and set WallPaper settings
     */
    function createWallPaper(
        uint256 tokenId,
        string memory tokenUri,
        Size memory size,
        address payable creator,
        uint256 maxClaimed,
        uint256 price
    ) external onlyOwner {
        if (exists(tokenId)) revert ExistentToken();
        setTokenURI(tokenId, tokenUri);
        setSize(tokenId, size);
        setCreatorAddress(tokenId, creator);
        setMaxClaimed(tokenId, maxClaimed);
        changeTokenPrice(tokenId, price);
        setOpenForSale(tokenId, true);
        created[tokenId] = true;
        emit CreateWallPaper(tokenId, tokenUri, size, creator, maxClaimed, price);
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                BUY METHOD                                  */
    /* -------------------------------------------------------------------------- */
    /*
     * @title _buyWallPaper
     * @notice mint WallPaper to token buyer
     * @param tokenId : WallPaper nft token_id
     * @dev pay royality to phi wallet and creator
     */
    function _buyWallPaper(uint256 tokenId) internal {
        // check the token id exists
        isValid(tokenId);
        // check token is open for sale
        require(allObjects[tokenId].forSale);
        // check token's MaxClaimed
        require(super.totalSupply(tokenId) <= allObjects[tokenId].maxClaimed);

        // Pay royality to artist, and remaining to sales address
        (bool calcSuccess1, uint256 res) = SafeMath.tryMul(allObjects[tokenId].price, royalityFee);
        require(calcSuccess1);
        (bool calcSuccess2, uint256 royality) = SafeMath.tryDiv(res, 10000);
        require(calcSuccess2);
        (bool success1, ) = payable(allObjects[tokenId].creator).call{ value: royality }("");
        require(success1);
        (bool success2, ) = payable(treasuryAddress).call{ value: (allObjects[tokenId].price - royality) }("");
        require(success2);

        // mint the token
        super._mint(msg.sender, tokenId, 1, "0x");
        emit LogBuyWallPaper(msg.sender, tokenId, allObjects[tokenId].price);
    }

    function batchWallPaper(uint256[] memory tokenIds) external payable nonReentrant {
        uint256 allprice;
        // check if the function caller is not an zero account address
        require(msg.sender != address(0));
        // to prevent bots minting from a contract
        require(msg.sender == tx.origin, "msg sender invalid");

        uint256 objectLength = tokenIds.length;
        for (uint256 i = 0; i < objectLength; ++i) {
            allprice = allprice + allObjects[tokenIds[i]].price;
        }
        // price sent in to buy should be equal to or more than the token's price
        require(msg.value >= allprice);

        for (uint256 i = 0; i < objectLength; ++i) {
            _buyWallPaper(tokenIds[i]);
        }
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                SHOP METHOD                                 */
    /* -------------------------------------------------------------------------- */
    /*
     * @title _buyObject
     * @notice mint Object to token buyer
     * @param to : reciever address
     * @param tokenId : object nft token_id
     * @dev only used by batchWallPaperFromShop
     */
    function _buyWallPaper(address to, uint256 tokenId) internal {
        // check the token id exists
        isValid(tokenId);
        // check token is open for sale
        require(allObjects[tokenId].forSale, "not open for sale");
        // check token's MaxClaimed
        require(super.totalSupply(tokenId) <= allObjects[tokenId].maxClaimed);

        // Pay royality to artist, and remaining to sales address
        (bool calcSuccess1, uint256 res) = SafeMath.tryMul(allObjects[tokenId].price, royalityFee);
        require(calcSuccess1);
        (bool calcSuccess2, uint256 royality) = SafeMath.tryDiv(res, 10000);
        require(calcSuccess2);
        (bool success1, ) = payable(allObjects[tokenId].creator).call{ value: royality }("");
        require(success1);
        (bool success2, ) = payable(treasuryAddress).call{ value: (allObjects[tokenId].price - royality) }("");
        require(success2);

        // mint the token
        super._mint(to, tokenId, 1, "0x");
        emit LogBuyWallPaper(to, tokenId, allObjects[tokenId].price);
    }

    // Return the total value of tokenIds
    function getObjectsPrice(uint256[] memory tokenIds) external view returns (uint256) {
        uint256 allprice;
        uint256 tokenIdsLength = tokenIds.length;
        for (uint256 i = 0; i < tokenIdsLength; ++i) {
            allprice = allprice + allObjects[tokenIds[i]].price;
        }
        return allprice;
    }

    /*
     * @title batchWallPaperFromShop
     * @notice mint Object to reciever address
     * @param to : reciever address
     * @param tokenIds : object nft token_id
     * @dev only executed by shop contract
     * @notify This method needs to setShopAddress
     */
    function batchWallPaperFromShop(address to, uint256[] memory tokenIds) external payable nonReentrant {
        // to prevent bots minting from a contract
        require(msg.sender == shopAddress, "msg sender invalid");

        uint256 tokenIdsLength = tokenIds.length;
        uint256 allprice;
        for (uint256 i = 0; i < tokenIdsLength; ++i) {
            allprice = allprice + allObjects[tokenIds[i]].price;
        }
        // price sent in to buy should be equal to or more than the token's price
        require(msg.value >= allprice, "not enough value");
        for (uint256 i = 0; i < tokenIdsLength; ++i) {
            _buyWallPaper(to, tokenIds[i]);
        }
    }
}
