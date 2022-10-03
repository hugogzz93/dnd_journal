import React from 'react';
import { Post, Categories } from 'generated/graphql'
import Link from 'next/link'

import { PostBanner } from 'components'
import { links } from 'pages'
import { GetPosts, GetPost } from 'services';
import { getContentFragment } from 'lib'


const PostLinkBlock = ({posts, title}: {posts: Array<Post>, title: string}) => (
    <div className="flex flex-col mb-12">
        <div className="text-bold text-xl uppercase font-black mb-4">
            {title}
        </div>
        {posts.map(p => (
            <Link href={p.slug}>
                <div className="my-2 cursor-pointer text-sm text-indigo-900 underline flex items-center">
                    {p.postType.includes(Categories.Location) && <img className='mr-2' src={`/icons/location.svg`} alt={'location'} />}
                    {p.title}
                </div>
            </Link>
        ))}
    </div>
)

const PostView = ({post}: {post: Post}) => {
    return (
        <>
            <PostBanner post={post} links={links}/>
            <div className="container w-100 md:w-9/12 mx-auto ">
                <div className="grid grid-cols-12 px-8">
                    <div className="col-span-12 md:col-span-3 py-14 text-base">
                        <div className="flex flex-col">
                            <PostLinkBlock
                                title='Locations'
                                posts={post.posts.filter(p => p.postType.includes(Categories.Location))}
                            />

                            <PostLinkBlock
                                title='Leads'
                                posts={post.posts.filter(p => p.postType.includes(Categories.Lead))}
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-8 py-14">
                        <div className="c--prose text-xl">
                            {post.content.json.children.map((typeObj, index) => {
                                const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item, null))

                                return getContentFragment(index, children,typeObj, typeObj.type)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PostView

export async function getStaticProps({params}) {
    const {posts} = await GetPost({slug: params.slug});
     
    return {
        props: { post: posts[0] }
    }

}

export async function getStaticPaths() {
    const {posts} = await GetPosts();

    return {
        paths: posts.map(p => ({params: {slug: p.slug}})),
        fallback: false
    }
}
