import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { BasePlate, PremiumObject } from "../../src/types";
import { PhiMap } from "../../src/types/contracts/PhiMap";
import { Registry } from "../../src/types/contracts/Registry";
import { FreeObject } from "../../src/types/contracts/object/FreeObject";
import { QuestObject } from "../../src/types/contracts/object/QuestObject";
import { WallPaper } from "../../src/types/contracts/object/WallPaper";
import { getENSCoupon } from "../helpers";
import { Signers } from "../types";
import {
  CantBatchWithdraw,
  CantNotBalanceDeposit,
  CantNotDepositObjectWrite,
  CantObjectWriteCollision,
  CantObjectWriteOutofRange,
  CantSetInvalidSizeMap,
  CantSetNotbalanceWallPaper,
  CantViewPhilandArray,
  CantWriteObjectToLand,
  CantWriteObjectToLandOverDeposit,
  CantflipLockMap,
  shouldBalanceDeposit2,
  shouldBehave0NotOwnerOfPhiland,
  shouldBehaveAddDeposit,
  shouldBehaveBatchDeposit,
  shouldBehaveBatchRemoveAndWrite,
  shouldBehaveBatchWithdraw,
  shouldBehaveBatchWriteObjectToLand,
  shouldBehaveChangeWallPaper,
  shouldBehaveCheckAllDepositStatus,
  shouldBehaveCheckAllDepositStatusAfterInit,
  shouldBehaveCheckDepositStatus,
  shouldBehaveClaimStarterObject,
  shouldBehaveDeposit,
  shouldBehaveInitialization,
  shouldBehaveOwnerOfPhiland,
  shouldBehaveRemoveObjectFromLand,
  shouldBehaveSave,
  shouldBehaveViewLinks,
  shouldBehaveViewNumberOfPhiland,
  shouldBehaveViewPhiland,
  shouldBehaveViewPhilandArray,
  shouldBehaveWithdraw,
  shouldBehaveWriteObjectToLand,
  shouldBehavebatchRemoveAndWrite2,
  shouldBehaveviewPhiland,
  shouldflipLockMap,
} from "./PhiMap.behavior";

