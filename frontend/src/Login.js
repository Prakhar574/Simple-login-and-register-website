import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({}); 

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values); 
        setErrors(validationErrors); 
        if (Object.keys(validationErrors).length === 0) {
          axios
            .post('http://localhost:8081/login', values)
            .then((res) => {
              if (res.status === 200) {
                navigate('/home');
              } else {
                alert("No record exists");
              }
            })
            .catch((err) => console.log(err));
        }
      };
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6 mx-auto'>
                    <div className='card mt-5 shadow'>
                        <div className='card-body'>
                            <h1 className='text-primary text-center mb-5'>
                                <strong>Login</strong>
                            </h1>
                            <form onSubmit={handleSubmit}> 
                                <div className='form-group mb-3'>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" placeholder='Enter Email' name='email' onChange={handleInput} className='form-control' />
                                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                                </div>
                                <div className='form-group mb-3'>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" placeholder='Enter Password' name='password' onChange={handleInput} className='form-control' />
                                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>
                                    <strong>Log in</strong>
                                </button>
                                <p className='text-center mt-3'>
                                    you are agree to our terms and policies
                                </p>
                                <Link to="/signup" className='btn btn-light w-100 mt-3'>
                                    Create Account
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;