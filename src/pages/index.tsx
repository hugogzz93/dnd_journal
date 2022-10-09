import { dehydrate, useQuery } from 'react-query'
import { Post } from 'generated/graphql'
import Head from 'next/head'

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
        <Head>
        <title>Dnd</title>

            <meta charSet="UTF-8" key="charset" />
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=IM+Fell+Double+Pica:ital@0;1&family=Open+Sans:ital,wght@0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Sora:wght@100&display=swap" rel="stylesheet"/>
        </Head>
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

