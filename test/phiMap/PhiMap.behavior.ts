import { expect } from "chai";

export function shouldBehaveOwnerOfPhiland(): void {
  it("should behave owner of philand", async function () {
    expect(await this.phiMap.connect(this.signers.admin).ownerOfPhiland("zak3939")).to.equal(
      this.signers.admin.address,
    );
    expect(await this.phiMap.connect(this.signers.admin).ownerOfPhiland("test")).to.equal(this.signers.alice.address);
  });
}

export function shouldBehaveviewPhiland(): void {
  it("should view Philand ", async function () {
    const aliceENSLAnd = await this.phiMap.connect(this.signers.alice).viewPhiland("test");
    expect(aliceENSLAnd).to.deep.equal([]);
  });
}

export function shouldBehaveViewNumberOfPhiland(): void {
  it("should get number of philand", async function () {
    const NoP = await this.phiMap.connect(this.signers.alice).viewNumberOfPhiland();
    expect(NoP).to.equal(3);
  });
}

export function shouldBehaveClaimStarterObject(): void {
  it("should mint claimStarterObject", async function () {
    await this.freeObject.connect(this.signers.admin).batchGetFreeObject([1, 2, 3]);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 1)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 2)).to.equal(1);
    expect(await this.freeObject.balanceOf(this.signers.admin.address, 3)).to.equal(1);
  });
}

export function shouldBehaveBatchDeposit(): void {
  it("should batch deposit and balance of batch 1->0", async function () {
    await this.freeObject.connect(this.signers.alice).batchGetFreeObject([1, 2, 3]);
    await this.phiMap
      .connect(this.signers.alice)
      .batchDepositObject(
        "test",
        [this.freeObject.address, this.freeObject.address, this.freeObject.address],
        [1, 2, 3],
        [1, 1, 1],
      );
    // const blockNumBefore = await ethers.provider.getBlockNumber();
    // const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    // const timestampBefore = blockBefore.timestamp;
    const status = await this.phiMap.checkDepositStatus("test", this.freeObject.address, 3);
    expect(status.amount).to.equal(1);
    // expect(status.timestamp).to.equal(timestampBefore);
    expect(await this.freeObject.balanceOf(this.signers.alice.address, 3)).to.equal(0);
  });
}
export function shouldBehaveCheckDepositStatus(): void {
  it("should check single Deposit Status", async function () {
    const deposit = await this.phiMap.checkDepositStatus("test", this.freeObject.address, 2);
    expect(deposit.amount).to.equal(1);
    expect(deposit.used).to.equal(0);
  });
}

export function shouldBehaveCheckAllDepositStatus(): void {
  it("should check All Deposit Status", async function () {
    const deposits = await this.phiMap.connect(this.signers.alice).checkAllDepositStatus("test");
    for (const i in deposits) {
      expect(deposits[i].contractAddress).to.equal(this.freeObject.address);
      expect(deposits[i].tokenId).to.equal(Number(i) + 1);
      expect(deposits[i].amount).to.equal(1);
      expect(deposits[i].used).to.equal(0);
    }
  });
}

export function shouldBehaveCheckDepositAvailable(): void {
  it("should check Deposit Available", async function () {
    expect(this.phiMap.connect(this.signers.alice).checkDepositAvailable("test", this.freeObject.address, 1)).to.equal(
      true,
    );
  });
}

