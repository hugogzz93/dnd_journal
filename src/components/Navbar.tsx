import React from 'react'
import Link from 'next/link'

const Navbar = ({links}: {links: any}) => (
        <div id="nav" className='container w-3/5 mx-auto flex justify-between pt-3'>
            <div className="flex hidden md:contents">
                {links.map((l: any) => (
                    <Link href={l.slug} key={l.slug}>
                        <div className="text-sm text-white mr-12 uppercase">{l.label}</div>
                    </Link>
                ))}
            </div>
        </div>
)

export default Navbar
