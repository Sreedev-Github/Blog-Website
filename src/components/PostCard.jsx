import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    // This $id variable is something given by appwrite so we don't play around much.
  return (
    // Good thing about Link tag is that you don't have to give the full url instead you can give the url from the page which user is at right now.
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
              
                {/* This getFilePreview takes the image as the Id of the image is also associated with it so it returns us a preview of the image */}
                <img src={appwriteService.getFilePreview(featuredImage)} alt="{title}" className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
