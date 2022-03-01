import React from "react";
import Product from "./product";

class Cart extends React.Component{
    render(){
        const{increase,decrease,cart,currency}= this.props;
        return(
            <div className="cartContainer">
                <h1>CART</h1>
                {cart.length===0?
                <h2>No products here try to add some products and try again</h2>
                :cart.map((p)=>
                <Product key={p.unique} currency={currency} product={p} increase={increase} decrease={decrease} />
                )}
            </div>
        )
    }
}

export default Cart