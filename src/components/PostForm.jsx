import React, {useState} from 'react'
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/buttons/MyButton";


export const PostForm = ({create}) => {
    const [post, setPost] = useState({title:'', body:''})

    function addNewPost (e) {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create (newPost)
        setPost({title:'', body:''})
    }

  return (
    <form >
                <MyInput 
                // управляемый компонент*
                    value = {post.title}
                    onChange = {e => setPost({...post, title : e.target.value})}
                    type="text" 
                    placeholder="Название поста" 
                />
                {/* неуправляемый/ неконтролируемый компонент */}
                <MyInput 
                    value = {post.body}
                    onChange = {e => setPost({...post, body : e.target.value})}
                    type="text" 
                    placeholder="Описание поста" 
                />
                <MyButton onClick = {addNewPost}> Создать пост </MyButton>
            </form>
  )
}
