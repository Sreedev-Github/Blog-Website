import React, {useId} from 'react'

  function Select({
    // We take an empty array as prop because we want all the options in an array
    option = [],
    label,
    // We pass empty string as if someone didn't pass values in it we won't get the null value added to our classes.
    className = '',
    ...props
},ref) {
    const id = useId()

  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((item)=> (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)