export function shouldBehaveDeposit(): void {
  it("should deposit and balance 1->0", async function () {
    expect(await this.questObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
    await this.phiMap.connect(this.signers.alice).batchDepositObject("test", [this.questObject.address], [1], [1]);
    // const blockNumBefore = await ethers.provider.getBlockNumber();
    // const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    // const timestampBefore = blockBefore.timestamp;
    const status = await this.phiMap.checkDepositStatus("test", this.questObject.address, 1);
    expect(status.amount).to.equal(1);
    // expect(status.timestamp).to.equal(timestampBefore);
    expect(await this.questObject.balanceOf(this.signers.alice.address, 1)).to.equal(0);
  });
}

export function shouldBehaveAddDeposit(): void {
  it("should deposit again", async function () {
    await this.questObject.connect(this.signers.admin).getObject(this.signers.alice.address, 1);
    expect(await this.questObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
    await this.phiMap.connect(this.signers.alice).batchDepositObject("test", [this.questObject.address], [1], [1]);
    const status = await this.phiMap.checkDepositStatus("test", this.questObject.address, 1);
    expect(status.amount).to.equal(2);
    expect(status.used).to.equal(0);
  });
}
export function shouldBehaveWithdraw(): void {
  it("should withdraw and balance 0->1", async function () {
    expect(await this.questObject.balanceOf(this.signers.alice.address, 1)).to.equal(0);
    await this.phiMap.connect(this.signers.alice).batchWithdrawObject("test", [this.questObject.address], [1], [1]);
    expect(await this.questObject.balanceOf(this.signers.alice.address, 1)).to.equal(1);
  });
}

export function shouldBehaveWriteObjectToLand(): void {
  it("should write object to land", async function () {
    await this.phiMap.connect(this.signers.alice).batchDepositObject("test", [this.questObject.address], [1], [1]);
    await this.phiMap
      .connect(this.signers.alice)
      .writeObjectToLand("test", { contractAddress: this.questObject.address, tokenId: 1, xStart: 1, yStart: 1 }, [
        "",
        "",
      ]);
    const status = await this.phiMap.checkDepositStatus("test", this.questObject.address, 1);
    expect(status.amount).to.equal(2);
    expect(status.used).to.equal(1);
  });
}

export function shouldBehaveBatchWithdraw(): void {
  it("should batchWithdrawObject from land", async function () {
    await this.phiMap.connect(this.signers.alice).batchWithdrawObject("test", [this.questObject.address], [1], [1]);
    const status = await this.phiMap.checkDepositStatus("test", this.questObject.address, 1);
    expect(status.amount).to.equal(1);
    expect(status.used).to.equal(1);
  });
}

export function CantBatchWithdraw(): void {
  it("cant batchwithdraw from land because allready used", async function () {
    await expect(
      this.phiMap.connect(this.signers.alice).batchWithdrawObject("test", [this.questObject.address], [1], [1]),
    ).to.be.reverted;
  });
}

export function shouldBehaveViewPhiland(): void {
  it("should get response land", async function () {
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[0].contractAddress).to.equal(this.questObject.address);
    expect(land[0].tokenId).to.equal(1);
    expect(land[0].xStart).to.equal(1);
    expect(land[0].yStart).to.equal(1);
    expect(land[0].xEnd).to.equal(2);
    expect(land[0].yEnd).to.equal(2);
  });
}

export function shouldBehaveRemoveObjectFromLand(): void {
  it("should remove object from land", async function () {
    await this.phiMap.connect(this.signers.alice).removeObjectFromLand("test", 0);
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[0].contractAddress).to.equal("0x0000000000000000000000000000000000000000");
    expect(land[0].tokenId).to.equal(0);
    expect(land[0].xStart).to.equal(0);
    expect(land[0].yStart).to.equal(0);
    expect(land[0].xEnd).to.equal(0);
    expect(land[0].yEnd).to.equal(0);
  });
}

export function shouldBehaveBatchWriteObjectToLand(): void {
  it("should batch write object to land", async function () {
    await this.phiMap
      .connect(this.signers.alice)
      .batchDepositObject(
        "test",
        [this.questObject.address, this.questObject.address, this.questObject.address],
        [1, 2, 3],
        [1, 1, 1],
      );
    await this.phiMap.connect(this.signers.alice).save(
      "test",
      [],
      [
        { contractAddress: this.questObject.address, tokenId: 1, xStart: 1, yStart: 1 },
        { contractAddress: this.questObject.address, tokenId: 2, xStart: 2, yStart: 2 },
        { contractAddress: this.questObject.address, tokenId: 3, xStart: 4, yStart: 3 },
      ],
      [
        { title: "", url: "" },
        { title: "", url: "" },
        { title: "zak3939", url: "zak3939.eth" },
      ],
      "0x0000000000000000000000000000000000000000",
      0,
      "0x0000000000000000000000000000000000000000",
      0,
    );
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");

    expect(land[0].contractAddress).to.equal(this.questObject.address);
    expect(land[0].tokenId).to.equal(1);
    expect(land[0].xStart).to.equal(1);
    expect(land[0].yStart).to.equal(1);
    expect(land[0].xEnd).to.equal(2);
    expect(land[0].yEnd).to.equal(2);
    expect(land[1].contractAddress).to.equal(this.questObject.address);
    expect(land[1].tokenId).to.equal(2);
    expect(land[1].xStart).to.equal(2);
    expect(land[1].yStart).to.equal(2);
    expect(land[1].xEnd).to.equal(4);
    expect(land[1].yEnd).to.equal(3);
    expect(land[2].contractAddress).to.equal(this.questObject.address);
    expect(land[2].tokenId).to.equal(3);
    expect(land[2].xStart).to.equal(4);
    expect(land[2].yStart).to.equal(3);
    expect(land[2].xEnd).to.equal(5);
    expect(land[2].yEnd).to.equal(5);
  });
}

