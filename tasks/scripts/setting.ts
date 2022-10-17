import { readFileSync } from "fs";
import hre, { ethers } from "hardhat";

import { printAddresses } from "../deploy/deploy";
import { getAddress } from "../deploy/utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CSV = require("comma-separated-values");

settingPhi()
  .then(() => console.log("Successfully invoked"))
  .catch(err => console.log(err));

interface CreatorAddress {
  [key: string]: string;
}
export const CreatorAddressEnum: CreatorAddress = {
  eBoy: "0x4489E91a8A23AE1bdfd1F0B4a8F142acAFe95eE2",
  ta2nb: "0x4489E91a8A23AE1bdfd1F0B4a8F142acAFe95eE2",
  Fuzuki: "0x4489E91a8A23AE1bdfd1F0B4a8F142acAFe95eE2",
};

export async function settingPhi(): Promise<void> {
  const [l1Signer] = await hre.ethers.getSigners();
  let calldata: any = [];
  let funcName: any = "";
  let res: any = {};

  let NETWORK;
  if (hre.network.name === "fork") {
    NETWORK = "mainnet";
  } else {
    NETWORK = hre.network.name;
  }
  console.log("Account balance:", (await l1Signer.getBalance()).toString());
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const BLOCK_NUMBER = await l1Signer.provider.getBlockNumber();
  console.log(l1Signer.address);
  console.log(`Deploying from:`);
  console.log(`\tl1: ${(await l1Signer.getAddress()).toString()}`);

  const phiClaimAbiName = "PhiClaim";
  const phiMapAbiName = "PhiMap";
  const phiRegistryAbiName = "Registry";
  const premiumObjectAbiName = "PremiumObject";
  const questObjectAbiName = "QuestObject";
  const freeObjectAbiName = "FreeObject";
  const basePlateAbiName = "BasePlate";
  const wallPaperAbiName = "WallPaper";
  const phiShopAbiName = "PhiShop";

  const phiClaimAddress = getAddress(phiClaimAbiName, NETWORK);
  const phiMapAddress = getAddress(phiMapAbiName, NETWORK);
  const phiRegistryAddress = getAddress(phiRegistryAbiName, NETWORK);
  const premiumObjectAddress = getAddress(premiumObjectAbiName, NETWORK);
  const questObjectAddress = getAddress(questObjectAbiName, NETWORK);
  const freeObjectAddress = getAddress(freeObjectAbiName, NETWORK);
  const basePlateAddress = getAddress(basePlateAbiName, NETWORK);
  const wallPaperAddress = getAddress(wallPaperAbiName, NETWORK);
  const phiShopAddress = getAddress(phiShopAbiName, NETWORK);

  const phiRegistryContractFactory = (await hre.ethers.getContractFactory(phiRegistryAbiName)) as any;
  const phiClaimContractFactory = (await hre.ethers.getContractFactory(phiClaimAbiName)) as any;
  const phiMapContractFactory = (await hre.ethers.getContractFactory(phiMapAbiName)) as any;
  const premiumObjectContractFactory = (await hre.ethers.getContractFactory(premiumObjectAbiName)) as any;
  const questObjectContractFactory = (await hre.ethers.getContractFactory(questObjectAbiName)) as any;
  const freeObjectContractFactory = (await hre.ethers.getContractFactory(freeObjectAbiName)) as any;
  const basePlateContractFactory = (await hre.ethers.getContractFactory(basePlateAbiName)) as any;
  const wallPaperContractFactory = (await hre.ethers.getContractFactory(wallPaperAbiName)) as any;
  const phiShopContractFactory = (await hre.ethers.getContractFactory(phiShopAbiName)) as any;

  const phiRegistryContractInstance = await phiRegistryContractFactory.attach(phiRegistryAddress);
  const phiClaimContractInstance = await phiClaimContractFactory.attach(phiClaimAddress);
  const phiMapContractInstance = await phiMapContractFactory.attach(phiMapAddress);
  const premiumObjectContractInstance = await premiumObjectContractFactory.attach(premiumObjectAddress);
  const questObjectContractInstance = await questObjectContractFactory.attach(questObjectAddress);
  const freeObjectContractInstance = await freeObjectContractFactory.attach(freeObjectAddress);
  const basePlateContractInstance = await basePlateContractFactory.attach(basePlateAddress);
  const wallPaperContractInstance = await wallPaperContractFactory.attach(wallPaperAddress);
  const phiShopContractInstance = await phiShopContractFactory.attach(phiShopAddress);

  // const wallPaperscsv = readFileSync(`${__dirname}/csv/setting_wallPapers.csv`, {
  //   encoding: "utf8",
  // });
  // const wallPaperRowList = new CSV(wallPaperscsv, { header: true, cast: false }).parse();
  // funcName = "createWallPaper";
  // for (let i = 0; i < wallPaperRowList.length; i++) {
  //   const size = String(wallPaperRowList[i].size);
  //   const metadataURL = String(wallPaperRowList[i].json_url).split("/");
  //   calldata = [
  //     String(wallPaperRowList[i].tokenId),
  //     metadataURL.slice(-1)[0],
  //     { x: size[1], y: size[3], z: "0" },
  //     CreatorAddressEnum[wallPaperRowList[i].creator],
  //     String(wallPaperRowList[i].maxClaimed),
  //     ethers.utils.parseEther(wallPaperRowList[i].price),
  //   ];
  //   console.log(calldata);
  //   res = await wallPaperContractInstance[funcName](...calldata);
  //   console.log("create Object Response:", res);
  // }

  // const baseplatecsv = readFileSync(`${__dirname}/csv/setting_baseplate.csv`, {
  //   encoding: "utf8",
  // });
  // const baseplateRowList = new CSV(baseplatecsv, { header: true, cast: false }).parse();
  // funcName = "createBasePlate";
  // for (let i = 0; i < baseplateRowList.length; i++) {
  //   const size = String(baseplateRowList[i].size);
  //   const metadataURL = String(baseplateRowList[i].json_url).split("/");
  //   calldata = [
  //     String(baseplateRowList[i].tokenId),
  //     metadataURL.slice(-1)[0],
  //     { x: size[1], y: size[3], z: "0" },
  //     CreatorAddressEnum[baseplateRowList[i].creator],
  //     String(baseplateRowList[i].maxClaimed),
  //     ethers.utils.parseEther(baseplateRowList[i].price),
  //   ];
  //   console.log(calldata);
  //   res = await basePlateContractInstance[funcName](...calldata);
  //   console.log("create Object Response:", res);
  // }

  // const premiumObjectscsv = readFileSync(`${__dirname}/csv/setting_premiumObjects.csv`, {
  //   encoding: "utf8",
  // });
  // const premiumObjectRowList = new CSV(premiumObjectscsv, { header: true, cast: false }).parse();
  // funcName = "createObject";
  // for (let i = 0; i < premiumObjectRowList.length; i++) {
  //   const size = String(premiumObjectRowList[i].size);
  //   const metadataURL = String(premiumObjectRowList[i].json_url).split("/");
  //   calldata = [
  //     String(premiumObjectRowList[i].tokenId),
  //     metadataURL.slice(-1)[0],
  //     { x: size[1], y: size[3], z: size[5] },
  //     CreatorAddressEnum[premiumObjectRowList[i].creator],
  //     String(premiumObjectRowList[i].maxClaimed),
  //     ethers.utils.parseEther(premiumObjectRowList[i].price),
  //   ];
  //   console.log(calldata);
  //   res = await premiumObjectContractInstance[funcName](...calldata);
  //   console.log("create Object Response:", res);
  // }

  // const freeObjectscsv = readFileSync(`${__dirname}/csv/setting_freeObjects.csv`, {
  //   encoding: "utf8",
  // });
  // const freeObjectRowList = new CSV(freeObjectscsv, { header: true, cast: false }).parse();
  // funcName = "createObject";
  // for (let i = 0; i < freeObjectRowList.length; i++) {
  //   const size = String(freeObjectRowList[i].size);
  //   const metadataURL = String(freeObjectRowList[i].json_url).split("/");
  //   calldata = [
  //     String(freeObjectRowList[i].tokenId),
  //     metadataURL.slice(-1)[0],
  //     { x: size[1], y: size[3], z: size[5] },
  //     CreatorAddressEnum[freeObjectRowList[i].creator],
  //   ];
  //   console.log(calldata);
  //   res = await freeObjectContractInstance[funcName](...calldata);
  //   console.log("create Object Response:", res);
  // }
  const conditioncsv = readFileSync(`${__dirname}/csv/condition.csv`, {
    encoding: "utf8",
  });
  const conditionRowList = new CSV(conditioncsv, { header: true, cast: false }).parse();
  funcName = "setCouponType";
  for (let i = 0; i < conditionRowList.length; i++) {
    calldata = [
      String(conditionRowList[i].Condition) + String(conditionRowList[i].Value),
      String(conditionRowList[i].TokenId),
    ];
    console.log(calldata);
    res = await phiClaimContractInstance[funcName](...calldata);
    console.log("phiClaim setCouponType Response:", res);
  }

  const questObjectscsv = readFileSync(`${__dirname}/csv/setting_questObjects.csv`, {
    encoding: "utf8",
  });
  const questObjectRowList = new CSV(questObjectscsv, { header: true, cast: false }).parse();
  funcName = "createObject";
  for (let i = 0; i < questObjectRowList.length; i++) {
    const size = String(questObjectRowList[i].size);
    const metadataURL = String(questObjectRowList[i].json_url).split("/");
    calldata = [
      String(questObjectRowList[i].tokenId),
      metadataURL.slice(-1)[0],
      { x: size[1], y: size[3], z: size[5] },
      CreatorAddressEnum[questObjectRowList[i].creator],
      String(questObjectRowList[i].maxClaimed),
      String(questObjectRowList[i].EXP),
    ];
    console.log(calldata);
    res = await questObjectContractInstance[funcName](...calldata);
    console.log("create Object Response:", res);
  }

  // funcName = "setOwner";
  // calldata = [phiMapAddress];
  // res = await questObjectContractInstance[funcName](...calldata);
  // console.log("setOwner Response:", res);
  // calldata = [phiClaimAddress];
  // res = await questObjectContractInstance[funcName](...calldata);
  // console.log("setOwner Response:", res);

  // const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
  // funcName = "grantRole";
  // calldata = [DEFAULT_ADMIN_ROLE, phiRegistryAddress];
  // res = await phiMapContractInstance.grantRole(...calldata);
  // console.log("grantRole Response:", res);
  // calldata = [DEFAULT_ADMIN_ROLE, phiShopAddress];
  // res = await phiMapContractInstance.grantRole(...calldata);
  // console.log("grantRole Response:", res);

  // funcName = "setWhitelistObject";
  // calldata = [premiumObjectAddress];
  // res = await phiMapContractInstance.setWhitelistObject(...calldata);
  // console.log("setWhitelistObjectResponse:", res);
  // calldata = [questObjectAddress];
  // res = await phiMapContractInstance.setWhitelistObject(...calldata);
  // console.log("setWhitelistObjectResponse:", res);
  // calldata = [freeObjectAddress];
  // res = await phiMapContractInstance.setWhitelistObject(...calldata);
  // console.log("setWhitelistObjectResponse:", res);
  // calldata = [wallPaperAddress];
  // res = await phiMapContractInstance.setWhitelistObject(...calldata);
  // console.log("setWhitelistObjectResponse:", res);
  // calldata = [basePlateAddress];
  // res = await phiMapContractInstance.setWhitelistObject(...calldata);
  // console.log("setWhitelistObjectResponse:", res);

  // funcName = "setShopAddress";
  // calldata = [phiShopAddress];
  // res = await premiumObjectContractInstance[funcName](...calldata);
  // console.log("setShopAddress Response:", res);
  // res = await freeObjectContractInstance[funcName](...calldata);
  // console.log("setShopAddress Response:", res);
  // res = await wallPaperContractInstance[funcName](...calldata);
  // console.log("setShopAddress Response:", res);
  // res = await basePlateContractInstance[funcName](...calldata);
  // console.log("setShopAddress Response:", res);

  // funcName = "setTreasuryAddress";
  // calldata = ["0xe35E5f8B912C25cDb6B00B347cb856467e4112A3"];
  // res = await questObjectContractInstance[funcName](...calldata);
  // console.log("setTreasuryAddress Response:", res);
  // res = await premiumObjectContractInstance[funcName](...calldata);
  // console.log("setTreasuryAddress Response:", res);
  // res = await freeObjectContractInstance[funcName](...calldata);
  // console.log("setTreasuryAddress Response:", res);
  // res = await wallPaperContractInstance[funcName](...calldata);
  // console.log("setTreasuryAddress Response:", res);
  // res = await basePlateContractInstance[funcName](...calldata);
  // console.log("setTreasuryAddress Response:", res);

  // calldata = ["0xAA9bD7C35be4915dC1F18Afad6E631f0AfCF2461"];
  // res = await phiRegistryContractInstance.setAdminSigner(...calldata);
  // console.log("setAdminSigner Response:", res);
  // res = await phiClaimContractInstance.setAdminSigner(...calldata);
  // console.log("setAdminSigner Response:", res);
}
