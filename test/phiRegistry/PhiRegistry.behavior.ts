import { expect } from "chai";

import { getENSCoupon } from "../helpers";

export function CantChangePhilandOwner0(): void {
  it("cant change Philand not ready", async function () {
    const fakeCoupon = getENSCoupon("zak3939", this.signers.admin.address, this.phiRegistry.address);
    await expect(this.phiRegistry.connect(this.signers.admin).changePhilandOwner("zak3939", fakeCoupon)).to.be.reverted;
  });
}

export function CantChangePhilandAddress(): void {
  it("cant changePhiland address0", async function () {
    await expect(
      this.phiRegistry.connect(this.signers.admin).changePhiMapAddress("0x0000000000000000000000000000000000000000"),
    ).to.be.reverted;
  });
}

export function shouldBehaveCreatePhiland(): void {
  it("should create Philand", async function () {
    const fakeCoupon = getENSCoupon("zak3939", this.signers.admin.address, this.phiRegistry.address);
    await this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939", fakeCoupon);
    expect(await this.phiMap.connect(this.signers.admin).ownerLists("zak3939")).to.equal(this.signers.admin.address);
  });
}

export function CantCreatePhiland(): void {
  it("can't create Philand cause second time", async function () {
    const fakeCoupon = getENSCoupon("zak3939", this.signers.admin.address, this.phiRegistry.address);
    await expect(this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939", fakeCoupon)).to.be.reverted;
  });
}

export function shouldBehaveChangePhilandAddress(): void {
  it("should create Philand", async function () {
    await this.phiRegistry.connect(this.signers.admin).changePhilandAddress(this.phiMap.address);
    expect(await this.phiRegistry.connect(this.signers.admin).getPhiMapAddress()).to.equal(this.phiMap.address);
  });
}

export function CantBehaveCreatePhiland(): void {
  it("Cant create Philand by not ens onwer", async function () {
    const fakeCoupon = getENSCoupon("zak3939", this.signers.admin.address, this.phiRegistry.address);
    await expect(this.phiRegistry.connect(this.signers.admin).createPhiland("test", fakeCoupon)).to.be.reverted;
  });
}

export function CantBehaveDoubleCreatePhiland(): void {
  it("Cant create Philand 2nd times", async function () {
    await expect(this.phiRegistry.connect(this.signers.admin).createPhiland("zak3939")).to.be.reverted;
  });
}

export function CantChangePhilandOwner(): void {
  it("Cant ChangePhilandOwner ", async function () {
    await expect(this.phiRegistry.connect(this.signers.bob).changePhilandOwner("zak3939")).to.be.reverted;
  });
}

export function shouldBehaveChangePhilandOwner(): void {
  it("should change philand owner", async function () {
    const fakeCoupon = getENSCoupon("zak3939", this.signers.bob.address, this.phiRegistry.address);
    await this.phiRegistry.connect(this.signers.bob).changePhilandOwner("zak3939", fakeCoupon);
    expect(await this.phiMap.connect(this.signers.admin).ownerLists("zak3939")).to.equal(this.signers.bob.address);
  });
}

export function shouldBehaveSetAdminSigner(): void {
  it("should setAdminSignerr", async function () {
    await this.phiRegistry.connect(this.signers.admin).setAdminSigner("0xAA9bD7C35be4915dC1F18Afad6E631f0AfCF2461");
    expect(await this.phiRegistry.connect(this.signers.admin).getAdminSigner()).to.equal(
      "0xAA9bD7C35be4915dC1F18Afad6E631f0AfCF2461",
    );
  });
}

export function CantSetAdminSigner(): void {
  it("Cant setAdminSigner", async function () {
    await expect(this.phiRegistry.connect(this.signers.alice).setAdminSigner(this.signers.alice.address)).to.be
      .reverted;
  });
}

export function shouldBehaveChangePhiMapAddress(): void {
  it("should setAdminSignerr", async function () {
    await this.phiRegistry
      .connect(this.signers.admin)
      .changePhiMapAddress("0x48773B4C277a7372e758F7CA953de65d9cd28f96");
    expect(await this.phiRegistry.connect(this.signers.admin).getPhiMapAddress()).to.equal(
      "0x48773B4C277a7372e758F7CA953de65d9cd28f96",
    );
  });
}
