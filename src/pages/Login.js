import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../redux/authSlice";
import validator from 'validator';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate('/');

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const [authError, setAuthError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        if(!user.email || !user.password) {
            setAuthError('Please fill in all the fields!');
        } else if(!validator.isEmail(user.email)) {
            setAuthError('Invalid email!');
        } else {
            try {
                dispatch(logIn(user));
                localStorage.setItem('user', JSON.stringify({email: user.email}));
                navigate('/');
            } catch(err) {
                alert(err.message);
            }
        }
    }

    return (
        <div className="login">
            <form onSubmit={(e) => handleSubmit(e)} className="login__form">
                <h1 className="login__title">Login</h1>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" placeholder="email@example.com" value={user.email} onChange={(e) => handleChange(e)} className="login__input" />
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" placeholder="password" value={user.password} onChange={(e) => handleChange(e)} className="login__input" />
                <button className="btn btn--login">Login</button>
                {authError && <span className="login__error">{authError}</span> }
            </form>
        </div>
    )
}

export default Login;