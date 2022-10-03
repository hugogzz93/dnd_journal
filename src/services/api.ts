import { GraphQLClient } from "graphql-request";
import { QueryClient } from 'react-query'
import { getSdk } from "../generated/graphql";

const gqlClient = new GraphQLClient("https://api-us-east-1.hygraph.com/v2/cl8rq2wn133lm01uqd5zpclaw/master", {
    headers: {
        "content-type": "application/json",
        "Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjQ3MzkwODIsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w4cnEyd24xMzNsbTAxdXFkNXpwY2xhdy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYWNhNzFiN2MtNDZjNy00ZmNkLTgzMmUtMjczZDMyOTRkZGM4IiwianRpIjoiY2w4cnFvMHZjMzViMzAxdGM5a2lkZHY4YiJ9.zDySHG9t4PYc08f-_N_wrKp48Gbvzyp00A-tnh3d2VnSqMOGG6TDhV1pnjDnO9C0L2G-tSZLhT4Ayh2OGMgIrxN5bn0T3EougZtTYIsIKd0uLSJzSNbOvYmOtVJJFspK6yHjJjIr_hDnI010U9nUUvj22gWKdwtYBamCUoldM9Zsbpdozi9kMZCHxOIgk14BOb_2bI2i7b_6yMEE3Ma7xuoTJNjr3yTmiz1jfP7CDuQgoY3DnbZeGtcmw9c1OxKxMBcF9iLQOAr6DJuMCDptdRT4sqk8hnrKBxAhglTCLKG-jxDNLt7n-QaRCDb_rMuC54iGwQh_shOeccRM9ukao9hg2OSFuwP-K6JVS5vE-P9_497DwqfwmJMtK8FIHP6SW_d82_xhM3v4K21IgLhR-cyE7CSXRydeBjpQe0X_govC86UvEfL-tcYVo22CUFqqsSGBR0cdHdzG3z57q4Z4vKalm7GXf1EKrtQ1jsMFE8EYjLwKp2zyhPgkAX3ceFY1G9NWG4Q-feq90uPPFmImCFd9WO5Qtp2-zBvL268ueO0DaMbBoleuQnBV34W80VmAQC9S21M9E3tIzmMtFmZ_VmEuvHgMM3qrOpRqC5dCsTNn4RFLlr9sg-fWH_j9qUhJnDB9EX4mWqW2RBec2Q_Pms5wWvrfqZeBw_URMEybjbs"
    }
})
export const {
    GetRecentPosts,
    GetPosts,
    GetPost
} = getSdk(gqlClient)

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false
        }
    }
})