export function shouldBehaveBatchRemoveAndWrite(): void {
  it("should batchRemoveAndWrite", async function () {
    await this.phiMap
      .connect(this.signers.alice)
      .save(
        "test",
        [1],
        [{ contractAddress: this.questObject.address, tokenId: 2, xStart: 6, yStart: 7 }],
        [{ title: "", url: "" }],
        "0x0000000000000000000000000000000000000000",
        0,
        "0x0000000000000000000000000000000000000000",
        0,
      );
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[2].contractAddress).to.equal(this.questObject.address);
    expect(land[2].tokenId).to.equal(2);
    expect(land[2].xStart).to.equal(6);
    expect(land[2].yStart).to.equal(7);
    expect(land[2].xEnd).to.equal(8);
    expect(land[2].yEnd).to.equal(8);
  });
}

export function shouldBehaveViewPhilandArray(): void {
  it("should viewPhilandArray test.eth", async function () {
    const philandArray = await this.phiMap.connect(this.signers.admin).viewPhilandArray("test");
    await expect(this.phiMap.connect(this.signers.admin).viewPhilandArray("test")).to.not.be.reverted;
  });
}

// export function shouldBehaveWriteLinkToObject(): void {
//   it("should write link to object 1", async function () {
//     await this.phiMap.connect(this.signers.alice).writeLinkToObject("test", 1, ["zak3939", "zak3939.eth"]);
//     const objectLink = await this.phiMap.connect(this.signers.admin).viewObjectLink("test", 1);
//     expect(objectLink.title).to.equal("zak3939");
//     expect(objectLink.url).to.equal("zak3939.eth");
//   });
// }

// export function CantWriteLinkToAnotherUserObject(): void {
//   it("CantWrite link to another user object ", async function () {
//     await expect(this.phiMap.connect(this.signers.admin).writeLinkToObject("test", 1, ["zak3939", "zak3939.eth"])).to.be
//       .reverted;
//   });
// }

// export function CantWriteLinkToObject(): void {
//   it("Cant write link to object 3", async function () {
//     await expect(this.phiMap.connect(this.signers.alice).writeLinkToObject("test", 3, ["zak3939", "zak3939.eth"])).to.be
//       .reverted;
//   });
// }

export function shouldBehaveViewLinks(): void {
  it("should write link to object 2 and check 2 link", async function () {
    const Links = await this.phiMap.connect(this.signers.admin).viewLinks("test");
    expect(Links[1].title).to.equal("zak3939");
    expect(Links[1].url).to.equal("zak3939.eth");
  });
}

// export function shouldBehaveRemoveLinkfromObject(): void {
//   it("should remove link from object 1", async function () {
//     await this.phiMap.connect(this.signers.alice).removeLinkFromObject("test", 1);
//     const objectLink = await this.phiMap.connect(this.signers.admin).viewObjectLink("test", 1);
//     expect(objectLink.title).to.equal("");
//     expect(objectLink.url).to.equal("");
//   });
// }

export function shouldBehavebatchRemoveAndWrite2(): void {
  it("should batch remove object from land", async function () {
    await this.phiMap
      .connect(this.signers.alice)
      .save(
        "test",
        [0, 2],
        [],
        [],
        "0x0000000000000000000000000000000000000000",
        0,
        "0x0000000000000000000000000000000000000000",
        0,
      );
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land[0].contractAddress).to.equal(this.questObject.address);
    expect(land[0].tokenId).to.equal(3);
    expect(land[0].xStart).to.equal(4);
    expect(land[0].yStart).to.equal(3);
    expect(land[0].xEnd).to.equal(5);
    expect(land[0].yEnd).to.equal(5);
  });
}

