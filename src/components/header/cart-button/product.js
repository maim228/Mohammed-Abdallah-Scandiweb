import React from "react";
import "./cart-button.css";
import Attributes from "./attributes";

class Product extends React.Component{
    render(){
        let {product,increase,descrease,currency} = this.props;
        const dynamicPrice = product.prices.filter((p)=>p.currency.label === currency.label)[0]
        return(   
                <div className='item-mini-cart'>
                    <div className="item-mini-cart-grid" >
                        <div className="item-mini-cart-info">
                            <div>
                                {product.brand} 
                                <br /> {product.name} 
                                <br /> {dynamicPrice.currency.symbol}{dynamicPrice.amount}
                                <br />
                                {/* Show attributes in cart for every product */}  
                                    <Attributes 
                                    attributes={product.attributes} 
                                    selected={product.selectedAttrs} />
                            </div>
                        <div className="item-mini-cart-count">
                            <button onClick={()=>{descrease({id:product.unique})}}>
                                -
                            </button>
                            <div>{product.count}</div>

                            <button onClick={()=>{
                            increase({
                            "id":product.id,
                            "action":"add-more",
                            "unique":product.unique
                            })
                            }}>
                                +
                            </button>
                        </div>
                        </div>
                        <div className="image-mini-cart">
                            <img src={product.gallery[0]} alt={product.name} width='100%' />
                        </div>
                        <button className="remove-btn" onClick={()=>{
                            descrease({id:product.unique,action:'remove'})
                        }}>X</button>
                    </div>
                </div>
        )
    }
}

export default Product