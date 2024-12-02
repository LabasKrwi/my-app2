import React, { useRef } from "react";
import PostItem from "./PostItem";
import { TransitionGroup } from "react-transition-group";
import {CSSTransition} from "react-transition-group";


const PostList = ({posts, title, remove}) => {
        const nodeRefs = useRef(posts.map(()=> React.createRef()));
    
    if (!posts.length) {
        return <h1 style ={{textAlign: 'center'}}>Посты не найдены</h1>
    }
    return (
        <div>
            <h1 style = {{textAling: 'center'}}>
                {title}
            </h1>
                <TransitionGroup>
                    {posts.map((post, index) =>
                           <CSSTransition
                                key={post.id}
                                timeout={500}
                                classNames="post"
                                nodeRef={nodeRefs.current[index]}
                                >
                                    <div ref={nodeRefs.current[index]}>
                                    <PostItem remove={remove} number ={index + 1} post={post} />
                                    </div>
                            </CSSTransition>
                            )}
                    </TransitionGroup>
                    
        </div> 
        )}

export default PostList;