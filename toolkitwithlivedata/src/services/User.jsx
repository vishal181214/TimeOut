import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const postApi = createApi({
    reducerPath:'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/',
    }),
    endpoints:(builder)=>({
        getAllPost: builder.query({
            query:()=>({
                url:'users',
                method:'GET'
            })
        }),
        getPostById: builder.query({
            query: (id) => ({
                url : `users/${id}`,
                method: 'GET'
            })
        }),
        getPostByLimit: builder.query({
            query: (num) =>{
                console.log("Limit N:",num);
                return {
                    url:`users?_limit=${num}`,
                    method: 'GET'
                }
            }
        }),
        deletePost: builder.mutation({
            query: (id) =>{
                console.log("Delete Id:",id);
                return {
                    url:`users/${id}`,
                    method: 'DELETE'
                }
            }
        }),
        createPost: builder.mutation({
            query: (newPost) =>{
                console.log(newPost);
                return{
                    url: 'users',
                    method:'POST',
                    body: newPost,
                    headers: {
                        'Content-type':'application/json; charser=UTF-8',
                    }
                }
            }
        }),
        updatePost: builder.mutation({
            query: (updatePostData) =>{
                console.log("Update Post:", updatePostData);
                const {id,...data} = updatePostData
                return{
                    url: `users/${id}`,
                    method:'PUT',
                    body: data,
                    headers:{
                        'Content-type':'application/json; charset=UTF-8'
                    }
                }
            }
        })
    }),
})

export const { useGetAllPostQuery, useGetPostByIdQuery, 
    useDeletePostMutation ,useGetPostByLimitQuery, 
    useCreatePostMutation, useUpdatePostMutation } = postApi;