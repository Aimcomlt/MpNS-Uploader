import { ethers } from "ethers";
import MpNS from "../../artifacts/contracts/MpNS.sol/MpNS.json";

// Replace with the address printed during deployment
const CONTRACT_ADDRESS = "0xYourDeployedAddress";

export async function getContract() {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, MpNS.abi, signer);
}
