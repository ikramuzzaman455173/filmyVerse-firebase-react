import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LoginIcon from '@mui/icons-material/Login';
import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { appState } from '../../App';
const Header = () => {
  const useAppState=useContext(appState)
  return (
    <div className='text-3xl sticky top-0 z-10 header items-center text-red-500 font-bold p-3 border-b-2 border-gray-500 flex justify-between'>
      <Link to="/"><span>Filmy<span className='text-white'>Verse</span></span></Link>
      <h1 className='text-lg flex items-center cursor-pointer'>

      {useAppState.login?<Link to="/addmovie">
          <Button><AddCircleOutlineIcon color="warning" className='mr-1' /> <span className='text-white'>Add New</span></Button>
        </Link>:<Link to="/login" className='header border-2 border-slate-300 rounded'>
          <Button><LoginIcon color="error" className='mr-1' /> <span className='text-white'>Login</span></Button>
        </Link>}

      </h1>
    </div>
  )
}

export default Header