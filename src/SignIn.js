import React, { useState } from 'react'

function SignIn(props) {
  const [username,setUsername]=useState('')
  const [password,setpassword]=useState('')
  const registeredUsers=[{username:'admin',password:'admin123'},{username:'doraemon',password:'dora123'}]

  const signIn = () =>{
    let loggedin=false
    registeredUsers.forEach(el=>{
      if(el.username===username && el.password===password){
        props.setuserLogged(el.username)
        localStorage.setItem('userloggedin',el.username)
        loggedin=true
      }
     
    })
    if(!loggedin){
      alert("Invalid Credentials")
    }
  }

  return (
    // <div className='signin-container'>
    //     <div >
    //     <h3>Username:</h3>
    //     <input type='text' onChange={e=>setUsername(e.target.value)}></input>
    //     </div>
    //     <div>
    //     <h3>Password:</h3>
    //     <input type='password'onChange={e=>setpassword(e.target.value)}></input>
    //     </div>
    //    <button onClick={signIn}>Sign In</button>
    // </div>
    <div className="signIn-container">
      <div className="logo-container">
        <h1 className="logo">Chat <span className="logo-span">App</span></h1>
      </div>
      <h2 className="signInText">Sign In</h2>
      <hr />
      <p className="labels">Username:</p>
      <input type="text" placeholder="Enter your username..." onChange={e=>setUsername(e.target.value)}/>
      <p className="labels">Password:</p>
      <input type="password" placeholder="Enter your password..." onChange={e=>setpassword(e.target.value)}/>
      <button className="signIn" onClick={signIn}>Sign In</button>
    </div>
  )
}

export default SignIn