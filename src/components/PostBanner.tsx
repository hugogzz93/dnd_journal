import React from 'react'
import { Navbar } from 'components'

import { Post, Categories } from 'generated/graphql'

const Banner = ({post, links}: {post: Post, links: any}) => (
    <div id='banner' className="flex flex-col w-full bg-cover border border-b-solid border mb-8" style={{
        height: '66vh',
        borderBottomWidth: '32px',
        backgroundImage: `url(${post.image ? post.image.url : '/lead.png'})`,
        backgroundPosition: '50% 50%',
        backgroundColor: post.meta?.bgOverlayColor ? post.meta?.bgOverlayColor : '#833a0b',
        backgroundBlendMode: 'multiply',
        borderBottomColor: post.meta?.bgOverlayColor ? post.meta?.bgOverlayColor : '#833a0b',
    }}>

        <Navbar links={links}/>

        <div className="container w-2/3 mx-auto flex flex-col align-middle justify-around flex-1 text-white">
            <div className='basis-1/3'></div>
            <div className="grid grid-cols-12 px-8">
                <div className="col-span-4">
                    <div className="text-7xl font-bold">
                        {post.title}
                    </div>
                </div>
                <div className="col-span-8">
                    <div className="text-4xl h-full flex italic items-center">- {post.heading}</div>
                </div>
            </div>
        </div>
        
    </div>
)

export default Banner

