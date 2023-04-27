import hre from "hardhat";

async function contractUpgradePrepare() {
  const proxyAddress = "0x754e78bC0f7B487D304552810A5254497084970C";

  const PhiClaimV2 = await hre.ethers.getContractFactory("PhiClaim");
  console.log("Preparing upgrade...");
  const PhiClaimV2Address = await hre.upgrades.prepareUpgrade(proxyAddress, PhiClaimV2);
  console.log("PhiClaimV2 at:", PhiClaimV2Address);
}

contractUpgradePrepare()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
