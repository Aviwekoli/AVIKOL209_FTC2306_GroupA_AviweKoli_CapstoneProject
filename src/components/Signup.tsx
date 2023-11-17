import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import supabase  from '../API/client.ts';

const Signup = () => {

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    })

    console.log(formData)
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
            const {data, error } = await supabase.auth.signUp(
                {
                    email: formData.email,
                    password: formData.password,
                    options: {
                        full_name: formData.fullname,
                    }
                }
            )
            if(error) throw error;
            alert('Check your email inbox for verification link')

        } catch (error) {
            alert(error)
        }
    }

    return (
        <> 
        <div className="login-box">
            <p>Sign Up</p>
            <form>
                <div className="user-box">
                    <input required="" name="fullname" type="text"
                    onChange={handleChange}
                    />
                    <label>Full Name</label>
                </div>

                <div className="user-box">
                    <input required="" name="email" type="text"
                    onChange={handleChange}
                    />
                    <label>Email</label>
                </div>

                <div className="user-box">
                    <input required="" name="password" type="password"
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
                Submit
                </a>
            </form>
            <p>Already have an account? <Link to='/'><a href="" className="a2">Log in!</a></Link></p>
        </div>
        </>
    )
}
export default Signup;