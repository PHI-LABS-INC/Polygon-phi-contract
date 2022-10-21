// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.16;

interface IRegistry {
    struct Coupon {
        bytes32 r;
        bytes32 s;
        uint8 v;
    }

    function createPhiland(string memory name, Coupon memory coupon) external;

    function changePhilandOwner(string memory name, Coupon memory coupon) external;
}
