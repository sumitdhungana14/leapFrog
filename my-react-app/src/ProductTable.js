import React from 'react';
import ProductDetails from './ProductDetails.js';

const ProductTable = props => {
    const categories = [];
    props.products.forEach(product => {
        if(categories.length === 0){
            categories.push(product.category);
        }
        else{
            if(!categories.includes(product.category)){
                categories.push(product.category);
            }
        }
    })

    const ProductDetail = categories.map((category, index) => 
         <ProductDetails category = {category} products={props.products} key={index}/>
    )

    return(
       <div>
           {ProductDetail}
       </div>
      )
}


export default ProductTable;