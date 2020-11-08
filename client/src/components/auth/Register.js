import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from "../../context/auth/AuthContext"

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);


    const {setAlert} = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/')  //This is how we redirect in react
        }

        if(error === 'Email already exists'){
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const onChange = e =>{
        setUser({
          ...user, [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault()
        if(name === "" || password ==="" || email ===""){
            setAlert('Please enter all fields', "danger")
        }else if(password !== password2){
            setAlert('Passwords do not match', "danger")
        }else{
            register({
                name,
                email, 
                password
            })
        }
    }

    const {name, email, password, password2} = user;

    return (
        <div>
            <h1> Account <span className="text-primary">Register</span></h1>
            <form onSubmit = {onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Enter Name</label>
                    <input type="text" name="name" value={name} required onChange={onChange} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Enter Email</label>
                    <input type="email" name="email" value={email} required onChange={onChange} autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Create Password</label>
                    <input type="password" name="password" value={password} required onChange={onChange} minLength="6" autoComplete="off" />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} required onChange={onChange} minLength="6" autoComplete="off" />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
        
    )
}

export default Register;
