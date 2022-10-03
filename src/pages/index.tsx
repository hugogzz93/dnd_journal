import { dehydrate, useQuery } from 'react-query'
import { Post } from 'generated/graphql'

import { GetPosts, queryClient } from 'services'
import { Banner, NewsBlock } from '../components'

export const links = [
    {label: 'Home', slug: '/'},
    {label: 'Timeline', slug: 'timeline'},
    {label: 'Sessions', slug: 'sessions'},
    {label: 'Leads', slug: 'leads'},
]

export default function Home() {
    const { data } = useQuery(['posts'], () => GetPosts())
    if(!data)
        return <div></div>
    const latestPost = data.posts.sort((a, b) => (new Date(a.createdAt)).getTime() - new Date(b.createdAt).getTime())[0]
    return (
      <>
        <Banner 
          post={latestPost}
          links={links}
        />
        <NewsBlock title={'Updates'} posts={data.posts as Array<Post>}/>
      </>
    )
}

export async function getServerSideProps() {
    await queryClient.prefetchQuery("posts", () => GetPosts())

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