export function shouldBehaveInitialization(): void {
  it("should Initialization", async function () {
    await this.phiMap.connect(this.signers.alice).mapInitialization("test");
    const land = await this.phiMap.connect(this.signers.admin).viewPhiland("test");
    expect(land).to.deep.equal([]);
    const links = await this.phiMap.connect(this.signers.admin).viewLinks("test");
    expect(links).to.deep.equal([]);
  });
}

export function shouldBehaveCheckAllDepositStatusAfterInit(): void {
  it("should check All Deposit used = 0 After init", async function () {
    const deposits = await this.phiMap.connect(this.signers.alice).checkAllDepositStatus("test");
    for (const i in deposits) {
      expect(deposits[i].used).to.equal(0);
    }
  });
}

export function CantWriteObjectToLand(): void {
  it("cant write object to land : out of map range", async function () {
    await expect(
      this.phiMap
        .connect(this.signers.alice)
        .writeObjectToLand("test", { contractAddress: this.questObject.address, tokenId: 2, xStart: 15, yStart: 1 }),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.alice)
        .writeObjectToLand("test", { contractAddress: this.questObject.address, tokenId: 3, xStart: 1, yStart: 15 }),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.alice)
        .writeObjectToLand("test", { contractAddress: this.questObject.address, tokenId: 2, xStart: -1, yStart: 1 }),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.alice)
        .writeObjectToLand("test", { contractAddress: this.questObject.address, tokenId: 3, xStart: 1, yStart: -1 }),
    ).to.be.reverted;
  });
}

export function shouldBehaveChangeWallPaper(): void {
  it("should ChangeWallPaper", async function () {
    await this.wallPaper.connect(this.signers.alice).batchWallPaper([1]);
    const lastWallPaper = await this.phiMap.connect(this.signers.alice).checkWallPaper("test");
    expect(lastWallPaper.contractAddress).to.equal("0x0000000000000000000000000000000000000000");

    await this.phiMap.connect(this.signers.alice).changeWallPaper("test", this.wallPaper.address, 1);
    const currentWallPaper = await this.phiMap.connect(this.signers.alice).checkWallPaper("test");
    expect(currentWallPaper.contractAddress).to.equal(this.wallPaper.address);
    await this.wallPaper.connect(this.signers.alice).batchWallPaper([2]);
    await this.phiMap.connect(this.signers.alice).changeWallPaper("test", this.wallPaper.address, 2);
    const secondWallPaper = await this.phiMap.connect(this.signers.alice).checkWallPaper("test");
    expect(secondWallPaper.tokenId).to.equal(2);
  });
}

export function shouldBehaveChangeBasePlate(): void {
  it("should ChangeBasePlate", async function () {
    await this.basePlate.connect(this.signers.alice).batchBasePlate([1]);
    const lastBasePlate = await this.phiMap.connect(this.signers.alice).checkBasePlate("test");
    expect(lastBasePlate.contractAddress).to.equal("0x0000000000000000000000000000000000000000");
    await this.phiMap.connect(this.signers.alice).changeBasePlate("test", this.basePlate.address, 1);
    const currentBasePlate = await this.phiMap.connect(this.signers.alice).checkBasePlate("test");
    expect(currentBasePlate.contractAddress).to.equal(this.basePlate.address);
    await this.basePlate.connect(this.signers.alice).batchBasePlate([2]);
    await this.phiMap.connect(this.signers.alice).changeBasePlate("test", this.basePlate.address, 2);
    const secondBasePlate = await this.phiMap.connect(this.signers.alice).checkBasePlate("test");
    expect(secondBasePlate.tokenId).to.equal(2);
  });
}

export function shouldflipLockMap(): void {
  it("should flipLockMap", async function () {
    await this.phiMap.connect(this.signers.admin).flipLockMap();
    await expect(this.phiMap.connect(this.signers.alice).changeWallPaper("test", this.wallPaper.address, 1)).to.be
      .reverted;
    await this.phiMap.connect(this.signers.admin).flipLockMap();
    await this.phiMap.connect(this.signers.alice).changeWallPaper("test", this.wallPaper.address, 1);
    const currentWallPaper = await this.phiMap.connect(this.signers.alice).checkWallPaper("test");
    expect(currentWallPaper.contractAddress).to.equal(this.wallPaper.address);
  });
}

