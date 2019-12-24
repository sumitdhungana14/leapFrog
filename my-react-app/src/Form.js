import React, { Component } from 'react'

class Form extends Component {
    state = {
        title: '',
        body: ''
    }


    onSubmit = event => {
        event.preventDefault();
        this.props.addPost(this.state);
        this.setState({
            title:'',
            body:''
        })
    }

    onChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    render() {
        const { title, body } = this.state;
        return (
            <div>
                <form >
                    <label>Title</label>
                    <input name="title" value={title} onChange={this.onChange}></input>
                    <label>Body</label>
                    <input name="body" value={body} onChange={this.onChange}></input>
                    <input type="submit" onClick={this.onSubmit}></input>
                </form>
            </div>
        )
    }
}

export default Form;
