import React from 'react'
import { Navbar } from 'components'

import { Post, Categories } from 'generated/graphql'

const Banner = ({links}: {links: any}) => (
    <div id='banner' className="flex flex-col w-full bg-cover md:border-b-solid border mb-8" style={{
        height: '25vh',
            minHeight: '20rem',
        borderBottomWidth: '32px',
        backgroundImage: `url(/lead.png)`,
        backgroundPosition: '50% 50%',
        backgroundBlendMode: 'multiply',
        borderBottomColor: '#533900',
        backgroundColor: '#35263b',
    }}>

        <Navbar links={links}/>

        <div className="container w-full mx-auto flex flex-col align-middle justify-around flex-1 text-white">
            <div className='hidden md:block basis-1/3'></div>
            <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-4">
                    <div className="text-5xl md:text-7xl font-bold text-center md:text-left">
                        Quest Log
                    </div>
                </div>
            </div>
        </div>
        
    </div>
)

export default Banner


