import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validate from './RegisterValidation';
import axios from 'axios';

function Register() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post('http://localhost:8081/signup', values)
        .then((res) => {
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card mt-5 shadow">
            <div className="card-body">
              <h1 className="text-primary text-center mb-5">
                <strong>Register</strong>
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    onChange={handleInput}
                    id="name"
                    className="form-control rounded-0"
                    autoComplete="name"
                  />
                  {errors.name && <span className="text-danger"> {errors.name}</span>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleInput}
                    id="email"
                    className="form-control rounded-0"
                    autoComplete="email"
                  />
                  {errors.email && <span className="text-danger"> {errors.email}</span>}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={handleInput}
                    id="password"
                    className="form-control rounded-0"
                    autoComplete="current-password"
                  />
                  {errors.password && <span className="text-danger"> {errors.password}</span>}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  <strong>Register</strong>
                </button>
                <Link to="/" className='btn btn-light w-100 mt-3'>Back</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;