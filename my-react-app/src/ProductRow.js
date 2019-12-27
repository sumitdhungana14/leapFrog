import React from 'react';

const ProductRow = props => {
    const {products} = props;
    const productRow = products.map((product, index) => {
    return (
        <div key={index}>
            <span>{product.name}</span> 
            <span>  </span>
            <span>{product.price}</span>
        </div>
    )
    })
    return (
        <div>
            {productRow}
        </div>
    )
}

export default ProductRow;