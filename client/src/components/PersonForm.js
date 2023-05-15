import React, { useState } from 'react'
const PersonForm = (props) => {
    const { initialFirstName, initialLastName, onSubmitProp, errors } = props;
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp({ firstName, lastName });
    }
    return (
        <form onSubmit={onSubmitHandler}>
            {/* {errors.map((err, index) => <p key={index}>{err}</p>)} */}
            <p>
                <label>First Name</label><br/>
                <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                { errors.firstName ? 
                        <p>{errors.firstName.message}</p>
                        : null
                    }
            </p>
            <p>
                <label>Last Name</label><br/>
                <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                { errors.lastName ? 
                    <p>{errors.lastName.message}</p>
                    : null
                }
            </p>
            <input type="submit"/>
        </form>
        
    )
}
export default PersonForm;