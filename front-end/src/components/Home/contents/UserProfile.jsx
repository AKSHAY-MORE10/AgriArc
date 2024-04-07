import React from 'react';
import LogOut from '../Logout.jsx'
// import deleteUser from '../delete.jsx'
import DeleteUser from '../delete.jsx'


function UserProfile() {


  const UserData= JSON.parse(localStorage.getItem("user"))?.data?.user;
console.log(UserData)
  return (
    <>
    
      <div className="main flex justify-center items-center w-full h-full bg-[#8EE4AF]">
          <div className="left  w-1/3 h-3/4 p-10 flex-col bg-[#45b86a] rounded-xl flex justify-start items-center">
          <div className="img flex  flex-col justify-center items-center">
          <img className='w-[250px] rounded-full h-[250px]' src={UserData.profileImage} alt="" />
          <p className=' text-black font-semibold w-fit  mt-4 px-6 py-2 bg-white text-xl rounded-xl'>{UserData.username}</p>
            </div>
          <h1 className='text-black font-semibold w-fit  mt-4 px-6 py-2 bg-white text-xl rounded-xl'>{UserData.fullName}</h1>
          <p className=' text-black font-semibold w-fit  mt-4 px-6 py-2 bg-white text-xl rounded-xl '>{UserData.email}</p>
          <div className="btn">
            <LogOut />
            <DeleteUser/>
          </div>

</div>
      </div>

        

    </>
  )
}

export default UserProfile