import NavHead from './NavHead.jsx'
import NavElems from './NavElems.jsx'


import React from 'react'

let userData = JSON.parse(localStorage.getItem('user'))?.data?.user;
console.log(userData)
function Nav() {
  return (
      <div className="left overflow-hidden  h-full w-[15%] flex flex-col justify-between items-center">
          

    <div className="top overflow-hidden flex flex-col gap-5 justify-start ">
      <NavHead imgUrl="/logo.png" tittle="AgroArc" url='/home'  />
      
      <NavElems/>

      <NavHead imgUrl={userData.profileImage} tittle={userData.fullName} url='/home/userProfile' />
    </div>

     </div>
  )
}

export default Nav