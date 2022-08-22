import { ethers } from "hardhat";

const {
  keccak256,
  toBuffer,
  ecsign,
  bufferToHex,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require("ethereumjs-utils");

export function getCoupon(addr: string, contractAddress: string) {
  const CouponTypeEnum = {
    lootbalance: 1,
    uniswap1: 2,
    uniswap5: 3,
    uniswap10: 4,
    snapshot: 5,
    ethbalance1: 6,
  };
  const coupons: any = {};
  const signerPvtKeyString = process.env.ADMIN_SIGNER_PRIVATE_KEY;
  const signerPvtKey = Buffer.from(signerPvtKeyString!, "hex");
  const presaleAddresses = [addr];

  for (let i = 0; i < presaleAddresses.length; i++) {
    const userAddress = ethers.utils.getAddress(presaleAddresses[i]);
    const hashBuffer = generateHashBuffer(
      ["address", "uint256", "address"],
      [contractAddress, CouponTypeEnum["lootbalance"], userAddress],
    );
    const coupon = createCoupon(hashBuffer, signerPvtKey);

    coupons[userAddress] = {
      coupon: serializeCoupon(coupon),
    };
  }
  return coupons;
}

export function getENSCoupon(ensName: string, addr: string, contractAddress: string) {
  const coupons: any = {};
  const signerPvtKeyString = process.env.ADMIN_SIGNER_PRIVATE_KEY;
  const signerPvtKey = Buffer.from(signerPvtKeyString!, "hex");

  const hashBuffer = generateHashBuffer(["string", "address", "address"], [ensName, addr, contractAddress]);

  const coupon = createCoupon(hashBuffer, signerPvtKey);
  coupons[addr] = {
    coupon: serializeCoupon(coupon),
  };
  return coupon;
}

// HELPER FUNCTIONS
function createCoupon(hash: any, signerPvtKey: any) {
  return ecsign(hash, signerPvtKey);
}

function generateHashBuffer(typesArray: any, valueArray: any) {
  return keccak256(toBuffer(ethers.utils.defaultAbiCoder.encode(typesArray, valueArray)));
}

function serializeCoupon(coupon: any) {
  return {
    r: bufferToHex(coupon.r),
    s: bufferToHex(coupon.s),
    v: coupon.v,
  };
}
