import { useState } from 'react'
import {axios}from 'axios'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const[output,setOutput]=useState("")
  const handleChange=async()=>{
    const response=await axios.post('http://localhost:3000/api/request',{text:input}) 
// here the method post is present in backend server.js and frontend app.jsx but it means different direction in server.js: the server is listening to a post request but in the front we use axios and it handles sending http request
    console.log('requete envoyée vers le serveur');
    const opt=response.data

  }
  const handleOutput=async()=>{
    const opt=await axios
  }
  return (
    <>
      <div className='card'>
        <h3>Hey there! Welcome to Customer Help Center </h3>
        <input type="text" id="output" name="output" value={output} />
        <form >
          <input type="text" name="userInput" id="userInput" placeholder="type your question..." value={input} onChange={(e)=>setInput(e.target.value)} />
          <button onClick={handleChange}>Send</button>
        </form>
      </div>
        
    </>
  )
}

export default App
