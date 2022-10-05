import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { BasePlate } from "../../src/types";
import { PhiMap } from "../../src/types/contracts/PhiMap";
import { Signers } from "../types";
import {
  CantBatchbasePlateWithNotEnoughETH,
  CantBuybasePlateWithNotEnoughETH,
  shouldBehaveBatchbasePlate,
  shouldBehaveBuybasePlate,
  shouldBehaveCreatebasePlate,
  shouldBehaveInitbasePlate,
  shouldBehaveSetMaxClaimed,
  shouldBehaveSetSize,
  shouldBehaveSetTokenURI,
  shouldBehaveSetbaseMetadataURI,
} from "./BasePlate.behavior";

describe("Unit tests basePlate", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[11];
    this.signers.bob = signers[12];
    this.signers.carol = signers[13];
    this.signers.treasury = signers[14];

    const PhiMap = await ethers.getContractFactory("PhiMap");
    const phiMap = await upgrades.deployProxy(PhiMap, [this.signers.admin.address]);
    this.phiMap = <PhiMap>await phiMap.deployed();
    const basePlateArtifact: Artifact = await artifacts.readArtifact("BasePlate");
    this.basePlate = <BasePlate>(
      await waffle.deployContract(this.signers.admin, basePlateArtifact, [
        this.signers.treasury.address,
        this.phiMap.address,
      ])
    );
    await this.basePlate
      .connect(this.signers.admin)
      .createBasePlate(
        1,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 1, z: 2 },
        this.signers.bob.address,
        200,
        10,
      );
  });

  describe("basePlate", function () {
    shouldBehaveSetbaseMetadataURI();
    shouldBehaveSetMaxClaimed();
    shouldBehaveSetTokenURI();
    shouldBehaveSetSize();
    shouldBehaveCreatebasePlate();
    shouldBehaveInitbasePlate();
    shouldBehaveBuybasePlate();
    shouldBehaveBatchbasePlate();
    CantBuybasePlateWithNotEnoughETH();
    CantBatchbasePlateWithNotEnoughETH();
  });
});
