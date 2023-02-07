import { useEffect, useState } from 'react';
import { db } from "./firebaseConfig"
import { collection, getDocs, addDoc, updateDoc, doc,onSnapshot } from "firebase/firestore"
import './App.css';
import Chat from './Chat';
import SignIn from './SignIn';


function App() {
  const [userLogged, setuserLogged] = useState('')
  const [messages, setmessages] = useState([])
  const [name, setname] = useState('')
  const [age, setage] = useState('')
  const usersCollectionRef = collection(db, "users")
  let userlogg = localStorage.getItem('userloggedin')


  useEffect(() => {
    userlogg ? setuserLogged(userlogg) : setuserLogged('')

  },[userlogg])

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const getUsers = async () => {
    // const data = await getDocs(usersCollectionRef)
    // setmessages(data.docs[0].data().messages);
    await onSnapshot(usersCollectionRef,(data)=>{
      setmessages(data.docs[0].data().messages);

    })
  };
  const addData = async () => {
    if(name){

      const id = "mujQD6M43t3Tuthy8dha"
      const userDoc = doc(db, "users", id)
      const newData = { messages: [...messages, { message: name, sendBy: userLogged ,time:formatAMPM(new Date)}] }
      await updateDoc(userDoc, newData)
      setname('')
      setage('')
    }else{
      alert('Enter a message first')
    }
    // getUsers();
  }



  useEffect(() => {
    getUsers();
  }, [])


  return (
    <div className="App">
      {userLogged ? <Chat setuserLogged={setuserLogged} userLogged={userLogged} addData={addData} setname={setname} name={name} messages={messages} /> :
        <SignIn setuserLogged={setuserLogged} />}
    </div>
  );
}

export default App;
