import { Signer } from "ethers";
import hre from "hardhat";

import { save } from "./utils";

export async function deployPhiPolygonTest(): Promise<void> {
  const [l1Signer] = await hre.ethers.getSigners();
  let NETWORK;
  if (hre.network.name === "fork") {
    NETWORK = "mainnet";
  } else {
    NETWORK = hre.network.name;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const BLOCK_NUMBER = await l1Signer.provider.getBlockNumber();
  console.log(l1Signer.address);
  console.log(`Deploying from:`);
  console.log(`\tl1: ${(await l1Signer.getAddress()).toString()}`);
  const phiClaim = await deployL1Upgrade(NETWORK, "PhiClaimTest", BLOCK_NUMBER, [l1Signer.address, l1Signer.address]);
}

async function deployL1Upgrade(
  network: string,
  name: string,
  blockNumber: number,
  calldata: any = [],
  saveName?: string,
  signerOrOptions?: Signer,
) {
  console.log(`Deploying: ${name}${(saveName && "/" + saveName) || ""}...`);
  const contractFactory = await hre.ethers.getContractFactory(name, signerOrOptions);
  console.log(calldata);
  const upgrade = await hre.upgrades.deployProxy(contractFactory, [...calldata]);
  const contract = await upgrade.deployed();
  save(saveName || name, contract, hre.network.name, blockNumber);

  console.log(`Waiting for deployment to complete`);
  await contract.deployTransaction.wait();

  console.log(`Deployed: ${saveName || name} to: ${contract.address}`);
  console.log(`To verify: npx hardhat verify --network ${network} ${contract.address}`);
  await contract.deployed();
  return contract;
}

deployPhiPolygonTest()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
