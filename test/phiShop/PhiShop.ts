import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { BasePlate, PhiShop, PremiumObject } from "../../src/types";
import { PhiMap } from "../../src/types/contracts/PhiMap";
import { FreeObject } from "../../src/types/contracts/object/FreeObject";
import { WallPaper } from "../../src/types/contracts/object/WallPaper";
import { Signers } from "../types";
import { shouldBehaveShopObject } from "./PhiShop.behavior";

describe("Unit tests PhiShop", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[9];
    this.signers.treasury = signers[10];

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
    const premiumObjectArtifact: Artifact = await artifacts.readArtifact("PremiumObject");
    this.premiumObject = <PremiumObject>(
      await waffle.deployContract(this.signers.admin, premiumObjectArtifact, [
        this.signers.treasury.address,
        this.phiMap.address,
      ])
    );

    const wallPaperArtifact: Artifact = await artifacts.readArtifact("WallPaper");
    this.wallPaper = <WallPaper>(
      await waffle.deployContract(this.signers.admin, wallPaperArtifact, [
        this.signers.treasury.address,
        this.phiMap.address,
      ])
    );

    const basePlateArtifact: Artifact = await artifacts.readArtifact("BasePlate");
    this.basePlate = <BasePlate>(
      await waffle.deployContract(this.signers.admin, basePlateArtifact, [
        this.signers.treasury.address,
        this.phiMap.address,
      ])
    );

    const phiShopArtifact: Artifact = await artifacts.readArtifact("PhiShop");
    this.phiShop = <PhiShop>(
      await waffle.deployContract(this.signers.admin, phiShopArtifact, [
        this.freeObject.address,
        this.premiumObject.address,
        this.wallPaper.address,
        this.basePlate.address,
      ])
    );

    await this.freeObject.connect(this.signers.admin).setShopAddress(this.phiShop.address);
    await this.premiumObject.connect(this.signers.admin).setShopAddress(this.phiShop.address);
    await this.wallPaper.connect(this.signers.admin).setShopAddress(this.phiShop.address);

    await this.freeObject
      .connect(this.signers.admin)
      .createObject(1, "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw", { x: 1, y: 1, z: 2 }, this.signers.alice.address);
    await this.freeObject
      .connect(this.signers.admin)
      .createObject(2, "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU", { x: 2, y: 1, z: 2 }, this.signers.alice.address);
    await this.premiumObject
      .connect(this.signers.admin)
      .createObject(
        1,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 1, y: 2, z: 2 },
        this.signers.alice.address,
        200,
        ethers.utils.parseEther("0.05"),
      );
    await this.premiumObject
      .connect(this.signers.admin)
      .createObject(
        2,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 3, y: 3, z: 2 },
        this.signers.alice.address,
        200,
        ethers.utils.parseEther("0.10"),
      );
    await this.wallPaper
      .connect(this.signers.admin)
      .createWallPaper(
        1,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 8, y: 8, z: 0 },
        this.signers.alice.address,
        200,
        0,
      );
    await this.wallPaper
      .connect(this.signers.admin)
      .createWallPaper(
        2,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 8, y: 8, z: 0 },
        this.signers.alice.address,
        200,
        ethers.utils.parseEther("0.20"),
      );
  });

  describe("PhiShop", function () {
    shouldBehaveShopObject();
  });
});
