import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase  from '../API/client.ts';
import loginStyles from './Login.module.css';
import withLoading from '../Components/WithLoading.tsx';


interface formData {
    email: string;
    password: string;
}

const Login: React.FC = props => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<formData>({
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevFormData =>{
            return {
                ...prevFormData,
                [event.target.name]: event.target.value,
            }
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
        <div className={loginStyles.home}> 
        <div className={loginStyles.login}>
            <p>Login</p>
            <form>
                <div className={loginStyles.user}>
                    <input required="" name="email" type="text"
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <label>Email</label>
                </div>

                <div className={loginStyles.user}>
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
                Log In
                </a>
            </form>
            <p>Don't have an account? <Link to='/signup'><a href="" className={loginStyles.a2}>Sign Up!</a></Link></p>
        </div>
        </div>
    )
}
export default withLoading(Login);