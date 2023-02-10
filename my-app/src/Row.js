import React, { useState } from 'react'
import axios from 'axios';

const Row = (props) => {
    const [editFlag, setEditFlag] = useState(false);
    const [reqBody, setReqBody] = useState({ ...props?.dat });
    const handleSubmit = async() => {
        await axios.put('http://localhost:8081/user',reqBody);
        await axios.get('http://localhost:8081/users').then((res) => {
            props.setTableData(res.data)
            console.log(res)
          });
          setEditFlag(false)
        console.log(reqBody)
    }
    return (
        <div >
            {!editFlag && (<div className='row-div'>
                <p>{props?.dat?.firstname}</p>
                <p>{props?.dat?.lastname}</p>
                <p>{props?.dat?.gender}</p>
                <p>{props?.dat?.phonenumber?.code}{props?.dat?.phonenumber?.num}</p>
                <p>{props?.dat?.altPhonenumber?.code}{props?.dat?.altPhonenumber?.num}</p>
                <div>
                    <button onClick={() => { setEditFlag(true) }}>Edit</button>
                </div>
            </div>)}
            {editFlag && (<div className='row-div'>
                <input value={reqBody?.firstname} onChange={(e) => {
                    setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber }, firstname: e.target.value })
                }}></input>

                <input value={reqBody?.lastname} onChange={(e) => {
                    setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber }, lastname: e.target.value })
                }}></input>

                <input required type="email" name="email" value={reqBody.email} onChange={(e) => {
                    setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber }, email: e.target.value })
                }} />

                <div className='phone-div'>
                    <select required onChange={(e) => {
                        setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber, code: e.target.value }, altPhonenumber: { ...reqBody.altPhonenumber } })
                    }}>
                        <option value="" > code</option>
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                    </select>
                    <input type="number" name="email" value={reqBody.phonenumber.num} onChange={(e) => {
            setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber, num: e.target.value }, altPhonenumber: { ...reqBody.altPhonenumber }})
          }} />
                </div>

                <div className='phone-div'>
                    <select required onChange={(e) => {
                        setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber, code: e.target.value } })
                    }}>
                        <option value="" > code</option>
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                    </select>
                    <input required type="number" name="email" value={reqBody.altPhonenumber.num} onChange={(e) => {
                        setReqBody({ ...reqBody, phonenumber: { ...reqBody.phonenumber }, altPhonenumber: { ...reqBody.altPhonenumber, num: e.target.value } })
                    }} />
                </div>

                <div>
                    <button  onClick={() => { handleSubmit()}}>SAVE</button>
                </div>
            </div>)}



        </div>
    )
}

export default Row