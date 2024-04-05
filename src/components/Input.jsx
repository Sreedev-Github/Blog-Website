import React, {useId} from 'react'

// We use this ForwardRef hook for getting access to this component in some other file. Like if we need a onChange we will need to make sure to pass this so that we can use all those methods in some other file.

const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref){
    const id = useId()

    return (
        <div className='w-full'>
            {/* This will only be displayed if the label is given */}
            {label && <label className='' htmlFor={id}>{label}</label>}
            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            id={id}
            ref={ref}
            {...props}
            />
        </div>
    )
})

export default Input
