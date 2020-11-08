import React, { useState, useContext, useEffect} from 'react';
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { logIn, isAuthenticated, error, clearErrors } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/')  //This is how we redirect in react
        }

        if(error === 'Invalid Credentials'){
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])


    const onChange = e =>{
        setUser({
          ...user, [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        if(email==="" || password ===""){
            setAlert('Please fill in all the fields', "danger")
        }else{
            logIn({email, password})
            // props.history.push("/")
        }
    }

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const {email, password} = user;

    return (
        <div>
            <h1> Account <span className="text-primary">Login</span></h1>
            <form onSubmit = {onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Enter Email</label>
                    <input type="email" name="email" value={email} required onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Create Password</label>
                    <input type="password" name="password" value={password} required onChange={onChange} minLength="6"/>
                </div>
                <input type="submit" value="LogIn" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}

export default Login;
