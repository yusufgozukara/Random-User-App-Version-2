import React, { useState, useEffect} from "react";
import mailSvg from "./assets/mail.svg";
// import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
// import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";
// const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {

  const [loading,setLoading] = useState(true);
  const [user, setUser] = useState([])
  const [hover,setHover] =useState([])
  
  const getData = async () => {

    try {
      const {data} = await axios.get(url);
    setUser(data.results);
    setLoading(false);
    setHover(['name', data.results[0].name.title+ ' ' +data.results[0].name.first+ ' ' + data.results[0].name.last])
    console.log(user);


  } catch (error) {
      console.log(error); 
    }
  };

  useEffect(() => {
    getData() 
  }, [])

  if(loading){
    return <h1>Loading...</h1>
  }
  
  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={user[0].picture.large} alt="random user" className="user-img"  />
          <p className="user-title">My {hover[0]} is</p>
          <p className="user-value">{hover[1]}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={() => setHover(['name',user[0].name.title+ ' ' + user[0].name.first + ' ' + user[0].name.last])} >
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email" onMouseOver={()=>setHover(['email', user[0].email])}>
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age" onMouseOver={()=>setHover(['age', user[0].dob.age])}>
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street" onMouseOver={()=>setHover(['street', user[0].location.street.name])}>
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone" onMouseOver={()=>setHover(['phone number', user[0].cell])}>
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password" onMouseOver={()=>setHover(['password', user[0].login.password])}>
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={() => getData()}>
              new user
            </button>
            <button className="btn" type="button">
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              <tr className="body-tr"></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
