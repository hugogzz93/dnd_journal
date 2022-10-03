import React from 'react'
import { Navbar } from 'components'
import Link from 'next/link'

import { Post } from 'generated/graphql'

const Banner = ({post, links}: {post: Post, links: any}) => (
    <div id='banner' className="flex flex-col w-full bg-cover border border-b-solid border border-b-stone-800 mb-8" style={{
        height: '66vh',
        borderBottomWidth: '32px',
        backgroundImage: `url(${post.image.url})`,
        backgroundPosition: '50% 50%',
        backgroundColor: post.meta.bgOverlayColor,
        backgroundBlendMode: 'multiply'
    }}>

        <Navbar links={links}/>

        <div className="container w-2/3 mx-auto flex flex-col align-middle justify-around flex-1 text-white">
            <div className='basis-1/3'></div>
            <div className='flex flex-col align-middle justify-around flex-1'>
            <div>
                <div className="text-7xl font-bold mb-8">
                    {post.title}
                </div>
                <div className="text-2xl italic">{post.heading}</div>
            </div>
            <div>
                    <Link href={'/post/' + post.slug}>
                        <button className="border-white border-2 inline p-3 hover:bg-slate-500 transition-all duration-300">Read More</button>
                    </Link>
            </div>
            </div>
        </div>
        
    </div>
)

export default Banner
