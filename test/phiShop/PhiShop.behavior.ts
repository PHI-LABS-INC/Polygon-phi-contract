import { expect } from "chai";
import { ethers } from "ethers";

export function shouldBehaveShopObject(): void {
  it("should behave ShopObject", async function () {
    const ethToSend = ethers.utils.parseEther("0.40");
    await this.phiShop
      .connect(this.signers.alice)
      .shopBuyObject(this.signers.alice.address, [1, 2, 1], [1, 2, 1], [1, 2], { value: ethToSend });
    expect(await this.freeObject.connect(this.signers.alice).balanceOf(this.signers.alice.address, 1)).to.equal(2);
    expect(await this.freeObject.connect(this.signers.alice).balanceOf(this.signers.alice.address, 2)).to.equal(1);
    expect(await this.premiumObject.connect(this.signers.alice).balanceOf(this.signers.alice.address, 1)).to.equal(2);
    expect(await this.premiumObject.connect(this.signers.alice).balanceOf(this.signers.alice.address, 2)).to.equal(1);
    expect(await this.wallPaper.connect(this.signers.alice).balanceOf(this.signers.alice.address, 1)).to.equal(1);
    expect(await this.wallPaper.connect(this.signers.alice).balanceOf(this.signers.alice.address, 2)).to.equal(1);
  });
}
