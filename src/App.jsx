import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import './App.css'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {

  const userData = useSelector((state) => state.userData) 

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if (userData){
        dispatch(login({userData}))
      }else{
        // console.log(userData); null
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <h1 className='text-3xl mt-0 text-gray-850'>Hello { userData?.name}</h1>
    <div className='w-full block'>
      <Header/>
      <main>
         <Outlet/>
      </main>
      <Footer/>
    </div>
    </div>
  ) : null
}

export default App
