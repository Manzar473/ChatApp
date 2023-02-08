import React, { useEffect, useRef, useState } from 'react'
import nobitaprofile from './nobita.jpg'
import doraemon from './doraemon.png'
import Message from './message'
function Chat(props) {
  const dummy = useRef()
  const [id, setid] = useState(null)
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }, [props.messages])
  const handleLogout = () => {
    localStorage.setItem('userloggedin', '')
    props.setuserLogged('')
  }
  return (
    // <div className='chat-container'>
    //   <button onClick={handleLogout} className='loggedOut'>Log Out</button>
    //  <h1>Chat App</h1>
    //  <div className='messages-container'>
    //  { props.messages?.map((el,index)=>{
    //   return (
    //   el.sendBy===props.userLogged?
    // <div key={index} className='message-sent'>
    //    <span>{el.message}</span>
    //   </div>:<div key={index} className='message-receieve'>
    //    <span>{el.message}</span>
    //   </div>
    //   )
    //  })
    //   }
    // <div ref={dummy}></div>
    // {!props.messages.length&&<div className='NoChat'>Start a Chat!</div>}
    //  </div>
    //  <div className='send-container'>
    //  <input value={props.name} onChange={e=>props.setname(e.target.value)} type='text' placeholder='Type your message...'/>
    //  <button className='send' onClick={props.addData}>send</button>
    //  </div>
    // </div>
    <div className="chat-container">
      <div className="header">
        <div className='userInfo'>
          <img src={props.userLogged === 'admin' ? doraemon : nobitaprofile} />
          <h2>{props.userLogged === 'admin' ? 'Doraemon' : 'Nobita'}</h2>
        </div>
        <button onClick={handleLogout} className='loggedOut'>Log Out</button>
      </div>
      <div className="chat-content">
        {props.messages?.map((el, index) => {
          return (
            el.sendBy === props.userLogged ?
              <Message handleReact={props.handleReact} index={index} id={id} setid={setid} type='sent' data={el} /> :
              <Message handleReact={props.handleReact} index={index} id={id} setid={setid} type='receieve' data={el} />
          )
        })
        }
        <div ref={dummy}></div>
        {(!props.messages.length && props.error) && <div className='NoChat'>Connecting....</div>}
        {(!props.messages.length && !props.error) && <div className='NoChat'>Start a Chat!</div>}
      </div>
      <div className="send-container">
        <input value={props.name} onChange={e => props.setname(e.target.value)} type="text" placeholder="type a message.." />
        <button onClick={props.addData}>Send</button>
      </div>
    </div>
  )
}
export default Chat