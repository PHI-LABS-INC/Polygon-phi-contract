import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PhiMap } from "../../src/types/contracts/PhiMap";
import { PremiumObject } from "../../src/types/contracts/object/PremiumObject";
import { Signers } from "../types";
import {
  CantBatchBuyObjectWithNotEnoughETH,
  CantBuyObjectWithNotEnoughETH,
  shouldBehaveBatchBuyObject,
  shouldBehaveBuyObject,
  shouldBehaveCreateObject,
  shouldBehaveInitObject,
  shouldBehaveRoyaltyWithdraw,
  shouldBehaveSetMaxClaimed,
  shouldBehaveSetSize,
  shouldBehaveSetTokenURI,
  shouldBehaveSetbaseMetadataURI,
} from "./PremiumObject.behavior";

describe("Unit tests PremiumObject", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];
    this.signers.carol = signers[3];
    this.signers.treasury = signers[4];

    const PhiMap = await ethers.getContractFactory("PhiMap");
    const phiMap = await upgrades.deployProxy(PhiMap, [this.signers.admin.address]);
    this.phiMap = <PhiMap>await phiMap.deployed();
    const premiumObjectArtifact: Artifact = await artifacts.readArtifact("PremiumObject");
    this.premiumObject = <PremiumObject>(
      await waffle.deployContract(this.signers.admin, premiumObjectArtifact, [
        this.signers.treasury.address,
        this.phiMap.address,
      ])
    );
    await this.premiumObject
      .connect(this.signers.admin)
      .createObject(
        1,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 1, z: 2 },
        this.signers.bob.address,
        200,
        10,
      );
  });

  describe("premiumObject", function () {
    shouldBehaveSetbaseMetadataURI();
    shouldBehaveSetMaxClaimed();
    shouldBehaveSetTokenURI();
    shouldBehaveSetSize();
    shouldBehaveCreateObject();
    shouldBehaveInitObject();
    shouldBehaveBuyObject();
    shouldBehaveBatchBuyObject();
    CantBuyObjectWithNotEnoughETH();
    CantBatchBuyObjectWithNotEnoughETH();
    shouldBehaveRoyaltyWithdraw();
  });
});
