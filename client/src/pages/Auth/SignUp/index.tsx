import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import signup from "../../../api/signup";
import "./Signup.scss";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [year, setYear] = useState<number>(1996);
    const [month, setMonth] = useState<number>(5);
    const [date, setDate] = useState<number>(29);
    const [birthday, setBirthday] = useState<string>("19960529");

    const onChange = (event : React.ChangeEvent) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        
        switch(target.name){
            case "name":
                setName(target.value);
                break;
            case "id":
                setId(target.value);
                break;
            case "password":
                setPassword(target.value);
                break;
            case "rePassword":
                setRePassword(target.value);
                break;
            case "email":
                setEmail(target.value);
                break;
            case "year":
                setYear(Number(target.value));
                break;
            case "month":
                setMonth(Number(target.value));
                break;
            case "date":
                setDate(Number(target.value));
                break;
            default:
                return;
        }
    }
    const onSubmit = async( event : React.FormEvent ) => {
        event.preventDefault();
        if (password !== rePassword){
            setPasswordMismatch(true);
            setTimeout(() => {
                setPasswordMismatch(false);
            }, 5000)
            return;
        }   else {
            const res = await signup({name, id, password, email, birthday})
            console.log(res);
        }
        
    }

    useEffect(() => {
        setBirthday(String(year) + String(month).padStart(2, '0') + String(date).padStart(2, "0"));
    }, [year, month, date])

    useEffect(() => {
        console.log(birthday);
    }, [birthday])
    return (
        <div className="sign-up-wrapper">
            <form className="sign-up-modal" onSubmit={onSubmit}>                
                <span className="sign-up-span">Sign up</span>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="" name="name" onChange={onChange} required={true}/>
                <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="" name="id" onChange={onChange} required={true}/>
                <label htmlFor="floatingInput">ID</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="" name="password" onChange={onChange} minLength={4} required={true}/>
                <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="" name="rePassword" onChange={onChange} minLength={4} required={true}/>
                    <label className={passwordMismatch ? "warning" : ""} htmlFor="floatingPassword">Re-Password</label>
                    {passwordMismatch && <span className="warning"> Password and Re-password is different.</span>}
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="" name="email" onChange={onChange} required={true}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="birthday-div">
                    <div className="birthday form-floating mb-3">
                        <input type="number" className="form-control" id="year" placeholder="" defaultValue={1996} name="year" onChange={onChange} required={true} min={1900} max={new Date().getFullYear()}/>
                        <label htmlFor="year">Year</label>
                    </div>
                    <div className="birthday form-floating mb-3">
                        <input type="number" className="form-control" id="month" placeholder="" name="month" defaultValue={5} onChange={onChange} required={true} min={1} max={12}/>
                        <label htmlFor="month">Month</label>
                    </div>
                    <div className="birthday form-floating mb-3">
                        <input type="number" className="form-control" id="date" placeholder="" name="date" onChange={onChange} defaultValue={29} required={true} min={1} max={31}/>
                        <label htmlFor="date">Date</label>
                    </div>
                </div>
                
                <button type="submit" id="submit-btn" className="btn btn-primary">Submit</button>
                <span id="signin-route" onClick={() => navigate('/signin')}>Already have an account?</span>
            </form>
        </div>
    )
}
export default SignUp;