describe("Unit tests PhiMap", function () {
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

    const questObjectArtifact: Artifact = await artifacts.readArtifact("QuestObject");
    this.questObject = <QuestObject>(
      await waffle.deployContract(this.signers.admin, questObjectArtifact, [
        this.signers.treasury.address,
        this.phiMap.address,
      ])
    );
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
    const PhiRegistry = await ethers.getContractFactory("Registry");
    const phiRegistry = await upgrades.deployProxy(PhiRegistry, [
      this.signers.admin.address,
      this.phiMap.address,
      this.signers.admin.address,
    ]);
    this.phiRegistry = <Registry>await phiRegistry.deployed();

    const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";

    await this.phiMap.connect(this.signers.admin).grantRole(DEFAULT_ADMIN_ROLE, this.phiRegistry.address);

    const fakeCoupon = getENSCoupon("zak3939", this.signers.admin.address, this.phiRegistry.address);
    await this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939", fakeCoupon);
    const fakeCoupon2 = getENSCoupon("test", this.signers.alice.address, this.phiRegistry.address);
    await this.phiRegistry.connect(this.signers.alice).createPhiland("test", fakeCoupon2);
    const fakeCoupon3 = getENSCoupon("phi.zak3939", this.signers.bob.address, this.phiRegistry.address);
    await this.phiRegistry.connect(this.signers.bob).createPhiland("phi.zak3939", fakeCoupon3);

    await this.freeObject.connect(this.signers.admin).setOwner(this.phiMap.address);
    await this.questObject.connect(this.signers.admin).setOwner(this.phiMap.address);
    await this.wallPaper.connect(this.signers.admin).setOwner(this.phiMap.address);
    await this.basePlate.connect(this.signers.admin).setOwner(this.phiMap.address);

    await this.phiMap.connect(this.signers.admin).setWhitelistObject(this.freeObject.address);
    await this.phiMap.connect(this.signers.admin).setWhitelistObject(this.questObject.address);
    await this.phiMap.connect(this.signers.admin).setWhitelistObject(this.wallPaper.address);
    await this.phiMap.connect(this.signers.admin).setWhitelistObject(this.basePlate.address);

    await this.questObject
      .connect(this.signers.admin)
      .createObject(
        1,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 1, z: 2 },
        this.signers.bob.address,
        200,
        5,
      );
    await this.questObject
      .connect(this.signers.admin)
      .createObject(
        2,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 2, y: 1, z: 2 },
        this.signers.bob.address,
        200,
        5,
      );
    await this.questObject
      .connect(this.signers.admin)
      .createObject(
        3,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 1, y: 2, z: 2 },
        this.signers.bob.address,
        200,
        5,
      );
    await this.freeObject
      .connect(this.signers.admin)
      .createObject(1, "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw", { x: 1, y: 1, z: 2 }, this.signers.bob.address);
    await this.freeObject
      .connect(this.signers.admin)
      .createObject(2, "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU", { x: 2, y: 1, z: 2 }, this.signers.bob.address);
    await this.freeObject
      .connect(this.signers.admin)
      .createObject(3, "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU", { x: 1, y: 2, z: 2 }, this.signers.bob.address);
    await this.freeObject
      .connect(this.signers.admin)
      .createObject(4, "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU", { x: 3, y: 3, z: 2 }, this.signers.bob.address);
    await this.wallPaper
      .connect(this.signers.admin)
      .createWallPaper(
        1,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 8, y: 8, z: 0 },
        this.signers.bob.address,
        200,
        0,
      );
    await this.wallPaper
      .connect(this.signers.admin)
      .createWallPaper(
        2,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 8, y: 8, z: 0 },
        this.signers.bob.address,
        200,
        0,
      );
    await this.wallPaper
      .connect(this.signers.admin)
      .createWallPaper(
        3,
        "ynH0TWRngXvDj2-99MxStGki4nfRoWnDpWRBkQ5WNDU",
        { x: 8, y: 8, z: 0 },
        this.signers.bob.address,
        200,
        0,
      );
    await this.questObject.connect(this.signers.admin).getObject(this.signers.alice.address, 1);
    await this.questObject.connect(this.signers.admin).getObject(this.signers.alice.address, 2);
    await this.questObject.connect(this.signers.admin).getObject(this.signers.alice.address, 3);
  });

  describe("PhiMap", function () {
    shouldBehaveOwnerOfPhiland();
    shouldBehaveviewPhiland();
    shouldBehaveViewNumberOfPhiland();
    shouldBehaveClaimStarterObject();
    shouldBehaveBatchDeposit();
    shouldBehaveCheckDepositStatus();
    shouldBehaveCheckAllDepositStatus();
    shouldBehaveDeposit();
    shouldBehaveAddDeposit();
    shouldBehaveWithdraw();
    shouldBehaveWriteObjectToLand();
    shouldBehaveBatchWithdraw();
    CantBatchWithdraw();
    shouldBehaveViewPhiland();
    shouldBehaveRemoveObjectFromLand();
    shouldBehaveBatchWriteObjectToLand();
    shouldBehaveBatchRemoveAndWrite();
    shouldBehaveViewPhilandArray();
    // shouldBehaveWriteLinkToObject();
    // CantWriteLinkToAnotherUserObject();
    // CantWriteLinkToObject();
    shouldBehaveViewLinks();
    // shouldBehaveRemoveLinkfromObject();
    shouldBehavebatchRemoveAndWrite2();
    shouldBehaveInitialization();
    shouldBehaveCheckAllDepositStatusAfterInit();
    CantWriteObjectToLand();
    shouldBehaveChangeWallPaper();
    shouldflipLockMap();
    // shouldBehaveWithdrawWallPaper();
    shouldBehaveSave();
    shouldBehave0NotOwnerOfPhiland();
    CantNotBalanceDeposit();
    CantNotDepositObjectWrite();
    CantObjectWriteOutofRange();
    CantObjectWriteCollision();
    CantflipLockMap();
    CantSetInvalidSizeMap();
    CantSetNotbalanceWallPaper();
    shouldBalanceDeposit2();
    CantViewPhilandArray();
    CantWriteObjectToLandOverDeposit();
  });
});
