import { expect } from "chai";

export function shouldBehaveSetMaxClaimed(): void {
  it("should Set MaxClaimed id= 1 100", async function () {
    await this.questObject.connect(this.signers.admin).setMaxClaimed(1, 100);
    expect(await this.questObject.connect(this.signers.alice).getMaxClaimed(1)).to.equal(100);
  });
}

export function shouldBehaveSetbaseMetadataURI(): void {
  it("should Set baseMetadataURI", async function () {
    await this.questObject.connect(this.signers.admin).setbaseMetadataURI("https://www.arweave.net/");
    expect(await this.questObject.connect(this.signers.alice).getBaseMetadataURI()).to.equal(
      "https://www.arweave.net/",
    );
  });
}

export function shouldBehaveSetTokenURI(): void {
  it("should Set TokenURI", async function () {
    await this.questObject.connect(this.signers.admin).setTokenURI(1, "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk");
    expect(await this.questObject.connect(this.signers.alice).getTokenURI(1)).to.equal(
      "jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
    expect(await this.questObject.connect(this.signers.alice).uri(1)).to.equal(
      "https://www.arweave.net/jRkF9OhcOzglECJnKtbS1PsICoBlCH6HDuCW8EVePNk",
    );
  });
}

export function shouldBehaveSetSize(): void {
  it("should return the new size once it's changed", async function () {
    await this.questObject.connect(this.signers.admin).setSize(1, { x: 1, y: 2, z: 3 });
    const size = await this.questObject.connect(this.signers.admin).getSize(1);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
  });
}

export function shouldInitToken(): void {
  it("should set token settings", async function () {
    await this.questObject
      .connect(this.signers.admin)
      .createObject(
        3,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 2, z: 3 },
        this.signers.bob.address,
        200,
        5,
      );
    expect(await this.questObject.connect(this.signers.alice).getMaxClaimed(3)).to.equal(200);
    expect(await this.questObject.connect(this.signers.alice).uri(3)).to.equal(
      "https://www.arweave.net/FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
    );
    const size = await this.questObject.connect(this.signers.admin).getSize(1);
    expect(size.x).to.equal(1);
    expect(size.y).to.equal(2);
    expect(size.z).to.equal(3);
    const exp = await this.questObject.connect(this.signers.admin).getExp(1);
    expect(exp).to.equal(5);
  });
}

export function shouldGetTreasuryAddress(): void {
  it("should GetTreasuryAddress", async function () {
    await this.questObject.connect(this.signers.admin).setTreasuryAddress("0xe35E5f8B912C25cDb6B00B347cb856467e4112A3");
    const treasuryAddress = await this.questObject.connect(this.signers.admin).getTreasuryAddress();
    expect(treasuryAddress).to.equal("0xe35E5f8B912C25cDb6B00B347cb856467e4112A3");
  });
}

export function shouldGetObjectInfo(): void {
  it("should getObjectInfo", async function () {
    const objectinfo = await this.questObject.connect(this.signers.admin).getObjectInfo(3);
    expect(objectinfo.creator).to.equal(this.signers.bob.address);
    expect(objectinfo.maxClaimed).to.equal(200);
    expect(objectinfo.size.x).to.equal(1);
    expect(objectinfo.size.y).to.equal(2);
    expect(objectinfo.size.z).to.equal(3);
    expect(objectinfo.exp).to.equal(5);
  });
}

export function CantCreateObjectbyAnonOnwer(): void {
  it("Cant CreateObjectbyNewOnwer", async function () {
    await expect(
      this.questObject
        .connect(this.signers.alice)
        .createObject(
          2,
          "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
          { x: 1, y: 1, z: 2 },
          this.signers.bob.address,
          200,
          5,
        ),
    ).to.be.reverted;
  });
}

export function shouldCreateObjectbyNewOnwer(): void {
  it("should CreateObjectbyNewOnwer", async function () {
    await this.questObject.connect(this.signers.admin).setOwner(this.signers.alice.address);
    await this.questObject
      .connect(this.signers.alice)
      .createObject(
        2,
        "FmdcpWkS4lfGJxgx1H0SifowHxwLkNAxogUhSNgH-Xw",
        { x: 1, y: 1, z: 2 },
        this.signers.bob.address,
        200,
        5,
      );

    await this.questObject.connect(this.signers.admin).removeOwner(this.signers.alice.address);
    await this.questObject.connect(this.signers.admin).setOpenForSale(2, false);
    expect(await this.questObject.connect(this.signers.admin).getOpenForSale(2)).to.equal(false);
  });
}

export function CantGetObject(): void {
  it("cant GetObject", async function () {
    await expect(this.questObject.connect(this.signers.admin).getObject(this.signers.alice.address, 2)).to.be.reverted;
  });
}

export function shouldSetSecondaryRoyalityFee(): void {
  it("should setSecondaryRoyalityFee", async function () {
    await this.questObject.connect(this.signers.admin).setOwner(this.signers.bob.address);
    await this.questObject.connect(this.signers.bob).setSecondaryRoyalityFee(1000);
    await this.questObject.connect(this.signers.admin).removeOwner(this.signers.bob.address);
    expect(await this.questObject.connect(this.signers.admin).ownerCheck(this.signers.bob.address)).to.equal(false);
    await expect(this.questObject.connect(this.signers.bob).setSecondaryRoyalityFee(2000)).to.be.reverted;
    const royaltyInfo = await this.questObject.connect(this.signers.admin).royaltyInfo(1, 10000);
    expect(royaltyInfo[1]).to.equal(1000);
  });
}

export function ShouldGetOwnerCheck(): void {
  it("ShouldGetOwnerCheck", async function () {
    expect(await this.questObject.connect(this.signers.admin).ownerCheck(this.signers.admin.address)).to.equal(true);
  });
}
