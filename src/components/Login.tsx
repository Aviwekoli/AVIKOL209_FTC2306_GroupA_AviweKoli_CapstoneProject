import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase  from '../API/client.ts';

const Login = props=> {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData(prevFormData =>{
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data, error } = await supabase.auth.signInWithPassword(
                {
                    email: formData.email,
                    password: formData.password,
                }
            )
            if(error) throw error;
            // console.log(data)
            props.setToken(data);
            navigate('/home');

        } catch (error) {
            console.error(error)
            alert(error)

        }
    }

    return (
        <> 
        <div className="login-box">
            <p>Login</p>
            <form>
                <div className="user-box">
                    <input required="" name="email" type="text"
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <label>Email</label>
                </div>

                <div className="user-box">
                    <input required="" name="password" type="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                    <label>Password</label>
                </div>

                <a href="" type="submit"
                onClick={handleSubmit}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                LogIn
                </a>
            </form>
            <p>Don't have an account? <Link to='/signup'><a href="" className="a2">Sign Up!</a></Link></p>
        </div>
        </>
    )
}
export default Login;