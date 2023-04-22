import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app, { userRef } from '../Firebase/firebase.init';
import { toast } from 'react-toastify';
import { addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs'
const auth = getAuth(app)
const Login = () => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    named: '',
    mobile: '',
    password: ''
  })
  const [passwordShow, setPasswordShow] = useState(false)
  const [otpsent, setOtpsent] = useState(false)
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const generateCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {

      }
    }, auth);
  }
  const requestOtp = () => {
    setLoading(true)
    generateCaptcha()
    let appVarifier = window.recaptchaVerifier
    signInWithPhoneNumber(auth, `+880${form.mobile}`, appVarifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult
        toast.warning('OTP Sent Your 📞 Number', { theme: 'dark', type: 'default', autoClose: 2000 })
        setOtpsent(true)
        setLoading(false)
      }).catch(error => {
        toast.error(error, { theme: 'dark', type: 'default' })
        console.log(error);
      })
  }

  const varifyOTP = () => {
    try {

      setLoading(true)
      window.confirmationResult.confirm(otp).then((result) => {
        uploadData()
        toast.success('Successfully Sign UP 😃', { theme: 'dark', type: 'default', autoClose: 2000 })
        navigate('/login')
        setLoading(false)
        setOtp('')
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(form.password, salt)
      await addDoc(userRef, {
        name: form.named,
        password: hash,
        mobile: form.mobile
      })
    } catch (error) {
      console.log(error);
    }
  }


  const handleShowPassword = () => {
    setPasswordShow(!passwordShow)
  }
  return (
    <div className='w-full'>
      <div className="flex flex-col md:max-w-md max-w-sm  sm:mx-0 mx-4  md:mx-auto my-5 p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
        {otpsent ?
          <div className='mb-2'>
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
              <p className="text-sm text-gray-600 font-medium">Sign Up to access your account</p>
            </div>
            <div className='mb-2'>
              <label className="block mb-2 text-sm font-semibold">OTP</label>
              <input value={otp} onChange={(e) => setOtp(e.target.value)} name="otp" placeholder="123456" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 font-medium" />
            </div>
            <div className="space-y-2">
              <div>
                <button onClick={varifyOTP} type="button" className="w-full px-8 py-3 font-semibold rounded-md active:bg-violet-700 bg-violet-600 text-gray-50">{loading ? <div className='w-full flex justify-center items-center'><TailSpin height={25} color="white" /></div> : 'Confirm OTP'}</button>
              </div>
            </div>
          </div> : <>
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
              <p className="text-sm text-gray-600 font-medium">Sign Up to access your account</p>
            </div>
            <form className="space-y-12 mb-2" >
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold">Name</label>
                  <input required value={form.named} onChange={(e) => setForm({ ...form, named: e.target.value })} type="text" name="named" placeholder="John Doe" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 font-medium" />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold">Mobile No.</label>
                  <input required value={form.phoneNo} onChange={(e) => setForm({ ...form, mobile: e.target.value })} type="number" name="phoneNo" placeholder="+880" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 font-medium" />
                </div>

                <div className='relative'>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold">Password</label>
                    {/* <span className="text-xs hover:underline text-gray-600">Forgot password?</span> */}
                  </div>
                  <input required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type={passwordShow ? 'password' : 'text'} name="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 font-medium" />
                  <span onClick={handleShowPassword} className='cursor-pointer top-9 right-4 absolute text-slate-600 active:text-violet-600 transition hover:duration-300 '>{passwordShow ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <button onClick={requestOtp} type="button" className="w-full px-8 py-3 font-semibold rounded-md active:bg-violet-700 bg-violet-600 text-gray-50">{loading ? <div className='w-full flex justify-center items-center'><TailSpin height={25} color="white" /></div> : 'Request OTP'}</button>
                </div>
              </div>
            </form>
          </>}
        <p className="px-6 text-sm text-center text-gray-600">Already have an account yet?
          <Link to="/login">
            <span className="hover:underline text-violet-600">Log In</span>.
          </Link>
        </p>
      </div>
      <div id="recaptcha-container"></div>

    </div>
  )
}

export default Login
