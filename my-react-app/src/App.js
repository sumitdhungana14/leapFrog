import React from 'react'
import ListComponent from './ListComponent'
import Form from './Form'
import './index.css'


class App extends React.Component {

    state = {
        posts: [
            {
                title: 'something',
                body: 'some text'
            },
            {
                title: 'title2',
                body: 'body2'
            },
            {
                title: 'title3',
                body: 'body3'
            }
        ]
    }

    removePost = index => {
        const { posts } = this.state;
        const updatedPosts = posts.filter((post, i) => {
            return i !== index;
        })

        this.setState({
            posts: updatedPosts,
        })

    }

    addPost = post => {
        this.setState(function(state){
            return {
                posts: [...state.posts, post]
            }
        })
    }

    render() {
        const { posts } = this.state;
        return (
            <div>
                <ListComponent records={posts} removePost={this.removePost} />
                <Form addPost={this.addPost}/>
            </div>
        )
    }
}

export default App;