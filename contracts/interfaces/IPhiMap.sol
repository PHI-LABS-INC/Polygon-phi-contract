// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.7;

interface IPhiMap {
    function create(string calldata name, address caller) external;

    function changePhilandOwner(string calldata name, address caller) external;
}
