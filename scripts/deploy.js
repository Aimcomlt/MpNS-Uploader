const hre = require("hardhat");

async function main() {
  const MpNS = await hre.ethers.getContractFactory("MpNS");
  const mpns = await MpNS.deploy();
  await mpns.deployed();
  console.log("MpNS deployed to:", mpns.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
