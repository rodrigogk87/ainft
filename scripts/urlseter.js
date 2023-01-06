
const { ethers } = require("ethers");
const AINFTs = require('./artifacts/contracts/Ainft.sol/AINFT.json');
const axios = require('axios');
require('dotenv').config()


// If you don't specify a //url//, Ethers connects to the default 
// (i.e. ``http:/\/localhost:8545``)
const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`);

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
//const signer = provider.getSigner();
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


//base api url
const baseURL = "http://localhost:3000";


async function checkTokensAndFillUrls() {
    // You can also use an ENS name for the contract address
    const address = "0x2b9d6E6e68073E270e19666DF097e8C9beB6Fb07";
    const contract = new ethers.Contract(address, AINFTs.abi, provider);
    const contractWithSigner = contract.connect(signer);

    let tokens = await contract.getAllTokens();

    for (const token_id of tokens) {
        const token_uri = await contract.tokenURI(token_id);
        if (token_uri == '') {
            await axios.get(baseURL + '/images/generate-metadata')
                .then(async function (response) {
                    console.log('image generated');
                    const url_transaction = await contractWithSigner.setTokenURI(token_id, response.data);
                    let tx = await url_transaction.wait();
                    console.log(tx);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}

checkTokensAndFillUrls();