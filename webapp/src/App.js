import './App.css';
import { ethers } from 'ethers';
import AINFTs from './artifacts/contracts/Ainft.sol/AINFT.json';

const NFT_ADDRESS = "0x2b9d6E6e68073E270e19666DF097e8C9beB6Fb07";

function App() {

  const requestAccount = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
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


  }

  return (
    <div className="App">
      AINFTs
      <button onClick={() => mint()}>Mint</button>
    </div>
  );
}

export default App;
