import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import signin from "../../../api/signin";

import "./Signin.scss";
const SignIn = () => {
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const onChange = (event : React.ChangeEvent ) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;

        if ( target.name === "id" ){
            setId(target.value);
        }   else if (target.name === "password"){
            setPassword(target.value);
        }
    }
    
    const onSubmit = async(event : React.FormEvent ) => {
        event.preventDefault();
        const res = await signin(id, password);
        console.log(res);
    }

    return (
        <div className="sign-in-wrapper">
            <form className="sign-in-modal" onSubmit={onSubmit}>                
                <span className="sign-in-span">Sign in</span>
                <div className="form-floating mb-3">
                    <input type="text" name="id" className="form-control" id="floatingInput" placeholder="" onChange={onChange} required={true}/>
                <label htmlFor="floatingInput">ID</label>
                </div>
                <div className="form-floating mb-3">
                    <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="" onChange={onChange} required={true}/>
                <label htmlFor="floatingPassword">Password</label>
                </div>
                
                <button type="submit" id="submit-btn" className="btn btn-primary">Submit</button>
                <span id="signin-route" onClick={() => navigate('/signup')}>Don't have account yet?</span>
            </form>
        </div>
    )
}
export default SignIn;