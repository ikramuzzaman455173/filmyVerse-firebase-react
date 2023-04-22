import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-stars'
import { db } from '../Firebase/firebase.init'
import { ThreeCircles } from 'react-loader-spinner'
import Reviews from './Reviews'

const Details = () => {
  const { id } = useParams()
  const [data, setData] = useState([{
    title: '',
    year: '',
    image: '',
    description: '',
    rating: 0,
    rated:0
  }])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getData() {
      setLoading(true)
      const _doc = doc(db, "movies", id)
      const _data = await getDoc(_doc)
      setData(_data.data())
      setLoading(false)
    }
    getData()
  }, [])
  // console.log(`data`,data);
  return (
    <div className='p-4 flex flex-col md:flex-row items-center md:items-start mt-4 justify-center w-full'>
      {loading ? <div className='w-full flex justify-center items-center h-96'><ThreeCircles height={30} color='white' /></div> :
        <>
          <img className='h-96 block md:sticky top-24' src={data.image} alt="details page image" />
          <div className='md:ml-4 ml-0  md:w-1/2 w-full'>
            <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>
            <h1 className='mt-1'><ReactStars className='pl-2' edit={false} size={20} half={true} value={data.rating/data.rated} /></h1>
            <p className="mt-3 ">{data.description}</p>
          <Reviews userRated={data.rated} prvRating={data.rating} id={id} />
          </div>
        </>}
    </div>
  )
}

export default Details


