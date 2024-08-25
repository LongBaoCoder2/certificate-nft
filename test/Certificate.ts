const { expect } = require("chai");
const hre = require("hardhat");
import contract from "../artifacts/contracts/Certificate.sol/Certificate.json";
require("dotenv").config();

describe("Certificate", function () {
  it("be able to mint a token", async function () {
    // deploy a lock contract where funds can be withdrawn
    // one year in the future
    // Use only one
    const imageUri =
      "https://red-personal-mockingbird-716.mypinata.cloud/ipfs/QmTRfWteJfefbgRm74fVJVLKXqFeRDz9hnHjN9UpRR9hAh";

    const provider = new ethers.InfuraProvider(
      "sepolia",
      process.env.INFURA_API_KEY
    );
    console.log("provider");

    const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("signer");

    const abi = contract.abi;
    const contractAddress = process.env.SMART_CONTRACT_ADDRESS;
    console.log("contractAddress");

    const mySDNContract = new ethers.Contract(contractAddress, abi, signer);
    console.log("mySDNContract");

    let SDNTxn = await mySDNContract.safeMint(signer.address, imageUri);
    console.log("mySDNContract");

    SDNTxn.wait();
    console.log("mySDNContract");
  });
});
