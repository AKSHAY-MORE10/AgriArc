import React from 'react'
import { Link } from 'react-router-dom'

function NavHead({imgUrl , tittle , url}) {
  return (
    <div className="NavHead  bg-slate-100 py-[2%] w-[100%]  px-4 rounded-xl flex gap-3 items-center ">
             <Link to={url}><img src={imgUrl} alt="logo" className='w-10 h-10 rounded-full' /></Link>
         <Link to={url}><h1 className='text-xl underline font-bold'>{tittle}</h1></Link>
               </div>
  )
}

export default NavHead