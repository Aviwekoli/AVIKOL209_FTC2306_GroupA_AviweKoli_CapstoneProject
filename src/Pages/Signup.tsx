import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import loginStyles from './Login.module.css';
import supabase  from '../API/client.ts';
import withLoading from '../Components/WithLoading.tsx';

interface formData {
    fullname: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {

    const [formData, setFormData] = useState<formData>({
        fullname: '',
        email: '',
        password: '',
    })

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
            if (data) {
                // Insert user data into the 'users' table
                const { data: userData, error: userError } = await supabase
                  .from('users')
                  .upsert([
                    {
                      full_name: formData.fullname,
                      email: formData.email,
                    },
                  ]);
          
                if (userError) throw userError;
          
                // Access the user data if needed
                console.log('User data:', userData);
              }
            alert('Check your email inbox for verification link')

        } catch (error) {
            alert(error)
        }
    }
    
    return (
        <> 
        <div className={loginStyles.login}>
            <p>Sign Up</p>
            <form>
                <div className={loginStyles.user}>
                    <input required="" name="fullname" type="text"
                    onChange={handleChange}
                    />
                    <label>Full Name</label>
                </div>

                <div className={loginStyles.user}>
                    <input required="" name="email" type="text"
                    onChange={handleChange}
                    />
                    <label>Email</label>
                </div>

                <div className={loginStyles.user}>
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
                Sign Up
                </a>
            </form>
            <p>Already have an account? <Link to='/'><a href="" className={loginStyles.a2}>Log in!</a></Link></p>
        </div>
        </>
    )
}
export default withLoading(Signup);