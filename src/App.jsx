import React, { useEffect, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { PostFilter } from "./components/PostFilter";
import { MyModal } from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/buttons/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/pages";


function App () {
    const [posts, setPosts] = useState ([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    let pagesArray = getPagesArray(totalPages);
   

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit)) 
    })


    useEffect(() => {
        fetchPosts()
    }, [])

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
            {postError && 
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display:'flex', justifyContent: 'center', marginTop:'50px'}}>
                    <Loader />
                </div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
            }
            <div style={{justifyContent:'center', margin:30}}>
                {pagesArray.map((p) => 
                    <MyButton >{p}</MyButton>
                    )
                }
            </div>
        </div>
    );
}

export default App;