// export function shouldBehaveWithdrawWallPaper(): void {
//   it("should WithdrawWallPaper", async function () {
//     await this.phiMap.connect(this.signers.alice).withdrawWallPaper("test");
//     const lastWallPaper = await this.phiMap.connect(this.signers.alice).checkWallPaper("test");
//     expect(lastWallPaper.contractAddress).to.equal("0x0000000000000000000000000000000000000000");
//   });
// }

export function shouldBehaveSave(): void {
  it("should save object to land", async function () {
    const beforeAliceENSLand = await this.phiMap.connect(this.signers.alice).viewPhiland("test");
    expect(beforeAliceENSLand).to.deep.equal([]);
    await this.phiMap
      .connect(this.signers.alice)
      .save(
        "test",
        [],
        [{ contractAddress: this.questObject.address, tokenId: 1, xStart: 1, yStart: 1 }],
        [{ title: "test111", url: "" }],
        "0x0000000000000000000000000000000000000000",
        0,
        "0x0000000000000000000000000000000000000000",
        0,
      );
    await this.phiMap
      .connect(this.signers.alice)
      .save(
        "test",
        [0],
        [{ contractAddress: this.questObject.address, tokenId: 2, xStart: 2, yStart: 2 }],
        [{ title: "test222", url: "" }],
        "0x0000000000000000000000000000000000000000",
        0,
        "0x0000000000000000000000000000000000000000",
        0,
      );
    await this.phiMap
      .connect(this.signers.alice)
      .save(
        "test",
        [],
        [{ contractAddress: this.questObject.address, tokenId: 3, xStart: 4, yStart: 3 }],
        [{ title: "test333", url: "" }],
        this.wallPaper.address,
        1,
        "0x0000000000000000000000000000000000000000",
        0,
      );

    const aliceENSLand2 = await this.phiMap.connect(this.signers.alice).viewPhiland("test");
    expect(aliceENSLand2.length).equal(2);
    const token1deposit = await this.phiMap
      .connect(this.signers.alice)
      .checkDepositStatus("test", this.questObject.address, 0);
    expect(token1deposit.used).to.equal(0);
    const token2deposit = await this.phiMap
      .connect(this.signers.alice)
      .checkDepositStatus("test", this.questObject.address, 2);
    expect(token2deposit.used).to.equal(1);
    const token3deposit = await this.phiMap
      .connect(this.signers.alice)
      .checkDepositStatus("test", this.questObject.address, 3);
    expect(token3deposit.used).to.equal(1);
    const currentWallPaper = await this.phiMap.connect(this.signers.alice).checkWallPaper("test");
    expect(currentWallPaper.contractAddress).to.equal(this.wallPaper.address);
  });
}

export function shouldBehave0NotOwnerOfPhiland(): void {
  it("should WithdrawWallPaper", async function () {
    const address0 = await this.phiMap.connect(this.signers.alice).ownerOfPhiland("sub.test");
    expect(address0).to.equal("0x0000000000000000000000000000000000000000");
  });
}

export function CantNotBalanceDeposit(): void {
  it("cant NotBalanceDeposit", async function () {
    await this.freeObject.connect(this.signers.bob).batchGetFreeObject([1, 2, 2]);
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .batchDepositObject(
          "phi.zak3939",
          [this.freeObject.address, this.freeObject.address, this.freeObject.address],
          [1, 2, 3],
          [1, 1, 1],
        ),
    ).to.be.reverted;
  });
}

export function CantNotDepositObjectWrite(): void {
  it("CantNotDepositObjectWrite", async function () {
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 3, xStart: 4, yStart: 3 }],
          [{ title: "test333", url: "" }],
          this.wallPaper.address,
          1,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
  });
}

