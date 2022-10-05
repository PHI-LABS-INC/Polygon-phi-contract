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
import { IFreeObject } from "./interfaces/IFreeObject.sol";
import { IPremiumObject } from "./interfaces/IPremiumObject.sol";
import { IWallPaper } from "./interfaces/IWallPaper.sol";
import { IBasePlate } from "./interfaces/IBasePlate.sol";
import { IPhiMap } from "./interfaces/IPhiMap.sol";

/// @title PhiShop Contract
contract PhiShop {
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   CONFIG                                   */
    /* -------------------------------------------------------------------------- */
    address public immutable freeObjectAddress;
    address public immutable premiumObjectAddress;
    address public immutable wallPaperAddress;
    address public immutable basePlateAddress;
    address public immutable mapAddress;
    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                                   EVENTS                                   */
    /* -------------------------------------------------------------------------- */
    event LogShopBuyObject(address sender, address receiverAddress, uint256 buyCount, uint256 buyValue);
    event ShopDepositSuccess(address sender, string name, uint256 depositAmount);
    /* -------------------------------------------------------------------------- */
    /*                                   ERRORS                                   */
    /* -------------------------------------------------------------------------- */
    error NotPhilandOwner(address sender, address owner);

    /* -------------------------------------------------------------------------- */
    /*                               INITIALIZATION                               */
    /* -------------------------------------------------------------------------- */
    // initialize contract while deployment with contract's collection name and token
    constructor(
        address _freeObjectAddress,
        address _premiumObjectAddress,
        address _wallPaperAddress,
        address _basePlateAddress,
        address _mapAddress
    ) {
        freeObjectAddress = _freeObjectAddress;
        premiumObjectAddress = _premiumObjectAddress;
        wallPaperAddress = _wallPaperAddress;
        basePlateAddress = _basePlateAddress;
        mapAddress = _mapAddress;
    }

    /* --------------------------------- ****** --------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                               PUBLIC FUNCTION                              */
    /* -------------------------------------------------------------------------- */
    /*
     * @title shopBuyObject
     * @param receiverAddress : receive address
     * @param ftokenIds : free object tokenId list
     * @param ptokenIds : premium object tokenId list
     * @param wtokenIds : wallpaper tokenId list
     */
    function shopBuyObject(
        address receiverAddress,
        uint256[] memory ftokenIds,
        uint256[] memory ptokenIds,
        uint256[] memory wtokenIds,
        uint256[] memory btokenIds
    ) external payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0), "invalid address");

        if (ftokenIds.length != 0) {
            IFreeObject _fobject = IFreeObject(freeObjectAddress);
            _fobject.batchGetFreeObjectFromShop(receiverAddress, ftokenIds);
        }
        if (ptokenIds.length != 0) {
            IPremiumObject _pobject = IPremiumObject(premiumObjectAddress);
            uint256 pPrice = _pobject.getObjectsPrice(ptokenIds);
            _pobject.batchBuyObjectFromShop{ value: pPrice }(receiverAddress, ptokenIds);
        }
        if (wtokenIds.length != 0) {
            IWallPaper _wobject = IWallPaper(wallPaperAddress);
            uint256 wPrice = _wobject.getObjectsPrice(wtokenIds);
            _wobject.batchWallPaperFromShop{ value: wPrice }(receiverAddress, wtokenIds);
        }
        if (btokenIds.length != 0) {
            IBasePlate _bobject = IBasePlate(basePlateAddress);
            uint256 bPrice = _bobject.getObjectsPrice(btokenIds);
            _bobject.batchBasePlateFromShop{ value: bPrice }(receiverAddress, btokenIds);
        }
        emit LogShopBuyObject(
            msg.sender,
            receiverAddress,
            ftokenIds.length + ftokenIds.length + wtokenIds.length + btokenIds.length,
            msg.value
        );
    }

    /*
     * @title shopBuyAndDepositObject
     * @param receiverAddress : receive address
     * @param ftokenIds : free object tokenId list
     * @param ptokenIds : premium object tokenId list
     * @param wtokenIds : wallpaper tokenId list
     * @param depositContractAddresses : array of deposit contract addresses
     * @param depositTokenIds :  array of deposit token ids
     * @param depositAmounts :  array of deposit amounts
     */
    function shopBuyAndDepositObject(
        string memory name,
        uint256[] memory ftokenIds,
        uint256[] memory ptokenIds,
        uint256[] memory wtokenIds,
        uint256[] memory btokenIds,
        address[] memory depositContractAddresses,
        uint256[] memory depositTokenIds,
        uint256[] memory depositAmounts
    ) external payable {
        // check if the function caller is not an zero account address
        require(msg.sender != address(0), "invalid address");

        IPhiMap _map = IPhiMap(mapAddress);

        if (_map.ownerOfPhiland(name) != msg.sender) {
            revert NotPhilandOwner({ sender: msg.sender, owner: _map.ownerOfPhiland(name) });
        }

        if (ftokenIds.length != 0) {
            IFreeObject _fobject = IFreeObject(freeObjectAddress);
            _fobject.batchGetFreeObjectFromShop(msg.sender, ftokenIds);
        }
        if (ptokenIds.length != 0) {
            IPremiumObject _pobject = IPremiumObject(premiumObjectAddress);
            uint256 pPrice = _pobject.getObjectsPrice(ptokenIds);
            _pobject.batchBuyObjectFromShop{ value: pPrice }(msg.sender, ptokenIds);
        }
        if (wtokenIds.length != 0) {
            IWallPaper _wobject = IWallPaper(wallPaperAddress);
            uint256 wPrice = _wobject.getObjectsPrice(wtokenIds);
            _wobject.batchWallPaperFromShop{ value: wPrice }(msg.sender, wtokenIds);
        }
        if (btokenIds.length != 0) {
            IBasePlate _bobject = IBasePlate(basePlateAddress);
            uint256 bPrice = _bobject.getObjectsPrice(btokenIds);
            _bobject.batchBasePlateFromShop{ value: bPrice }(msg.sender, btokenIds);
        }

        emit LogShopBuyObject(
            msg.sender,
            msg.sender,
            ftokenIds.length + ftokenIds.length + wtokenIds.length + btokenIds.length,
            msg.value
        );

        _map.batchDepositObjectFromShop(name, msg.sender, depositContractAddresses, depositTokenIds, depositAmounts);
        emit ShopDepositSuccess(msg.sender, name, depositAmounts.length);
    }
}
