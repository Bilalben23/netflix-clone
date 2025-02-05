import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { XCircle } from "lucide-react"

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

const signupValidationSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters"),
    email: Yup.string()
        .email("Email must be valid")
        .required("Email is required"),
    password: Yup.string()
        .matches(strongPasswordRegex, "Password must include uppercase, lowercase, a number, and a special character")
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
            email: "",
            password: ""
        },
        validationSchema: signupValidationSchema,
        onSubmit
    })


    return (
        <section className='hero-bg p-3'>
            <header className='p-2 grid grid-cols-3'>
                <div className='flex items-center justify-end'>
                    <Link to="/" className="cursor-pointer hover:opacity-80 transition">
                        <img
                            src='../assets/netflix-logo.png'
                            alt='netflix-logo'
                            className='w-40 p-1'
                        />
                    </Link>
                </div>
            </header>

            <div className='bg-black/60 rounded-md shadow-lg mx-auto max-w-sm py-4 px-6'>
                <h1 className='text-xl font-semibold text-center mb-3'>Sign Up</h1>
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
                        <label htmlFor="email" className='block text-sm mb-1 text-gray-300'>Email</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            className={classNames('input input-bordered w-full bg-transparent', {
                                "input-error": errors.email && touched.email
                            })}
                            placeholder='you@example.com'
                            {...getFieldProps("email")}

                        />
                        {
                            touched.email && errors.email && <div className='mt-0.5 text-red-500 gap-x-1 text-xs flex items-center'>
                                <XCircle size={18} />
                                <p>{errors.email}</p>
                            </div>
                        }
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
                        <button type="submit" className='btn bg-red-600 btn-block text-white btn-error'>Sign Up</button>
                    </div>
                    <div className='flex gap-x-2 text-sm' >
                        <p className='text-gray-300'>Already have an account?</p>
                        <Link to="/signin" className='link link-hover font-medium text-red-500'>
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>


        </section>
    )
}
