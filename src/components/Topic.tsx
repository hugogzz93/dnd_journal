import React from 'react'
import Link from 'next/link';

const Topic = ({link, image, heading, title, size = 'sm', slug, meta}: {link: string, image: string, heading: string, title: string, size: string, slug: string, meta: any}) => {
    const style = {
        backgroundImage: `url(${image})`,
        backgroundPosition: '50% 50%',
        backgroundSize: null,
        backgroundColor: meta.bgOverlayColor || '#833a0b',
        backgroundBlendMode: 'multiply'
    }

    if(meta?.backgroundSize) style.backgroundSize = meta.backgroundSize;

    return (
        <Link href={`/post/${slug}`}>
            <div className={`cursor-pointer relative ${size == 'sm' ? 'col-span-3' : size == 'md' ? 'col-span-6' : 'col-span-9'} h-80 text-white img--filter img--filter__dark-violet`}>
                    <div className="rounded-md w-full h-full bg-cover" style={style}></div>
                    <div className="flex flex-col absolute bottom-1 p-4 w-full">
                        <h3>{heading}</h3>
                        <div className="w-full border-t-2 border-t-white my-2"></div>
                        <h1 className='text-4xl'>{title}</h1>
                    </div>
            </div>
        </Link>

    )
}

export default Topic
