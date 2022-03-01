import React from "react";
import {productsCategory} from '../../API/index.js'
import ProductCard from "./product.js";
import './product-list.css';

class Products extends React.Component{

    state={
        category:this.props.category,
        products:[]
    }

    componentDidMount(){
        productsCategory(this.props.category)
        .then(res=>this.setState({products:res.data.category.products}))
    }
    render(){
        const {category} = this.state;   
        return(
            <div className="products-container">
                <h1 className="category-title">{category}</h1>
                <div className="products-list">
                    {this.state.products.map((p)=><ProductCard key={p.id} details={p} addToCart={this.props.addToCart} currency={this.props.currency} uniqueKeys={this.props.uniqueKeys} updateKey={this.props.updateKeys} />)}
                </div>
            </div>
        )
    }
}

export default Products