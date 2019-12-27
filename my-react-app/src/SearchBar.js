import React from 'react';

const SearchBar = props => {

    return (
       <div className="searchBar">
            <input name="searchText" value={props.value} type="text" placeholder="Search..." onChange={(event) => props.filterByText(event)}/>
            <br></br>
            <input type="checkbox" onChange={() => props.toggleFilterButton()}/> Only show products in stock.
       </div>
    )
}

export default SearchBar;