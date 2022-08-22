import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PhiMap } from "../../src/types/contracts/PhiMap";
import { Registry } from "../../src/types/contracts/Registry";
import { FreeObject } from "../../src/types/contracts/object/FreeObject";
import { QuestObject } from "../../src/types/contracts/object/QuestObject";
import { Signers } from "../types";
import {
  CantBehaveCreatePhiland,
  CantBehaveDoubleCreatePhiland,
  CantChangePhilandAddress,
  CantChangePhilandOwner,
  CantChangePhilandOwner0,
  CantCreatePhiland,
  CantSetAdminSigner,
  shouldBehaveChangePhiMapAddress,
  shouldBehaveChangePhilandOwner,
  shouldBehaveCreatePhiland,
  shouldBehaveSetAdminSigner,
} from "./PhiRegistry.behavior";

describe("Unit tests PhiRegistry", function () {
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

    const Registry = await ethers.getContractFactory("Registry");
    const registry = await upgrades.deployProxy(Registry, [
      this.signers.admin.address,
      this.phiMap.address,
      this.signers.admin.address,
    ]);
    this.phiRegistry = <Registry>await registry.deployed();

    const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
    await this.phiMap.connect(this.signers.admin).grantRole(DEFAULT_ADMIN_ROLE, this.phiRegistry.address);
  });

  describe("PhiRegistry", function () {
    CantChangePhilandOwner0();
    CantChangePhilandAddress();
    shouldBehaveCreatePhiland();
    CantCreatePhiland();
    CantBehaveCreatePhiland();
    CantBehaveDoubleCreatePhiland();
    CantChangePhilandOwner();
    shouldBehaveChangePhilandOwner();
    shouldBehaveSetAdminSigner();
    CantSetAdminSigner();
    shouldBehaveChangePhiMapAddress();
  });
});
