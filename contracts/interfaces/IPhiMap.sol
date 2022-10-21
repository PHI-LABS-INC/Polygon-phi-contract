// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.16;

interface IPhiMap {
    struct Object {
        address contractAddress;
        uint256 tokenId;
        uint8 xStart;
        uint8 yStart;
    }
    struct Link {
        string title;
        string url;
        // uint256 data;
    }

    function create(string calldata name, address caller) external;

    function changePhilandOwner(string calldata name, address caller) external;

    function ownerOfPhiland(string memory name) external returns (address);

    function mapInitialization(string memory name) external;

    function save(
        string memory name,
        uint256[] memory removeIndexArray,
        Object[] memory objectDatas,
        Link[] memory links,
        address wcontractAddress,
        uint256 wtokenId
        // address bcontractAddress,
        // uint256 btokenId
    ) external;

    function batchDepositObject(
        string memory name,
        address[] memory contractAddresses,
        uint256[] memory tokenIds,
        uint256[] memory amounts
    ) external;

    function batchDepositObjectFromShop(
        string memory name,
        address msgSender,
        address[] memory contractAddresses,
        uint256[] memory tokenIds,
        uint256[] memory amounts
    ) external;

    function batchWithdrawObject(
        string memory name,
        address[] memory contractAddresses,
        uint256[] memory tokenIds,
        uint256[] memory amounts
    ) external;
}
