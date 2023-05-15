import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import DeleteButton from './DeleteButton';

const PersonList = (props) => {
    const {people, setPeople}=props;

    const removeFromDom = personId => {
        setPeople(people.filter(person => person._id !== personId))
    }

    return (
        <div>
            {people.map((person, idx) => {
                return (
                    <p key={idx}>
                        <Link to={"/people/" + person._id}>
                            {person.lastName}, {person.firstName}
                        </Link>
                        |
                        <Link to={"/people/edit/"+person._id}>
                            Edit
                        </Link> 
                        |
                        <DeleteButton personId={person._id} successCallback={()=>removeFromDom(person._id)}/>
                    </p>
                )
            })}
        </div>
    )
}
export default PersonList;