import {React, useState, useEffect, useReducer, useRef} from 'react';
import 'C:/Users/User/my-app2/src/styles/App.css';
import PostList from "C:/Users/User/my-app2/src/components/PostList";
import { PostForm } from "C:/Users/User/my-app2/src/components/PostForm";
import { PostFilter } from "C:/Users/User/my-app2/src/components/PostFilter";
import { MyModal } from "C:/Users/User/my-app2/src/components/UI/MyModal/MyModal";
import MyButton from "C:/Users/User/my-app2/src/components/UI/buttons/MyButton";
import {usePosts} from "C:/Users/User/my-app2/src/hooks/usePosts";
import PostService from "C:/Users/User/my-app2/src/API/PostService";
import Loader from "C:/Users/User/my-app2/src/components/UI/Loader/Loader";
import { useFetching } from "C:/Users/User/my-app2/src/hooks/useFetching";
import { getPageCount, getPagesArray } from "C:/Users/User/my-app2/src/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts () {
    const [posts, setPosts] = useState ([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();
    const observer = useRef();
    console.log(lastElement);
    

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit)) 
    })

    

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page])

    const createPost = (newPost) => {
        setPosts ([...posts, newPost])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }    

    const changePage = (page) => {
        setPage(page);
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
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
            <div ref={lastElement} style={{ height: 20, background: 'red'}}/>
            {isPostsLoading &&
                <div style={{display:'flex', justifyContent: 'center', marginTop:'50px'}}><Loader /></div>
            }
            <Pagination 
            page={page} 
            changePage={changePage} 
            totalPages={totalPages}
            />
                </div>
    );
}

export default Posts;


