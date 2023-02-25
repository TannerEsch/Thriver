import React from 'react'
import {Post, Usercard, UserGroups} from './'

const SocialDash = () => {
  return (
    <>

      <div className='flex flex-col right-[5%] top-[10%] fixed gap-4' >

      <div >
          <Usercard />
      </div>

      <div >
          <UserGroups />
      </div>

      </div>

    <div className='flex flex-col justify-center text-center'>
    <div className='mx-auto w-[50%]'>
    <div className='bg-gray-300 h-[8rem]'>hi</div>

    <div className='bg-white h-[18rem] flex flex-col justify-end'>
      <div className='bg-white absolute ml-4 border-[1px] border-black rounded-[50%] mb-[15rem] w-24 h-24'> pic</div>
      <div className='absolute mb-[10rem] ml-4 font-bold'>Username <br /> <p className='font-normal ml-1 text-[0.9rem]'>@Username</p> </div>

    <ul className='flex gap-10 justify-center text-xl'>
      <li>Posts</li>
      <li>Likes</li>
      <li>Comments</li>
      <li>Bookmarks</li>
      <li>Followers</li>
      <li>Following</li>
    </ul>
    </div>
    <Post/>
    </div>
    </div>
  </>
  )
}

export default SocialDash