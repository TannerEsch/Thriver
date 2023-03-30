import React, {useContext, useRef, useEffect} from 'react'
import axios from 'axios';
import { AiFillGithub, AiFillLinkedin  } from 'react-icons/ai';
import { RiTwitterFill } from 'react-icons/ri';
import { FaClipboardList } from 'react-icons/fa';
import { DataContext } from '../App';

const Usercard = () => {
  const {currentUser} = useContext(DataContext)
  const followersRef = useRef(0)
  const followingRef = useRef(0) 
  useEffect(() => {
  axios.get(`http://localhost:8000/user/${currentUser?.id}`).then(response => {
    followersRef.current = response.data.foundUser.followers.length
    followingRef.current = response.data.foundUser.following.length
  })
  }, [])
  
  return (
    <>
    <div className='relative bg-white rounded-2xl border-gray-300 scale-[1.2] border-[1px] w-[18rem] h-[26rem]'>
    <img src={currentUser?.header} className='w-[100%] object-cover rounded-2xl h-16  rounded-br-none rounded-bl-none border-gray-400 border-b-black border-b-[1px]'/>
    <div className='flex flex-col items-center justify-center mt-[-3.5rem]'>
        <img src={currentUser?.pfp} className=' rounded-[50%] outline outline-1 w-16 mt-5 mb-3'/>
        <div className='font-bold'>{currentUser?.name}</div>
        <div className='mb-3' >{currentUser?.email}</div>
        
        <p className='text-sm px-5 text-center border-b-[1px] pb-2 border-b-gray-400'>essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with</p>

        <div className='flex gap-16 mt-2 border-b-[1px] pb-2 border-b-gray-400 w-[100%] justify-center'>
            <div className='text-center font-bold'>{followersRef.current} <br /> followers</div>
            <div className='text-center font-bold '>{followingRef.current} <br /> following</div>
        </div>

        <div>
            <div className='flex justify-center'>
            <h1 className='font-bold p-1'>Public Links</h1>
            <h1 className='font-bold mr-[-1rem] text-2xl'>+</h1>
            </div>

            <div className='flex gap-3'>

            <div className='flex flex-col items-center'>
            <div><AiFillGithub /> </div>
            <p>Github</p>
            </div>

            <div className='flex flex-col items-center'>
            <div><RiTwitterFill /> </div>
            <p>Twitter</p> 
            </div>

            <div className='flex flex-col items-center'>
            <div><AiFillLinkedin /> </div>
            <p>LinkedIn</p> 
            </div>

            <div className='flex flex-col items-center'>
            <div><FaClipboardList /> </div>
            <p>Resume</p> 
            </div>
            
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Usercard