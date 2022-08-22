import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, upgrades, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";

import { PhiMap } from "../../src/types/contracts/PhiMap";
import { QuestObject } from "../../src/types/contracts/object/QuestObject";
import { Signers } from "../types";
import {
  CantCreateObjectbyAnonOnwer,
  CantGetObject,
  ShouldGetOwnerCheck,
  shouldBehaveSetMaxClaimed,
  shouldBehaveSetSize,
  shouldBehaveSetTokenURI,
  shouldBehaveSetbaseMetadataURI,
  shouldCreateObjectbyNewOnwer,
  shouldGetObjectInfo,
  shouldGetTreasuryAddress,
  shouldInitToken,
  shouldSetSecondaryRoyalityFee,
} from "./QuestObject.behavior";

describe("Unit tests QuestObject", function () {
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
    await this.questObject.connect(this.signers.admin).getObject(this.signers.alice.address, 1);
  });

  describe("QuestObject", function () {
    shouldBehaveSetbaseMetadataURI();
    shouldBehaveSetMaxClaimed();
    shouldBehaveSetTokenURI();
    shouldBehaveSetSize();
    shouldInitToken();
    shouldGetTreasuryAddress();
    shouldGetObjectInfo();
    CantCreateObjectbyAnonOnwer();
    shouldCreateObjectbyNewOnwer();
    CantGetObject();
    shouldSetSecondaryRoyalityFee();
    ShouldGetOwnerCheck();
  });
});
