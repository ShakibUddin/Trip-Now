
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';

const SignIn = () => {
    const {
        handleFirebaseEmailSignIn,
        signinError,
        user
    } = useAuth();
    const { updateLocationState } = useData();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //saving location state
    useEffect(() => {
        updateLocationState(location.state);
    }, [location.state, updateLocationState])

    useEffect(() => {
        if (user.email) {
            history.push(redirect_uri);
        }
    }, [history, redirect_uri, user]);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .matches(emailRegex, { message: "Invalid email address", excludeEmptyString: true })
            .max(30, 'Email must be maximum 30 characters'),
        password: Yup.string()
            .required('Password is required')
            .max(30, 'Password must be maximum 30 characters')

    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        if (data.password !== data.confirmPassword) errors.confirmPassword = true;
        handleFirebaseEmailSignIn(data.email, data.password);
    };


    return (
        <form className="lg:w-6/12 w-11/12 mx-auto p-5 m-5 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-4xl py-10 font-extrabold">SignIn</p>

            <input className="lg:w-2/4 w-3/4 p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Email" {...register("email")} />
            {errors.email && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.email?.message}</p>}

            <input className="lg:w-2/4 w-3/4 p-3 my-2 border-2 rounded-md" type="password" placeholder="Enter Password" {...register("password")} />
            {errors.password && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.password?.message}</p>}

            <input className="lg:w-2/4 w-3/4 mx-auto px-4 p-2 bg-blue-600 rounded-md text-white cursor-pointer" type="submit" name="LOGIN" />
            {signinError && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{signinError}</p>}

            <p className="p-5 text-center">Don't have an account? <Link className="text-blue-800" to='/signup'>Register</Link></p>

        </form>
    );
};

export default SignIn;