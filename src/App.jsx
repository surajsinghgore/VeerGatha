import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authSlice from './appwrite/auth'
import { login, logout } from './store/slice/authSlice'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let res = await authSlice.getCurrentUser();
      console.log(res)
      if (res) {
        dispatch(login({ userData: res }))
      } else {
        dispatch(logout())

      }
    } catch (error) {
      console.log(error)
    }
    finally { setLoading(false) }

  }, [])
  return (
    <>

    </>
  )
}

export default App