export function CantObjectWriteOutofRange(): void {
  it("CantObjectWriteOutofRange", async function () {
    await this.freeObject.connect(this.signers.bob).batchGetFreeObject([3]);
    await this.phiMap
      .connect(this.signers.bob)
      .batchDepositObject("phi.zak3939", [this.freeObject.address, this.freeObject.address], [2, 3], [2, 1]);
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: -1, yStart: 15 }],
          [{ title: "test333", url: "" }],
          "0x0000000000000000000000000000000000000000",
          0,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 3, yStart: 17 }],
          [{ title: "test333", url: "" }],
          "0x0000000000000000000000000000000000000000",
          0,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 17, yStart: 3 }],
          [{ title: "test222", url: "" }],
          "0x0000000000000000000000000000000000000000",
          0,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 15, yStart: 15 }],
          [{ title: "test333", url: "" }],
          "0x0000000000000000000000000000000000000000",
          0,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 14, yStart: -1 }],
          [{ title: "test333", url: "" }],
          "0x0000000000000000000000000000000000000000",
          0,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 14, yStart: 17 }],
          [{ title: "test333", url: "" }],
          "0x0000000000000000000000000000000000000000",
          0,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 3, xStart: 14, yStart: 15 }],
          [{ title: "test333", url: "" }],
          "0x0000000000000000000000000000000000000000",
          0,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
  });
}

export function CantObjectWriteCollision(): void {
  it("CantNotDepositObjectWrite !Collision!", async function () {
    await this.phiMap
      .connect(this.signers.bob)
      .save(
        "phi.zak3939",
        [],
        [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 6, yStart: 6 }],
        [{ title: "test333", url: "" }],
        "0x0000000000000000000000000000000000000000",
        0,
        "0x0000000000000000000000000000000000000000",
        0,
      );

    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 13, yStart: 15 }],
          [{ title: "test222", url: "" }],
          "0x0000000000000000000000000000000000000000",
          0,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;

    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 14, yStart: 15 }],
          [{ title: "test333", url: "" }],
          this.wallPaper.address,
          1,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
  });
}

export function CantflipLockMap(): void {
  it("cant flipLockMap not admin", async function () {
    await expect(this.phiMap.connect(this.signers.bob).flipLockMap()).to.be.reverted;
  });
}

export function CantSetInvalidSizeMap(): void {
  it("CantSetInvalidMap", async function () {
    await this.wallPaper.connect(this.signers.alice).batchWallPaper([3]);
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .save(
          "phi.zak3939",
          [],
          [{ contractAddress: this.freeObject.address, tokenId: 2, xStart: 12, yStart: 12 }],
          [{ title: "test333", url: "" }],
          this.wallPaper.address,
          3,
          "0x0000000000000000000000000000000000000000",
          0,
        ),
    ).to.be.reverted;
  });
}

export function CantSetNotbalanceWallPaper(): void {
  it("CantSetNotbalanceWallPaper", async function () {
    await this.wallPaper.connect(this.signers.alice).batchWallPaper([1]);
    await expect(this.phiMap.connect(this.signers.bob).changeWallPaper("phi.zak3939", this.wallPaper.address, 1)).to.be
      .reverted;
  });
}

export function shouldBalanceDeposit2(): void {
  it("should BalanceDeposit2", async function () {
    await this.freeObject.connect(this.signers.bob).batchGetFreeObject([1, 1]);
    await this.phiMap
      .connect(this.signers.bob)
      .batchDepositObject("phi.zak3939", [this.freeObject.address, this.freeObject.address], [1, 1], [1, 1]);
  });
}

export function CantViewPhilandArray(): void {
  it("should viewPhilandArray", async function () {
    await expect(this.phiMap.connect(this.signers.bob).viewPhilandArray("test.zak39")).to.be.reverted;
  });
}

export function CantWriteObjectToLandOverDeposit(): void {
  it("CantWriteObjectToLandOverDeposit", async function () {
    await this.freeObject.connect(this.signers.bob).batchGetFreeObject([4]);
    await this.phiMap.connect(this.signers.bob).batchDepositObject("phi.zak3939", [this.freeObject.address], [4], [1]);
    await this.phiMap
      .connect(this.signers.bob)
      .writeObjectToLand(
        "phi.zak3939",
        { contractAddress: this.freeObject.address, tokenId: 4, xStart: 0, yStart: 0 },
        ["", ""],
      );
    await expect(
      this.phiMap
        .connect(this.signers.bob)
        .writeObjectToLand(
          "phi.zak3939",
          { contractAddress: this.freeObject.address, tokenId: 4, xStart: 4, yStart: 4 },
          ["", ""],
        ),
    ).to.be.reverted;
  });
}
