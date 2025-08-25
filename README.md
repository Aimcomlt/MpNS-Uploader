# MpNS-Uploader

A minimal decentralized name system for mapping human-readable names to IPFS hashes. Includes a Solidity smart contract deployed via Hardhat and a React frontend for uploading files and resolving names.

## Prerequisites
- Node.js >= 16
- Local IPFS node running at `localhost:5001`
- Hardhat node (`npx hardhat node`)
- MetaMask configured for the Hardhat localhost network

## Installation
```bash
npm install
cd client && npm install
```

## Compile & Deploy
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```
Copy the printed contract address into `client/src/contract.js`.

## Run the React App
```bash
cd client
npm start
```

Upload a file, choose a name, and store it on-chain. Use the "Fetch" section to resolve names and view content.
