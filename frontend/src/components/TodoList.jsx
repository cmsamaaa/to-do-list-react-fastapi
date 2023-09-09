/* eslint-disable react/prop-types */
function TodoList({ todoList, loadEditPost, onDeletePost }) {
    return (
        <>
            <h3>To-do List</h3>
            {todoList.length > 0 && (
                <div>
                    {todoList.map((item, idx) => (
                        <p key={idx} className='todo-box'>
                            <span style={{ fontWeight: 'bold' }}>
                                {item[0]}
                            </span>
                            <br />
                            {item[1]}
                            <br />
                            <button
                                type='submit'
                                onClick={(e) => loadEditPost(e, item[0])}
                            >
                                Edit
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                                type='submit'
                                onClick={(e) => onDeletePost(e, item[0])}
                            >
                                Delete
                            </button>
                        </p>
                    ))}
                </div>
            )}
        </>
    );
}

export default TodoList;
