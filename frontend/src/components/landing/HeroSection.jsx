// components/HeroSection.jsx
import React from 'react'
import { ChevronRight } from "lucide-react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';


const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email must be valid")
        .required("Email is required")
})


export default function HeroSection() {
    const navigate = useNavigate();

    const onSubmit = (values, actions) => {
        console.log(values);
        navigate(`/signup?email=${encodeURIComponent(values.email)}`)
    }

    const {
        handleSubmit,
        getFieldProps
    } = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: emailValidationSchema,
        onSubmit
    })

    return (
        <div className='flex px-5 flex-col justify-center py-10 text-white max-w-6xl mx-auto items-center'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center'>Unlimited movies, TV shows, and more </h1>
            <p className='text-lg mb-4 text-center'>Watch anywhere. Cancel anytime.</p>
            <p className='mb-4 text-sm text-center'>Ready to watch? Enter your email to create or restart your membership.
            </p>
            <form className='flex flex-col md:flex-row items-center gap-2 w-full md:min-w-md md:w-auto' onSubmit={handleSubmit}>
                <div className='w-full'>
                    <input
                        type="email"
                        name="email"
                        className='input shadow input-bordered bg-black/25 w-full'
                        placeholder='Email address'
                        {...getFieldProps("email")}
                    />
                </div>
                <button type="submit" className='btn btn-block md:w-fit text-white btn-error bg-red-600 font-semibold'>
                    <span>Get Started</span>
                    <ChevronRight />
                </button>
            </form>
        </div>
    )
}
