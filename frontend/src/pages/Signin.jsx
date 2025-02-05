import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { XCircle } from "lucide-react"


const signinValidationSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .required("Username is required"),
    password: Yup.string()
        .required("Password is required")
})


export default function Signup() {

    function onSubmit(values, actions) {
        console.log(values);
    }


    const {
        handleSubmit,
        getFieldProps,
        values,
        errors,
        isValid,
        isSubmitting,
        touched
    } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: signinValidationSchema,
        onSubmit
    })


    return (
        <div className='bg-black/60 rounded-md shadow-lg mx-auto max-w-sm py-4 px-6'>
            <h1 className='text-xl font-semibold text-center mb-3'>Sign In</h1>
            <form className='flex flex-col gap-y-3' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className='block text-sm mb-1 text-gray-300'>Username</label>
                    <input
                        type="text"
                        name='username'
                        id="username"
                        className={classNames('input input-bordered w-full bg-transparent', {
                            "input-error": errors.username && touched.username
                        })}
                        placeholder='johndoe'
                        {...getFieldProps("username")}
                    />
                    {
                        touched.username && errors.username && <div className='mt-0.5 text-red-500 gap-x-1 text-xs flex items-center'>
                            <XCircle size={18} />
                            <p>{errors.username}</p>
                        </div>
                    }
                    <p></p>
                </div>
                <div className=''>
                    <label htmlFor="password" className='block text-sm mb-1 text-gray-300'>Password</label>
                    <input
                        type="password"
                        name='password'
                        id="password"
                        className={classNames('input input-bordered w-full bg-transparent', {
                            "input-error": errors.password && touched.password
                        })}
                        placeholder="••••••••"
                        {...getFieldProps("password")}
                    />
                    {
                        touched.password && errors.password && <div className='mt-0.5 text-red-500 gap-x-1 text-xs flex items-center'>
                            <XCircle size={18} />
                            <p>{errors.password}</p>
                        </div>
                    }
                </div>
                <div className='mt-2'>
                    <button type="submit" className='btn bg-red-600 btn-block text-white btn-error'>Sign In</button>
                </div>
                <div className='flex gap-x-2 text-sm' >
                    <p className='text-gray-300'>Don't have an account?</p>
                    <Link to="/signup" className='link link-hover font-medium text-red-500'>
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
    )
}
