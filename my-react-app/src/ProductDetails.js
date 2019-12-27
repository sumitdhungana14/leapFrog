import React from 'react';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

const ProductDetails = props => {
const products = [];

props.products.forEach(product => {
    if(product.category === props.category){
        products.push(product);
    }
});

return (
    <div>
        <ProductCategoryRow category={props.category} />
        <ProductRow products={products} />
    </div>
)


}

export default ProductDetails;