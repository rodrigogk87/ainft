import logo from './logo.svg';
import './App.css';

function App() {

  const mint = () => {
    console.log("minted");
  }

  return (
    <div className="App">
      AINFTs
      <button onClick={() => mint()}>Mint</button>
    </div>
  );
}

export default App;
