import React from 'react'

function Container({children}) {
    // Removed parenthesis from the return satement as we are returning only 1 line of code
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container
