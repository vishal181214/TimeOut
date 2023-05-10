import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Welcome() {
    const [result,setResult] = useState();
    const [logIn, setLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
    const res = sessionStorage.getItem('userCred');
    setResult(JSON.parse(res))
    },[])

    const logout = () =>{
        sessionStorage.clear('userCred');
        navigate('/')
    }

    const checkInActivity = () =>{
        const expireTime = sessionStorage.getItem('expTime');
        if(expireTime <Date.now()){
            logout();
            console.log("LogOut");
            setLogin(false);
        }
    }

    const updateExpireTime = () =>{
        const expireTime = Date.now() + 10000;
        sessionStorage.setItem("expTime",expireTime)
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            checkInActivity();
        },5000);

        return () => clearInterval(interval);
    },[])

    useEffect(()=>{
        updateExpireTime();

        window.addEventListener('click',updateExpireTime);
        window.addEventListener('keypress',updateExpireTime);
        window.addEventListener('scroll',updateExpireTime);
        window.addEventListener('mouseover',updateExpireTime);

        // clean up 
        return () =>{
            window.removeEventListener("click",updateExpireTime);
            window.removeEventListener("keypress",updateExpireTime);
            window.removeEventListener("scroll",updateExpireTime);
            window.removeEventListener('mouseover',updateExpireTime);
        }
    },[])

    
    
    console.log(result);
  return (
    <div>
        <h1>Welcome User</h1>
        <button onClick={logout}>LogOut User</button>
    </div>
  )
}
