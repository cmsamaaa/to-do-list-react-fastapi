import axios from 'axios';

import { useState, useEffect } from 'react';

import Todo from './components/TodoList';
import CreateTodo from './components/CreateTodo';

/* eslint-disable no-unused-vars */
function App() {
    const [todoList, setTodoList] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const getTodoList = async () => {
            const response = await axios.get('http://127.0.0.1:8000/todo');
            const dataList = Object.keys(response.data).map((key) => [
                key,
                response.data[key],
            ]);
            setTodoList(dataList);
        };

        getTodoList();
    }, []);

    const addPost = (postData) => {
        axios
            .post('http://127.0.0.1:8000/todo/create', postData)
            .then((response) => {
                if (response.status == 200) {
                    setTodoList((existingPosts) => [
                        ...existingPosts,
                        [postData.title, postData.content],
                    ]);
                }
            });
    };

    const updatePost = (postData) => {
        axios
            .post('http://127.0.0.1:8000/todo/update', postData)
            .then((response) => {
                if (response.status == 200) window.location.reload(true);
            });
    };

    const deletePost = (event, title) => {
        axios.post('http://127.0.0.1:8000/todo/delete', { title: title });
        window.location.reload(true);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const postData = {
            title: title,
            content: content,
        };
        if (isEdit) updatePost(postData);
        else addPost(postData);
        setTitle('');
        setContent('');
    };

    const loadEditPost = async (event, title) => {
        const response = await axios.get(`http://127.0.0.1:8000/todo/${title}`);
        setTitle(title);
        setContent(response.data.msg);
        setIsEdit(true);
    };

    return (
        <>
            <CreateTodo
                onSubmitPost={submitHandler}
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
            />
            <Todo
                todoList={todoList}
                loadEditPost={loadEditPost}
                onDeletePost={deletePost}
            />
        </>
    );
}

export default App;
