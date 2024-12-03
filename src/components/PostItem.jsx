import React from "react";
import MyButton from "./UI/buttons/MyButton";
import { Navigate, useNavigate } from "react-router-dom";


const PostItem = (props) => {
    const router = useNavigate();
    return (
        <div className="post">
            <strong>
                {props.post.id}. {props.post.title}
            </strong>
            <div>
                {props.post.body}
            </div>
            <div className="post__btns">
                <MyButton onClick ={() => router(`/posts/${props.post.id}`)}>
                        Открыть
                </MyButton>
                <MyButton onClick ={() => props.remove(props.post)}>
                        Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;

