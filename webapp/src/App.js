import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react';

const baseURL = "http://localhost:3000";

function App() {

  let [data, setData] = useState([]);
  let [image, setImage] = useState(null);

  useEffect(() => {

    //axios.post(baseURL+"/api/generate-images").then((response) => {
    //});
  }, [data]);

  const onSelect = (e) => {
    console.log(e);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const mint = () => {
    if (data?.class && data?.eyes && data?.hair) {
      data.numberOfImages = 1;

      console.log("minted");

      axios.post(baseURL + '/openai/generate-images', data)
        .then(function (response) {
          setImage(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
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
