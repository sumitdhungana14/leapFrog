import React from 'react'
import List from './List'

const ListComponent = props => {
    const {records, removePost} = props ; 
    return records.map((post, index) => 
         <List
         post={post} 
         key={index}
         index={index}
         removePost={removePost}/>
    )
}

export default ListComponent;