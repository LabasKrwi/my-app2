import React, { useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { PostFilter } from "./components/PostFilter";
import { MyModal } from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/buttons/MyButton";
import {usePosts} from "./hooks/usePosts";



function App () {
    const [posts, setPosts] = useState ([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    const createPost = (newPost) => {
        setPosts ([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }    

    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}}onClick={ ()=> setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal
                
                visible={modal}
                setVisible={setModal}
            ><PostForm create={createPost}/></MyModal>
            
            <hr style={{margin:'15px'}}/>
            <PostFilter 
            filter ={filter} 
            setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
        </div>
    );
}

export default App;