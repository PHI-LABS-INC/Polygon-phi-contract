const { ethers, defender } = require("hardhat");

async function main() {
  const proxyAddress = "0x754e78bC0f7B487D304552810A5254497084970C";

  const PhiClaimV2 = await ethers.getContractFactory("PhiClaim");
  console.log("Preparing proposal...");
  const proposal = await defender.proposeUpgrade(proxyAddress, PhiClaimV2);
  console.log("Upgrade proposal created at:", proposal.url);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
