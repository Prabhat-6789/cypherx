import { useState,useEffect } from "react";
import './App.css';
import ShowData from "./showData";
function App() {
  const [data,setData] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const api = 'https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await fetch(api);
        const jsonData = await temp.json();
        setData(jsonData);
        //console.log("data => ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
  
    fetchData(); 
  }, [data]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 style={{textAlign:'center'}}>CYPHERX</h1>
      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <button onClick={toggleDarkMode} className="mode-toggle-button">
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      {data ? <ShowData data={data} /> : <div></div>}
    </div>
  );
}

export default App;
