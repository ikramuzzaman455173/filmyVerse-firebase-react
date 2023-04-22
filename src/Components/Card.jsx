import { getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { moviesRef } from '../Firebase/firebase.init'
import { Link } from 'react-router-dom'
const Card = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setLoading(true)
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData(prv => [...prv, { ...(doc.data()), id: doc.id }])
      })
      // console.log(_data);
      setLoading(false)
    }
    getData()
  }, [])

  // console.log(data);


  return (
    <div className='flex flex-wrap justify-between mb-5 px-3 mt-2'>
      {
        loading ? <div className='flex justify-center items-center w-full h-96'><ThreeDots height={40} color="white" /></div> :
          data.map((e, i) => (
            <Link to={`/detail/${e.id}`} key={i}><div className='card shadow-lg p-2 border border-gray-500 rounded-sm cursor-pointer hover:-translate-y-3 font-medium transition hover:duration-500 mt-5'>
            <img className='md:h-72 h-60 md:w-[10rem] w-full shadow-sm my-1 border-2 rounded' src={e.image} alt="movie poster image" />
            <h1>{e.title}</h1>
            <h1 className='flex items-center'><span className='text-gray-500'>Rating:</span><ReactStars className='pl-2' edit={false} size={20} half={true} value={e.rating/e.rated} /></h1>
            <h1><span className='text-gray-500'>Year:</span> {e.year}</h1>
          </div></Link>
          ))
      }


    </div>


  )
}

export default Card
