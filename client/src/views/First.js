import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const First = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorsReg, setErrorsReg] = useState("");
    const [errors, setErrors] = useState("");

    const [success, setSuccess] = useState("");

    const navigate= useNavigate();



    const registerHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/register', {firstName, lastName, email, password, confirmPassword})
            .then(res => {
                console.log(res);
                console.log(res.data);
                setSuccess("Thank you for registering, you can now login");
                setErrorsReg("");
            })
            .catch(err=>{
                setErrorsReg(err.response.data.errors);
            })   
    }

    const loginHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/login', { email, password}, {withCredentials:true})
            .then(res => {
                console.log(res);
                console.log(res.data);
                setSuccess("Thank you for loging in");
                setErrors("");
                navigate("/people");
            })
            .catch(err=>{
                setErrors(err.response.data.message);
                console.log(err);
            })   
    }

    return (
        <div>
            <form onSubmit={registerHandler}>
                {/* {errorsReg.map((err, index) => <p key={index}>{err}</p>)} */}
                <p>{success}</p>
                <p>
                    <label>First Name</label><br/>
                    <input type="text" name="firstName"  onChange={(e) => setFirstName(e.target.value)}/>
                    { errorsReg.firstName ? 
                        <p>{errors.firstName.message}</p>
                        : null
                    }
                </p>
                <p>
                    <label>Last Name</label><br/>
                    <input type="text" name="lastName"  onChange={(e) => setLastName(e.target.value)}/>
                    { errorsReg.lastName ? 
                        <p>{errors.lastName.message}</p>
                        : null
                    }
                </p>
                <p>
                    <label>Email</label><br/>
                    <input type="text" name="email"  onChange={(e) => setEmail(e.target.value)}/>
                    { errorsReg.email ? 
                        <p>{errors.email.message}</p>
                        : null
                    }
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type='password' name="password"  onChange={(e) => setPassword(e.target.value)}/>
                    { errorsReg.password ? 
                        <p>{errors.password.message}</p>
                        : null
                    }
                </p>
                <p>
                    <label>Confirm Password</label><br/>
                    <input type='password' name="confirmPassword"  onChange={(e) => setConfirmPassword(e.target.value)}/>
                    { errorsReg.confirmPassword ? 
                        <p>{errors.confirmPassword.message}</p>
                        : null
                    }
                </p>
                <input type="submit"/>
            </form>

            <form onSubmit={loginHandler}>
                <p >{errors}</p>
                <p>{success}</p>
                    
                <p>
                    <label>Email</label><br/>
                    <input type="text" name="email"  onChange={(e) => setEmail(e.target.value)}/>
                </p>

                <p>
                    <label>Password</label><br/>
                    <input type='password' name="password" onChange={(e) => setPassword(e.target.value)}/>
                </p>
                <input type="submit"/>
            </form>
        </div>
    )
}
export default First;