
const { ethers } = require("ethers");
const AINFTs = require('./artifacts/contracts/Ainft.sol/AINFT.json');
const axios = require('axios');
require('dotenv').config()


// If you don't specify a //url//, Ethers connects to the default 
// (i.e. ``http:/\/localhost:8545``)
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
//const signer = provider.getSigner();
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


//base api url
const baseURL = "http://localhost:3000";


async function init() {
    let account = await signer.getAddress();

    console.log(account);
}

async function callContract() {
    // You can also use an ENS name for the contract address
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // The Contract object
    const contract = new ethers.Contract(address, AINFTs.abi, provider);
    const contractWithSigner = contract.connect(signer);

    let tokens = await contract.getAllTokens();

    //call api and set url if token url==""
    await axios.get(baseURL + '/images/generate-images')
        .then(function (response) {
            console.log(response);
            //mint here, image should have been stored
            //setImage(response.data[0]);

        })
        .catch(function (error) {
            console.log(error);
        });

    tokens.forEach(token_id => {

    });
    let tokenUri = await contract.tokenURI(0);
    await contractWithSigner.setTokenURI(0, '');

    console.log(tokenUri);
}

init();
callContract();