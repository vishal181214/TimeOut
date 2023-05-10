import './App.css';
import { Vortex } from 'react-loader-spinner';
import { useCreatePostMutation, useDeletePostMutation, useGetAllPostQuery, useGetPostByIdQuery, useGetPostByLimitQuery, useUpdatePostMutation } from './services/User';

function App() {
  const responseInfo = useGetAllPostQuery();
  const oneUser = useGetPostByIdQuery(5);
  const limituser = useGetPostByLimitQuery(10);
  const [deleteUser, resInfo] = useDeletePostMutation();
  const [createPost, result] = useCreatePostMutation();
  const [updatePost, postResult] = useUpdatePostMutation();
  console.log("Response Information:",postResult);
  console.log("Data:",postResult.data);
  console.log("Sucess:",postResult.isSuccess);

  const newPost = {
    title: 'This is New Title',
    body: 'This is New Body',
    userId: 2,
  }

  const updatePostData = {
    id:2,
    title: 'This is My New Thing',
    body: 'This is New Body',
    userId: 2,
  }
  // console.log(responseInfo.data);
  // console.log(oneUser);
  // console.log("limit number",limituser);
  if(responseInfo.isLoading) return <div><Vortex/></div>
  if(responseInfo.isError) return <div><h2>
    An error occured!
    {responseInfo.error.error}
  </h2>
  </div>
  return (
    
    // <div className="App">
    //   {
    //     responseInfo.data.map((item,index)=>{
    //       return(<p key={index}>{item.login}</p>)
    //     })
    //   }
    // </div>

    // to get Single Data
    // <div>
    //   {
    //     limituser.data.map((item,index)=>{
    //       return(<p key={index}>{item.login}</p>)
    //     })
    //   }

    // delete user
    // <button onClick={()=>{createPost(newPost)}}>Delete User</button>
    <button type="" onClick={()=>{updatePost(updatePostData)}}>Update Data</button>
    // </div>
  );
}

export default App;
