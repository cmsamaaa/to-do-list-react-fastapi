// import axios from 'axios';

// import { useState, useEffect } from 'react';
// import './App.css'

/* eslint-disable react/prop-types */

function CreateTodo({ title, content, setTitle, setContent, onSubmitPost }) {
    return (
        <>
            <h3>Todo List Form</h3>
            <form onSubmit={onSubmitPost}>
                <input
                    type='text'
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                    type='text'
                    placeholder='Enter content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}

export default CreateTodo;
