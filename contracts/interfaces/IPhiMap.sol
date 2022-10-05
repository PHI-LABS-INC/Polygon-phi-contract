// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.7;

interface IPhiMap {
    function create(string calldata name, address caller) external;

    function changePhilandOwner(string calldata name, address caller) external;

    function ownerOfPhiland(string memory name) external returns (address);

    function batchDepositObjectFromShop(
        string memory name,
        address msgSender,
        address[] memory contractAddresses,
        uint256[] memory tokenIds,
        uint256[] memory amounts
    ) external;
}
