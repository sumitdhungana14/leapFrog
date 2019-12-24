import React from 'react';

const List = (props) => {
    const {post,index, removePost} = props;
    return (
        <div className="list-container">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button onClick={() => removePost(index)}>Remove</button>
        </div>
    )
}

export default List;