import { useEffect, useState } from "react";
import axios from 'axios';
import Row from './Row'

function App() {
  const [reqBody, setReqBody] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    phonenumber: {
      code: "",
      num: "",
    },
    altPhonenumber: {
      code: "",
      num: "",
    }
  });
  const [tableData, setTableData] = useState([{}]);
  const getData = async() => {
    axios.get('http://localhost:8081/users').then((res) => {
      setTableData(res.data)
      console.log(res)
    });

  }


  useEffect(() => {
    getData()
  },[]);
  useEffect(() => {
    console.log("🚀 ~ file: App.js:36 ~ App ~ tableData", tableData)
  
  },[tableData]);



  const handleSubmit = () => {
    let flag = false;
    Object.keys(reqBody).map((item) => {
      if(reqBody[item] === "" || reqBody.phonenumber.code === "" || reqBody.phonenumber.num === "" || reqBody.altPhonenumber.code === "" || reqBody.altPhonenumber.num === ""){
        flag = true
      } 
    });
    if(!flag){
      console.log("Hiiiiiiiiiii")
      axios.post('http://localhost:8081/user',reqBody);
      getData()

    }else{
      alert("Please fill in all the feilds. ");
    }

  }

  return (
    <div className="App">
      <div>
        <div>
          <label>Firstname: </label>
          <input required type="text" name="firstname" value={reqBody.firstname} onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber }, firstname: e.target.value })
          }} />
        </div>
        <div>
          <label>LastName: </label>
          <input required  type="text" name="lastname" value={reqBody.lastname} onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber }, lastname: e.target.value })
          }} />
        </div>
        <div>
          <label>email: </label>
          <input required type="email" name="email" value={reqBody.email} onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber }, email: e.target.value })
          }} />
        </div>
        <div>
          <label>Gender: </label>
          <select required onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber }, gender: e.target.value })
          }}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label>Number: </label>
          <select required onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber, code: e.target.value }, altPhonenumber: { ...reqBody.altPhonenumber }})
          }}>
            <option value="" > code</option>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
          <input type="number" name="email" value={reqBody.phonenumber.num} onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber, num: e.target.value }, altPhonenumber: { ...reqBody.altPhonenumber }})
          }} />
        </div>
        <div>
          <label>Alternate Number: </label>
          <select required onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber, code: e.target.value } })
          }}>
            <option value="" > code</option>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
          <input required type="number" name="email" value={reqBody.altPhonenumber.num} onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber, num: e.target.value }})
          }} />
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div className="row-main-div">
        <div className="header-div">
          <p className="header">Firstname</p>
          <p className="header">Lastname</p>
          <p className="header">Gender</p>
          <p className="header">Phonenumber</p>
          <p className="header">Alternate #</p>
        
        </div>

        {tableData && tableData.map((item) => {
          if(item != null){
            return(<Row dat={item} setTableData={setTableData}/>)
          }
        })}
      </div>
    </div>
  );
}

export default App;
