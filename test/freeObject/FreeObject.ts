import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PhiMap } from "../../src/types/contracts/PhiMap";
import { FreeObject } from "../../src/types/contracts/object/FreeObject";
import { Signers } from "../types";
import {
  shouldBehaveBatchGetFreeObject,
  shouldBehaveCreateObject,
  shouldBehaveGetFreeObject,
  shouldBehaveInitObject,
  shouldBehaveSetMaxClaimed,
  shouldBehaveSetSize,
  shouldBehaveSetTokenURI,
  shouldBehaveSetbaseMetadataURI,
} from "./FreeObject.behavior";

describe("Unit tests FreeObject", function () {
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

    const freeObjectArtifact: Artifact = await artifacts.readArtifact("FreeObject");
    this.freeObject = <FreeObject>(
      await waffle.deployContract(this.signers.admin, freeObjectArtifact, [
        this.signers.treasury.address,
        this.phiMap.address,
      ])
    );
    await this.freeObject
      .connect(this.signers.admin)
      .createObject(1, "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw", { x: 1, y: 1, z: 2 }, this.signers.bob.address);
  });

  describe("freeObject", function () {
    shouldBehaveSetbaseMetadataURI();
    shouldBehaveSetMaxClaimed();
    shouldBehaveSetTokenURI();
    shouldBehaveSetSize();
    shouldBehaveCreateObject();
    shouldBehaveInitObject();
    shouldBehaveGetFreeObject();
    shouldBehaveBatchGetFreeObject();
  });
});
