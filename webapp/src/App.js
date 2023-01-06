import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AINFTs from './artifacts/contracts/Ainft.sol/AINFT.json';

const baseURL = "http://localhost:3000";

const NFT_ADDRESS = "0x2b9d6E6e68073E270e19666DF097e8C9beB6Fb07";

function App() {

  let [data, setData] = useState([]);
  let [image, setImage] = useState(null);

  useEffect(() => {

    //axios.post(baseURL+"/api/generate-images").then((response) => {
    //});
  }, [data]);

  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  const onSelect = (e) => {
    console.log(e);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const mint = async () => {
    //ethereum is usable, get reference to the contract
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //signer needed for transaction that changes state
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NFT_ADDRESS, AINFTs.abi, signer);

    //preform transaction
    const mint_transaction = await contract.mint({ value: ethers.utils.parseUnits("0.005", "ether") });
    let tx = await mint_transaction.wait();

    console.log("minted", tx);

    /*const burn_transaction = await contract.burn(3);
    let txb = await burn_transaction.wait();
    const burn_transaction2 = await contract.burn(4);
    let txb2 = await burn_transaction2.wait();*/

    /*
    //preform transaction (get all tokens)
    const get_all_tokens_transaction = await contract.getAllTokens();

    get_all_tokens_transaction.forEach(async element => {
      console.log(element.toNumber());
      //preform transaction (get token uri)
      const get_token_uri = await contract.tokenURI(element);
      console.log(get_token_uri);
    });

    //preform transaction (get owner of token)
    const get_token_owner_transaction = await contract.ownerOf(0);
    console.log(get_token_owner_transaction);
    */


    /*
    data.numberOfImages = 1;
    axios.post(baseURL + '/openai/generate-images', data)
      .then(function (response) {
        //mint here, image should have been stored
        //setImage(response.data[0]);

      })
      .catch(function (error) {
        console.log(error);
      });*/
  }

  return (
    <div className="App">
      AINFTs
      {image &&
        <img height={"300px"} width={"300px"} src={image}></img>
      }
      <br></br>Class
      <select name="class" onChange={(e) => onSelect(e)}>
        <option value="">select</option>
        <option value="ogre">Ogre</option>
        <option value="troll">Troll</option>
        <option value="angel">Angel</option>
        <option value="fallen angel">Fallen Angel</option>
        <option value="fenix">Fanix</option>
      </select>
      <br></br>Eyes
      <select name="eyes" onChange={(e) => onSelect(e)}>
        <option value="">select</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="black">Black</option>
        <option value="yellow">Yellow</option>
      </select>
      <br></br>Hair
      <select name="hair" onChange={(e) => onSelect(e)}>
        <option value="">select</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="black">Black</option>
        <option value="white">white</option>
      </select>
      <button onClick={() => mint()}>Mint</button>
    </div>
  );
}

export default App;
