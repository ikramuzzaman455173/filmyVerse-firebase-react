import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { addDoc } from "firebase/firestore";
import { moviesRef } from '../Firebase/firebase.init';
import { toast } from 'react-toastify';
import { appState } from '../App';
import { useNavigate } from 'react-router-dom';
const AddMovie = () => {
  {/* ====All state===== */ }
  const [data, setData] = useState({
    title: '',
    year: '',
    description: '',
    image: '',
    rating: 0,
    rated:0
  })

  const [loading, setLoading] = useState(false)
  const useAppState = useContext(appState)
  const navigate=useNavigate()
  {/* ====All handle Fuctions===== */ }
  const AddMovie = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (useAppState.login) {
        await addDoc(moviesRef, { ...data })
        toast.success('Added Movie Successfully', {autoClose: 2000,type:'default' })
      } else {
        navigate('/login')
      }
    } catch (error) {
      toast.error(error, {autoClose: 2000 })
      console.log('Error:',error);
    }
    // e.target.reset()
    setData({
      title: '',
      year: '',
      description: '',
      image: '',
    })
    console.log(e.target);
    setLoading(false)
  }
  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add Movie</h1>
          </div>
          <div  className="lg:w-1/2 md:w-2/3 mx-auto">
            <form onSubmit={AddMovie} className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-300">Title</label>
                  <input type="text" id="name" name="title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="input-style" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-300">Year</label>
                  <input type="text" name="year" value={data.year} onChange={(e) => setData({ ...data, year: e.target.value })} className="input-style" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-300">Image Link</label>
                  <input name="image" value={data.image} onChange={(e) => setData({ ...data, image: e.target.value })} className="input-style" />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label className="leading-7 text-sm text-gray-300">Description</label>
                  <textarea id="message" name="description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className="input-style h-32 resize-none leading-8 "></textarea>
                </div>
              </div>

              <div className="p-2 w-full">
                <button type='submit' className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                  {loading ? <TailSpin height={25} color="white" /> : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddMovie
