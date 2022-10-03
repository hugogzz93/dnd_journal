import React from 'react'
import moment from 'moment'
import { Post } from 'generated/graphql'
import { Topic } from '../components'

const NewsBlock = ({title, posts}: {title: string, posts: Array<Post>}) => (
    <div className="container w-2/3 py-4 mx-auto text-slate-800">
        <div className="text-5xl mb-4 font-bold">{title}</div>
        <div className="grid gap-6 grid-cols-12 border-t-2 border-t-solid border-t-slate-800 pt-5 mb-8">
            {posts.map((d: Post) => <Topic 
                heading={d.postType[0] == 'Session' ? 'Session - ' + moment(d.createdAt).format('YYYY.MM.DD') : d.postType[0]}
                size={d.meta.blockSize}
                title={d.title}
                image={d.image?.url || '/lead.png'}
                link={d.slug} 
                key={d.slug}
                slug={d.slug}
                meta={d.meta}
                />
            )}
          </div>
      </div>
)


export default NewsBlock
