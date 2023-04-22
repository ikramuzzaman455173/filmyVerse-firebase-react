import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from '../Firebase/firebase.init';
import bcrypt from 'bcryptjs'
import { appState } from '../App';

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    mobile: '',
    password: ''
  })
  const [passwordShow, setPasswordShow] = useState(false)
  const useAppState = useContext(appState)
  const navigate = useNavigate()
  const logIn = async () => {
    setLoading(true)

    try {
      const quer = query(userRef, where('mobile', '==', form.mobile))
      const querySnapShot = await getDocs(quer)
      let loginSuccess = false
      if (querySnapShot.empty) {
        toast.error("Password Or Phone Number Field Can't Empity ⚠", { theme: 'dark', type: 'default', autoClose: 2000 })
      } else {
        querySnapShot.forEach((doc) => {
          const _data = doc.data()
          const isUser = bcrypt.compareSync(form.password, _data.password)
          if (isUser) {
            useAppState.setLogin(true)
            useAppState.setUserName(_data.name)
            loginSuccess = true
            toast.success('Successfully Log In 😃', { theme: 'dark', type: 'default', autoClose: 2000 })
            setTimeout(() => {
              navigate('/')
            }, 3000);
          }
        })
        if (!loginSuccess) {
          toast.error('Invalid Password Or Phone Number', { theme: 'dark', type: 'default', autoClose: 2000 })
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { theme: 'dark', type: 'default' })
    }

    setLoading(false)
  }
  const handleShowPassword = () => {
    setPasswordShow(!passwordShow)
  }
  return (
    <div className='w-full'>
      <div className="flex flex-col md:max-w-md max-w-sm  sm:mx-0 mx-4  md:mx-auto my-5 p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log in</h1>
          <p className="text-sm text-gray-600 font-medium">Log in to access your account</p>
        </div>
        <form className="space-y-12" >
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">Mobile No.</label>
              <input value={form.phoneNo} onChange={(e) => setForm({ ...form, mobile: e.target.value })} type="number" name="phoneNo" placeholder="+880" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800  font-medium" />
            </div>
            <div className='relative'>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold">Password</label>
                {/* <span className="text-xs hover:underline text-gray-600">Forgot password?</span> */}
              </div>
              <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type={passwordShow ? 'password' : 'text'} name="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 font-medium" />
              <span onClick={handleShowPassword} className='cursor-pointer top-9 right-4 absolute text-slate-600 active:text-violet-600 transition hover:duration-300 '>{passwordShow ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button onClick={logIn} type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50 active:bg-violet-700">{loading ? <div className='w-full flex justify-center items-center'><TailSpin height={25} color="white" /></div> : 'Log In'}</button>
            </div>
            <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
              <Link to="/signup">
                <span className="hover:underline text-violet-600">Sign up</span>.
              </Link>
            </p>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Login
