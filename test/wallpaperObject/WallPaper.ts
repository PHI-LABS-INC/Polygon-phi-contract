import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PhiMap } from "../../src/types/contracts/PhiMap";
import { WallPaper } from "../../src/types/contracts/object/WallPaper";
import { Signers } from "../types";
import {
  CantBatchWallPaperWithNotEnoughETH,
  CantBuyWallPaperWithNotEnoughETH,
  shouldBehaveBatchWallPaper,
  shouldBehaveBuyWallPaper,
  shouldBehaveCreateWallPaper,
  shouldBehaveInitWallPaper,
  shouldBehaveSetMaxClaimed,
  shouldBehaveSetSize,
  shouldBehaveSetTokenURI,
  shouldBehaveSetbaseMetadataURI,
} from "./WallPaper.behavior";

describe("Unit tests WallPaper", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[5];
    this.signers.bob = signers[6];
    this.signers.carol = signers[7];
    this.signers.treasury = signers[8];

    const PhiMap = await ethers.getContractFactory("PhiMap");
    const phiMap = await upgrades.deployProxy(PhiMap, [this.signers.admin.address]);
    this.phiMap = <PhiMap>await phiMap.deployed();
    const wallPaperArtifact: Artifact = await artifacts.readArtifact("WallPaper");
    this.wallPaper = <WallPaper>(
      await waffle.deployContract(this.signers.admin, wallPaperArtifact, [
        this.signers.treasury.address,
        this.phiMap.address,
      ])
    );
    await this.wallPaper
      .connect(this.signers.admin)
      .createWallPaper(
        1,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 1, z: 2 },
        this.signers.bob.address,
        200,
        10,
      );
  });

  describe("wallPaper", function () {
    shouldBehaveSetbaseMetadataURI();
    shouldBehaveSetMaxClaimed();
    shouldBehaveSetTokenURI();
    shouldBehaveSetSize();
    shouldBehaveCreateWallPaper();
    shouldBehaveInitWallPaper();
    shouldBehaveBuyWallPaper();
    shouldBehaveBatchWallPaper();
    CantBuyWallPaperWithNotEnoughETH();
    CantBatchWallPaperWithNotEnoughETH();
  });
});
