import React from 'react';

import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

class FilterableProductTable extends  React.Component {
    constructor(props){
        super(props);

        this.state = {
            searchText: '',
            filterButton: false,
            products: [
                {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
                {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
                {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
                {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
                {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
                {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"},
                {category: "Weapon", price: "$999.99", stocked: false, name: "AK47"},
                {category: "Weapon", price: "$1299.99", stocked: false, name: "Fantom"},

              ],
        }
        
        this.productsClone = this.state.products.slice();

        this.toggleFilterButton = this.toggleFilterButton.bind(this);
        this.filterByText = this.filterByText.bind(this);
       
    }

    toggleFilterButton(){
        this.setState(function(state){
            if(state.filterButton){
                return {
                    filterButton: false
                }
            }else{
                return {
                    filterButton: true
                }
            }
        })
    }

    filterByText(event){
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })

        
    }

    filterProducts(){
        this.productsClone = this.state.products.filter(product => {
            return product.stocked !== false
        })
    }

    render(){
        if(!this.state.filterButton){
            if(!this.state.searchText){
                this.productsClone = this.state.products.slice();
            
            }else{
                this.productsClone = this.state.products.filter(product => {
                    return product.name.slice(0, this.state.searchText.length) === this.state.searchText;
                })
            }
        }else{
            if(!this.state.searchText)  this.filterProducts();
            else{
                this.productsClone = this.productsClone.filter(product => {
                             return product.name.slice(0, this.state.searchText.length) === this.state.searchText;
                        })
            }
        }


        return ( 
        <div className="productTable">
            <SearchBar  value={this.state.searchText} toggleFilterButton = {this.toggleFilterButton} filterByText={this.filterByText}/>
            <ProductTable products={this.productsClone} />
        </div>
        )}
}

export default FilterableProductTable;