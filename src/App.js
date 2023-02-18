import { useEffect, useState } from 'react';
import { db } from "./firebaseConfig"
import { collection, getDocs, addDoc, updateDoc, doc, onSnapshot } from "firebase/firestore"
import './App.css';
import Chat from './Chat';
import SignIn from './SignIn';
function App() {
  const [userLogged, setuserLogged] = useState('')
  const [messages, setmessages] = useState([])
  const [name, setname] = useState('')
  const [age, setage] = useState('')
  const [error, seterror] = useState(false)
  const usersCollectionRef = collection(db, "users")
  let userlogg = localStorage.getItem('userloggedin')
  useEffect(() => {
    userlogg ? setuserLogged(userlogg) : setuserLogged('')
  }, [userlogg])


  const getMon = (nmbr) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[nmbr]
  }


  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var day = date.getDate();
    var month = date.getMonth();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm + '   ' + day + ' - ' + getMon(month);
    return strTime;
  }
  const getUsers = async () => {
    seterror(true)
    await onSnapshot(usersCollectionRef, (data) => {
      setmessages(data.docs[0].data().messages);
      seterror(false)
    })
  };
  const handleReact = async (react, index) => {
    const id = "mujQD6M43t3Tuthy8dha"
    const userDoc = doc(db, "users", id)
    const newData = {
      messages: messages.map((item, i) => {
        if (i == index) {
          if (item.reaction === react) {
            delete item.reaction
          } else {
            item.reaction = react
          }
        }
        return item
      })
    }
    await updateDoc(userDoc, newData)
  }
  const addData = async () => {
    if (name) {
      const id = "mujQD6M43t3Tuthy8dha"
      const userDoc = doc(db, "users", id)
      const newData = { messages: [...messages, { message: name, sendBy: userLogged, time: formatAMPM(new Date) }] }
      await updateDoc(userDoc, newData)
      setname('')
      setage('')
    } else {
      alert('Enter a message first')
    }
    // getUsers();
  }
  useEffect(() => {
    getUsers();
  }, [])
  return (
    <div className="App">
      {userLogged ? <Chat handleReact={handleReact} error={error} setuserLogged={setuserLogged} userLogged={userLogged} addData={addData} setname={setname} name={name} messages={messages} /> :
        <SignIn setuserLogged={setuserLogged} />}
    </div>
  );
}
export default App;