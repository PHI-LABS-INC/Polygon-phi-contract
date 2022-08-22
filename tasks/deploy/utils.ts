import fs from "fs";

const DEPLOYMENTS_DIR = `deployments`;

export function getAddress(contract: string, network: string) {
  try {
    return JSON.parse(fs.readFileSync(`./deployments/${network}/${contract}.json`).toString()).address;
  } catch (err) {
    throw Error(`${contract} deployment on ${network} not found, run 'yarn deploy:${network}'`);
  }
}

export function save(name: string, contract: any, network: string, block?: number) {
  if (!fs.existsSync(`${DEPLOYMENTS_DIR}/${network}`)) {
    fs.mkdirSync(`${DEPLOYMENTS_DIR}/${network}`, { recursive: true });
  }
  fs.writeFileSync(
    `${DEPLOYMENTS_DIR}/${network}/${name}.json`,
    JSON.stringify({
      address: contract.address,
      block,
    }),
  );
}
