
const { ethers } = require("ethers");
const AINFTs = require('./artifacts/contracts/Ainft.sol/AINFT.json');

// If you don't specify a //url//, Ethers connects to the default 
// (i.e. ``http:/\/localhost:8545``)
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
const signer = provider.getSigner();


async function init() {
    let account = await signer.getAddress();

    console.log(account);
}

async function callContract() {
    // You can also use an ENS name for the contract address
    const address = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    // The Contract object
    const contract = new ethers.Contract(address, AINFTs.abi, provider);
    const contractWithSigner = contract.connect(signer);

    let tokenUri = await contract.tokenURI(1);
    await contractWithSigner.setTokenURI(1, 'shshhsjjs');

    console.log(tokenUri);
}

init();
callContract();