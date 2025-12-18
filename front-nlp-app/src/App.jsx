import { useState } from 'react'
import axios from 'axios'
import './App.css'
import monrobot from './assets/monrobot.png'
function App() {
  const [input, setInput] = useState("")
  const[output,setOutput]=useState("")
  const handleChange=async(e)=>{
    e.preventDefault();
    try{
      const response= await axios.post('http://localhost:3000/api/request',{text:input}) 
// here the method post is present in backend server.js and frontend app.jsx but it means different direction in server.js: the server is listening to a post request but in the front we use axios and it handles sending http request
      console.log('requete http envoyée vers le serveur node');
      setOutput(response.data)
    }catch(e){
      console.error(e);
    }

  }
  /*
  const handleOutput=async()=>{
    const opt=await axios
    <input type="text" id="output" name="output" value={output} />
  }*/
  return (
    <>
      <div>
        <h3 className='greeting'>Hey there! Welcome to Customer Help Center </h3>
        <div className='card'>
        <form className='form'>
          <input className="userinput" type="text" name="userInput" id="userInput" placeholder="type your question..." size='50' value={input} onChange={(e)=>setInput(e.target.value)} />
          <button type="button" onClick={handleChange}>Send</button>
        </form>
        {output && <p className='output' type='text' name='ouput' id='output'>utterance:{output.utterance} ,intent: {output.intent} ,confidence: {output.confidence} ,entities: {output.entities} ,timestamp:  {output.timestamp}</p> }
      </div>
      <img src={monrobot} alt="photo" className="robot"/>
    </div>
        
    </>
  )
}

export default App
