export default function Leads() {

}


export async function getServerSideProps() {
    await queryClient.prefetchQuery("leads", () => GetLeads())

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

