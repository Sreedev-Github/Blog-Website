import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Logo, Input} from './index'
import { useDispatch } from 'react-redux'
import {useForm} from 'react-hook-form'



function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
     
  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create an account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account?$nbsp;
                <Link
                to='/login'
                className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label='Name :'
                    placeholder="Enter your name"
                    {...register("name", {
                        required: true,
                        validate: {
                            matchPatern: (value) => {
                                /\b([A-ZÀ-ÿ][a-z ]+[ ]*)+/.text(value) || "Please provide a valid name"
                            } 
                        }
                    })}
                    />
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
                    placeholder= "Your password goes here"
                    {...register("password", {
                        required:true,
                    })}
                    />
                    <Button type='submit' classname='w-full'>Create Account</Button>
                </div>
            </form>
    </div>
  )
}

export default Signup
