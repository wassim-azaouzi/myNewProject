import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const [errors, setErrors] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8000/api/people')
            .then(res => {
                setPeople(res.data)
            })
            .catch((err)=>console.log(err))
    }, [])
    
    const createPerson = personParam => {
        axios.post('http://localhost:8000/api/people', personParam, {withCredentials:true})
            .then(res => {
                console.log(res);
                console.log(res.data)
                setPeople([...people, res.data])
            })
            .catch(err=>{
                console.log(err);
                err.response.status===401?
                    navigate("/"):
                    setErrors(err.response.data.errors);
                }
            )   
        }
    return (
        <div>
            <PersonForm onSubmitProp={createPerson} initialFirstName="" initialLastName="" errors={errors}/>
            <hr />
            <PersonList people={people} setPeople={setPeople}/>
        </div>
    )
}
export default Main;