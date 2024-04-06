import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice' // This is a way of changing the name for this file itslef. We will be using login as authLogin
import {Button, Input, Logo} from './index'
import { UseDispatch, useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // It's a pregiven variable by useForm so we have to follow this syntax
    const {register, handleSubmit} = useForm()
    // We are using this to make sure we can show error in the form
    const [error, setError] = useState("")

    const login = async(data) => {
        // Once the login has been clicked without having any issues in the email or password field. We will set the error to blank
        setError("")
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData));
                }
                // Difference between link and navigate is link has to be clicked in order to go some other page, whereas navigate can help us programmatically send the user somewhere else.
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100  rounded-xl p-10 border border-black/10`}
        >
            <div
            className='mb-2 flex justify-center'
            >
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don&apos;t have any account?$nbsp;
                <Link
                to='/signup'
                className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {/* If there's some error then it will be displayed here */}
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input 
                    label="Email: "
                    placeholder="Your email goes here..."
                    type="email"
                    // We have to spread this everytime as if we don't when we use register in some other time when we need this input component it will overwrite the previous value
                    {...register("email", {
                        required: true,
                        validate: {
                            // this match patern checks for any condition we give in regex form
                            matchPatern: (value) => {
                                /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.text(value) || "Email address must be a valid address"
                            }
                        }
                    })}
                    />
                    <Input
                    label="Password :"
                    placeholder="Your password goes here..."
                    type="password"
                    {...register('password'), {
                        required: true
                    }}
                    />
                    <Button children="Sign In" type='submit' classname='w-full'/>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
