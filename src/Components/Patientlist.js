import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Modal,Button } from 'react-bootstrap';

export const Patientlist = () => {
    const [Patientdata,SetPatients]=useState([]);
//modal activity
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [PatientId, setPatientId] = useState(0);

    function DeleteRecord (Id) {
        console.log(Id);
        setPatientId(Id);
        handleShow();
    }
    const DeleteConfirm = ()=>{
        axios.delete(`https://646603d39c09d77a62fa83b7.mockapi.io/api/patients/${PatientId}`).then((res)=>{
            handleClose();
            getPatients();
        })
    }

    // const history=useNavigate();
    function getPatients(){      
      //  console.log("Fetching");
        axios.get("https://646603d39c09d77a62fa83b7.mockapi.io/api/patients").then((res)=>{
            console.log(res.data);
            SetPatients(res.data);
        })
    }
    useEffect(()=>{
        getPatients();        
    },[]);

    //render Start
  return (
    <>
        <div className='container'>
            <div className='d-flex justify-content-between m-2'>
                <h3>Patient Listing</h3>
                <Link to='/Registration'>
                    <button className='btn btn-primary'>Create</button>
                </Link> 
            </div>
            <div className='scroll-container'>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Admission Date</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Age</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th> 
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                {Patientdata.map((pat)=>{  
                    return(
                        <>
                <tbody> 
                        <tr>
                        <th scope="row">{pat.id}</th>
                        <td>{pat.Name}</td>
                        <td>{pat.AdmissionDate}</td>
                        <td>{pat.Gender}</td>
                        <td>{pat.Age}</td>
                        <td>{pat.Mobile}</td>
                        <td>{pat.Email}</td> 
                        <td>
                            <Link className='btn btn-success mx-2' to='/Update' state={pat}>
                                Edit
                            </Link>
                            <button className='btn btn-danger mx-2' onClick={() => DeleteRecord(pat.id)}>Delete</button> 
                        </td>
                    </tr> 
                </tbody>
                </>)
                })} 
                </table>
            </div>
        </div> 

        <Modal show={show} onHide={handleClose}>
            {/* <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                <div className='mx-4 text-center'>Are you sure want to delete this record.</div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={DeleteConfirm}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
