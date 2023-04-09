import React from 'react'
import { useState,useContext } from 'react';
import { Box ,TextField,Button,Typography,styled} from '@mui/material';
import IMAGE from './IMAGE.png'
import './login.css'
import {API} from '../../service/api'
import { DataContext } from '../../context/DataProvider';
import{useNavigate} from 'react-router-dom';

const Lbutton=styled(Button)`
    width:210px;
    background:#C58940;
    border-radius:0px;
`
const Sbutton=styled(Button)`
    width:210px;
    background:#C58940;
    border-radius:0px;
`
const Cbutton=styled(Button)`
    color:#C58940;
`
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`




function Login({isUserAuthenticated}) {
    const signup={
        name:'',
        username:'',
        password:''
    }

    const loginval={

    }
    const[account,setaccount]=useState('login')
    const[sign, setsign]=useState(signup)
    const[error,seterror] = useState('')
    const [login,setLogin]=useState(loginval)
    const {setAccout}=useContext(DataContext)
    const navigate=useNavigate();


    const toggleSignup=()=>{
        account==='signup'?setaccount('login'):setaccount('signup');
    }
    const sChange=(e)=>{
        setsign({...sign,[e.target.name]:e.target.value})
    }
    const newsignup=async()=>{
        try{
            let response = await API.signup(sign)
            if(response.isSuccess){
                console.log("NOPROB")
                seterror('')
                setsign(signup)
                toggleSignup('login')
            }else{
                console.log("Problem")
                seterror("Something went wrong")
            }
        }catch(err){
            console.log("Problem")
            seterror("Something went wrong")
        }
    }
    const changeval=(e)=>{       
        setLogin({...login,[e.target.name]:e.target.value})
    }
    const loginUser=async()=>{
        try{
            console.log(login)
            let response=await API.login(login)
            if(response.isSuccess){
                console.log("NOPROB")
                seterror('')
                sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
                sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
                setaccount({username:response.data.username, name:response.data.name})
                isUserAuthenticated(true);
                navigate('/');
            }else{
                console.log("Problem")
                seterror("Something  wrong")
            }
        }catch(err){
            seterror("Something went wrong")
        }
    }

    return (
      <div className="Login">
      <Box><img src={IMAGE} alt='login'></img></Box>
     { account==='login'?
        <Box className="Box1">
        <Box className='inner'><TextField variant='standard' value={login.username} onChange={(e)=>changeval(e)} name="username" label="Username"/></Box>
        <Box className='inner'><TextField variant='standard' value={login.password} onChange={(e)=>changeval(e)} name="password" label="Password"/></Box>
        {error && <Error>{error}</Error>}
        <Box className='inner Button'>
            <Lbutton variant='contained'onClick={loginUser}>Login</Lbutton>
        </Box>
      <Box className='inner'><Cbutton onClick={()=>toggleSignup()}>Create an Account</Cbutton></Box>
      </Box>
      :
      <Box className="Box1">
      <Box className='inner'><TextField name='name' onChange={(e)=>sChange(e)} variant='standard'label="name"/></Box>
      <Box className='inner'><TextField name='username' onChange={(e)=>sChange(e)} variant='standard'label="Username"/></Box>
      <Box className='inner'><TextField name='password' onChange={(e)=>sChange(e)} variant='standard'label="Password"/></Box>
      {error && <Error>{error}</Error>}
      <Box className='inner Button'>
        <Sbutton onClick={()=>newsignup()} variant='contained'>Signup</Sbutton>
      </Box>
      <Box className='inner'><Cbutton onClick={()=>toggleSignup()}>Already have an acoount</Cbutton></Box>
      </Box>
    }
      </div>
    
  )
}

export default Login;
