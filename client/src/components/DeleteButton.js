import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const DeleteButton = (props) => {
    const { personId, successCallback } = props;
    const navigate= useNavigate();
    
    const deletePerson = e => {
        axios.delete('http://localhost:8000/api/people/' + personId, {withCredentials:true})
            .then(res=>{
                successCallback();
            })
            .catch(err=>{
                if (err.response.status===401){
                    navigate("/");
                }
            })
    }
    return (
        <button onClick={deletePerson}>
            Delete
        </button>
    )
}
export default DeleteButton;