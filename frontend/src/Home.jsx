import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Home() {
    const [email,setUname] = useState('');
    const [password,setPass] = useState('');
    const navigate = useNavigate();
    const submitInfo = async() =>{
        console.log("Inside the function");
        try {
            const result = await axios.post('http://localhost:5320/login',{
                email,
                password
            })
            if(result){
                console.log("user login success!");
                sessionStorage.setItem("userCred",JSON.stringify(result));
                navigate('/welcome');
            } 
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
      <input type="text" value={email} onChange={(e)=>setUname(e.target.value)} />
      <input type="text" value={password} onChange={(e)=>setPass(e.target.value)} />
      <button onClick={submitInfo}>Click to Login</button>
    </div>
  )
}

export default Home
