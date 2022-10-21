// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.16;

interface IPhiShop {
    function shopBuyObject(
        address receiverAddress,
        uint256[] memory ftokenIds,
        uint256[] memory ptokenIds,
        uint256[] memory wtokenIds,
        uint256[] memory btokenIds
    ) external;

    function shopBuyAndDepositObject(
        string calldata name,
        uint256[] calldata ftokenIds,
        uint256[] calldata ptokenIds,
        uint256[] calldata wtokenIds,
        uint256[] calldata btokenIds,
        address[] calldata depositContractAddresses,
        uint256[] calldata depositTokenIds,
        uint256[] calldata depositAmounts
    ) external;
}
