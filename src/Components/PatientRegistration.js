import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export const PatientRegistration = () => {

const location=useLocation();
const data =location.state;
const [Name,SetName]=useState('');
const [AdmissionDate,SetAdmissionDate]=useState('')
const [Gender,SetGender]=useState('');    
const [Age,SetAge]=useState('');
const [Mobile,SetMobile]=useState('');
const [Email,SetEmail]=useState(''); 
const [PatientId,SetPatientId]=useState(0);  

useEffect(()=>{ 
    if(data!=null){
        SetName(data.Name);
        SetAdmissionDate(data.AdmissionDate);
        SetGender(data.Gender);  
        SetAge(data.Age);   
        SetMobile(data.Mobile);   
        SetEmail(data.Email);
        SetPatientId(data.id);  
    }  
},[data]);

const header={"Access-Control-Allow-Origin":"*"};
const history=useNavigate();

const handleSubmit =(e)=>{
    e.preventDefault();
   // console.log("Clicked");
   if(PatientId === 0)
   {
        axios.post(
            'https://646603d39c09d77a62fa83b7.mockapi.io/api/patients',
            {
                Name:Name,
                AdmissionDate:AdmissionDate,
                Gender:Gender,
                Age:Age,
                Mobile:Mobile,
                Email:Email
            },
            header
        ).then((res)=>{
            if(res.data){
                console.log(res.data);
                history('/');
            }
        })
   }
   else{
    axios.put(
        `https://646603d39c09d77a62fa83b7.mockapi.io/api/patients/${PatientId}`,
        {
            Name:Name,
            AdmissionDate:AdmissionDate,
            Gender:Gender,
            Age:Age,
            Mobile:Mobile,
            Email:Email
        },
        header
    ).then((res)=>{
        if(res.data){
            console.log(res.data);
            history('/');
        }
    })
   }    
}

  return ( 
    <> 
    <div className="container">
    <h3> {(PatientId === 0) ? <span>Patient Registration</span>  : <span>Update Patient</span>}</h3>
        <form className="row g-3">
            <div className="col-md-4">
                <label className="form-label"> Name</label>
                <input type="text" className="form-control" value={Name} onChange={(e)=>SetName(e.target.value)}  /> 
            </div>
            <div className="col-md-4">
                <label className="form-label">Admission Date</label>
                <input type="date" className="form-control"  value={AdmissionDate} onChange={(e)=>SetAdmissionDate(e.target.value)}  />
            </div> 
            <div className="col-md-3">
                <label  className="form-label">Gender</label>
                <select className="form-select" value={Gender} onChange={(e)=>SetGender(e.target.value)} >
                <option disabled value="">Choose...</option> 
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select> 
            </div>
            <div className="col-md-3">
                <label  className="form-label">Age</label>
                <input type="number" className="form-control" value={Age} onChange={(e)=>SetAge(e.target.value)} /> 
            </div> 
            <div className="col-md-3">
                <label  className="form-label">Mobile</label>
                <input type="number" className="form-control" value={Mobile} onChange={(e)=>SetMobile(e.target.value)} /> 
            </div>
            <div className="col-md-3">
                <label  className="form-label">Email</label>
                <input type="email" className="form-control" value={Email} onChange={(e)=>SetEmail(e.target.value)} /> 
            </div>
            <div className="col-12">
                {
                    (PatientId > 0) ?
                    <button className="btn btn-success mx-2" type="submit" onClick={handleSubmit}>Update</button>
                    : 
                    <button className="btn btn-primary mx-2" type="submit" onClick={handleSubmit}>Submit</button>
                }
                <Link to="/" className="btn btn-secondary mx-2">
                        Back
                </Link>
            </div>
        </form>
    </div>
    </>
  )
}
