import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { db, reviewsRef } from '../Firebase/firebase.init'
import { addDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import { appState } from '../App'
import { useNavigate } from 'react-router-dom'
const Reviews = ({ id, prvRating, userRated }) => {
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')
  const [movieData, setMovieData] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const useAppState = useContext(appState)
  const [newAdded, setNewAdded] = useState(0)
  const navigate=useNavigate()
  const sendReview = async () => {
    try {
      if (useAppState.login) {
        setLoading(true)
      await addDoc(reviewsRef, {
        movieId: id,
        name:useAppState.userName,
        rating: rating,
        thoughts: data,
        timestamp: new Date().getTime()
      })
      const ref = doc(db, 'movies', id)
      await updateDoc(ref, {
        rating: prvRating + rating,
        rated: userRated + 1,
      })
      toast.success('Review Sent Successfully', { theme: 'dark', autoClose: 2000, type: 'default' })
      setLoading(false)
        setData('')
        setNewAdded(newAdded+1)
      setRating(0)
      } else {
        navigate('/login')
    }
    } catch (error) {
      toast.error(error.message, { theme: 'dark', autoClose: 2000, type: 'default' })
    }
  }

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true)
      setMovieData([])
      let quer = query(reviewsRef, where('movieId', '==', id))
      const querySnapShot = await getDocs(quer)
      querySnapShot.forEach(doc => {
        setMovieData((prev) => [...prev, doc.data()])
      })
      setReviewsLoading(false)
    }
    getData()
  }, [newAdded])
  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
      <h1 className='mb-1'><ReactStars onChange={(rate) => setRating(rate)} className='pl-2' size={30} half={true} value={rating} /></h1>
      <input value={data} onChange={(e) => setData(e.target.value)} type="text" placeholder='Share Your Thoughts ....' className='w-full p-2 text-sm outline-none header' />
      <button onClick={sendReview} className='bg-green-600 hover:bg-green-700 font-semibold transition duration-300 w-full p-2 flex justify-center items-center'>{loading ? <TailSpin height={20} color="white" /> : 'Share'}</button>

      {
        reviewsLoading ? <div className='w-full flex justify-center items-center mt-6'><ThreeDots height={10} color='white' /></div> :
          <div className='mt-4 p-2'>
            {
              movieData.map((e, i) => {
                return (
                  <div className='header p-2 mt-2 border-b border-gray-600 w-full' key={i}>
                    <div className="flex items-center">
                      <p className='font-semibold text-yellow-500'>{e.name}</p>
                      <p className='ml-3 text-xs text-gray-200'>({new Date(e.timestamp).toLocaleString()})</p>
                    </div>
                    <ReactStars edit={false} size={15} value={e.rating} />
                    <p className='mt-2 text-slate-50'>{e.thoughts}</p>
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  )
}

export default Reviews