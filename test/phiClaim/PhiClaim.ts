import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { FreeObject } from "../../src/types";
import { PhiClaim } from "../../src/types/contracts/PhiClaim";
import { PhiMap } from "../../src/types/contracts/PhiMap";
import { QuestObject } from "../../src/types/contracts/object/QuestObject";
import { Signers } from "../types";
import {
  CantClaimObject2nd,
  CantClaimObjectInvalidToken,
  CantClaimObjectWithdiffCondition,
  CantClaimObjectWithdiffTokenId,
  CantClaimObjectWithdiffUser,
  CantSetAdminSigner,
  CantSetAdminSignerAddress0,
  CantSetCouponType,
  CantUpdateFee,
  CantUpdateTreasuryAddress,
  ShouldUpdateFee,
  ShouldUpdateTreasuryAddress,
  shouldAdminItself,
  shouldBehaveClaimObject,
  shouldBehaveGetAdminSigner,
  shouldBehaveGetOwner,
  shouldBehaveSetAdminSigner,
  shouldBehaveSetCouponType,
} from "./PhiClaim.behavior";

describe("Unit tests PhiClaim", function () {
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
  });

  describe("PhiClaim", function () {
    before(async function () {
      const PhiClaim = await ethers.getContractFactory("PhiClaim");
      const phiClaim = await upgrades.deployProxy(PhiClaim, [this.signers.admin.address, this.signers.admin.address]);
      this.phiClaim = <PhiClaim>await phiClaim.deployed();
      await this.questObject.connect(this.signers.admin).setOwner(this.phiClaim.address);
      const newTreasuryAddress = this.signers.bob.address;
      await this.phiClaim.connect(this.signers.admin).updateTreasuryAddress(newTreasuryAddress);
    });
    shouldBehaveGetOwner();
    shouldAdminItself();
    shouldBehaveGetAdminSigner();
    shouldBehaveSetCouponType();
    shouldBehaveClaimObject();
    CantClaimObject2nd();
    CantClaimObjectInvalidToken();
    CantSetCouponType();
    CantClaimObjectWithdiffUser();
    CantClaimObjectWithdiffTokenId();
    CantClaimObjectWithdiffCondition();
    shouldBehaveSetAdminSigner();
    CantSetAdminSigner();
    CantSetAdminSignerAddress0();
    ShouldUpdateFee();
    CantUpdateFee();
    ShouldUpdateTreasuryAddress();
    CantUpdateTreasuryAddress();
  });
});
