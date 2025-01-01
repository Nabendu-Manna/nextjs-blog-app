import React from 'react'
import PostCard from './PostCard'

function PostList() {
    return (
        <div className='flex flex-col gap-3 w-full'>
            <PostCard className='w-full'/>
            <PostCard className='w-full'/>
            <PostCard className='w-full'/>
            <PostCard className='w-full'/>
        </div>
    )
}

export default PostList