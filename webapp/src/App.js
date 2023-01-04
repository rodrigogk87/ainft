import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import AINFTs from './artifacts/contracts/Ainft.sol/AINFT.json';

const baseURL = "http://localhost:3000";

const NFT_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

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
    if (data?.class && data?.eyes && data?.hair) {
      //ethereum is usable, get reference to the contract
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      //signer needed for transaction that changes state
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFT_ADDRESS, AINFTs.abi, signer);

      //preform transaction
      const transaction = await contract.mint({ value: ethers.utils.parseUnits("0.005", "ether") });
      let tx = await transaction.wait();

      console.log("minted", tx);

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
