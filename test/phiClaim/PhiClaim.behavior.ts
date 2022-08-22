import { expect } from "chai";

import { getCoupon } from "../helpers";

const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";
export function shouldBehaveGetOwner(): void {
  it("deployer has default admin role", async function () {
    expect(await this.phiClaim.hasRole(DEFAULT_ADMIN_ROLE, this.signers.admin.address)).to.equal(true);
  });
}

export function shouldAdminItself(): void {
  it("admin role's admin is itself", async function () {
    expect(await this.phiClaim.getRoleAdmin(DEFAULT_ADMIN_ROLE)).to.equal(DEFAULT_ADMIN_ROLE);
  });
}

export function shouldBehaveGetAdminSigner(): void {
  it("GetAdminSigner", async function () {
    expect(await this.phiClaim.connect(this.signers.admin).getAdminSigner()).to.equal(this.signers.admin.address);
  });
}

export function shouldBehaveSetCouponType(): void {
  it("set Coupon Type", async function () {
    await this.phiClaim.connect(this.signers.admin).setCouponType("uniswap10", 4);
    expect(await this.phiClaim.connect(this.signers.admin).getCouponType("uniswap10")).to.equal(4);
  });
}

export function shouldBehaveClaimObject(): void {
  it("mint loot object", async function () {
    await this.phiClaim.connect(this.signers.admin).setCouponType("lootbalance", 1);
    const fakeCoupon = getCoupon(this.signers.alice.address, this.questObject.address);
    expect(
      await this.phiClaim
        .connect(this.signers.alice)
        .checkClaimedStatus(this.signers.alice.address, this.questObject.address, 1),
    ).to.equal(0);
    await this.phiClaim
      .connect(this.signers.alice)
      .claimQuestObject(
        this.questObject.address,
        1,
        "lootbalance",
        fakeCoupon[(this.questObject.address, this.signers.alice.address)]["coupon"],
      );
    expect(await this.questObject.connect(this.signers.admin).balanceOf(this.signers.alice.address, 1)).to.equal(1);
    expect(
      await this.phiClaim
        .connect(this.signers.admin)
        .checkClaimedStatus(this.signers.alice.address, this.questObject.address, 1),
    ).to.equal(1);
  });
}

export function CantClaimObject2nd(): void {
  it("CantClaimObject2nd", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address, this.questObject.address);
    expect(
      await this.phiClaim
        .connect(this.signers.admin)
        .checkClaimedStatus(this.signers.alice.address, this.questObject.address, 1),
    ).to.equal(1);
    await expect(
      this.phiClaim
        .connect(this.signers.alice)
        .claimQuestObject(
          this.questObject.address,
          1,
          "lootbalance",
          fakeCoupon[(this.questObject.address, this.signers.alice.address)]["coupon"],
        ),
    ).to.be.reverted;
  });
}
export function CantClaimObjectInvalidToken(): void {
  it("InvalidToken", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address, this.freeObject.address);
    await expect(
      this.phiClaim
        .connect(this.signers.alice)
        .claimQuestObject(
          this.questObject.address,
          1,
          "lootbalance",
          fakeCoupon[(this.freeObject.address, this.signers.alice.address)]["coupon"],
        ),
    ).to.be.reverted;
  });
}

export function CantSetCouponType(): void {
  it("cant set Coupon Type", async function () {
    await expect(this.phiClaim.connect(this.signers.alice).setCouponType("uniswap10", 4)).to.be.reverted;
  });
}

export function CantClaimObjectWithdiffUser(): void {
  it("cant claim by bob,not alice(coupon claim user)", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address, this.questObject.address);
    await expect(
      this.phiClaim
        .connect(this.signers.bob)
        .claimQuestObject(1, "lootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}
export function CantClaimObjectWithdiffTokenId(): void {
  it("cant claim by different token Id", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address, this.questObject.address);
    await expect(
      this.phiClaim
        .connect(this.signers.alice)
        .claimQuestObject(2, "lootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}

export function CantClaimObjectWithdiffCondition(): void {
  it("cant claim different condition", async function () {
    const fakeCoupon = getCoupon(this.signers.alice.address, this.questObject.address);
    await expect(
      this.phiClaim
        .connect(this.signers.alice)
        .claimQuestObject(1, "fakelootbalance", fakeCoupon[this.signers.alice.address]["coupon"]),
    ).to.be.reverted;
  });
}

export function shouldBehaveSetAdminSigner(): void {
  it("should setAdminSignerr", async function () {
    await this.phiClaim.connect(this.signers.admin).setAdminSigner("0xAA9bD7C35be4915dC1F18Afad6E631f0AfCF2461");
    expect(await this.phiClaim.connect(this.signers.admin).getAdminSigner()).to.equal(
      "0xAA9bD7C35be4915dC1F18Afad6E631f0AfCF2461",
    );
  });
}

export function CantSetAdminSigner(): void {
  it("Cant setAdminSigner", async function () {
    await expect(this.phiClaim.connect(this.signers.alice).setAdminSigner(this.signers.alice.address)).to.be.reverted;
  });
}

export function CantSetAdminSignerAddress0(): void {
  it("Cant setAdminSigner", async function () {
    await expect(this.phiClaim.connect(this.signers.admin).setAdminSigner("0x0000000000000000000000000000000000000000"))
      .to.be.reverted;
  });
}
