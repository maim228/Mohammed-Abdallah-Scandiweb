import React from "react";
import AttributesForm from './attributes-form'
import {productInfo} from '../../API/index.js'
import './product.css';

class Product extends React.Component{

    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
      }      

    state={
        product:{},
        activeImg:'',
        isLoading:true
    }

    componentDidMount(){
        let id = window.location.pathname.split('/').pop();
        //get product data
        productInfo(id)
        .then(res=>{
            this.setState({product:res.data.product})
            this.setState({isLoading:false})
        })
        
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        const el = this.contentRef.current;
        if(el){
            el.innerHTML = this.state.product.description
        }   
      }

    //handle choose gallery photo
    changeImg = (img)=>{
        this.setState({activeImg:img})
    }

    //generate very unique key for each product because we might add same product to cart but with different attributes
    generateKey = ()=>{
        let key = Math.random();
        while(this.props.uniqueKeys.includes(key)){
            key = Math.random();
        }
        this.props.updateKeys(key)
        return key;
    }

    //hande add to cart button click
    handleSubmit = (e)=>{
        e.preventDefault();
        const formInputs = Array.from(e.target.querySelectorAll("input[type=radio]:checked"));
        const attrs = formInputs.map((r)=>{return({"id":r.className,"value":r.value,"name":r.name})});
        const {id,name,prices,gallery,brand,attributes} = this.state.product;
        if(attributes.length > attrs.length){
            alert("You must choose all attributes for this product");
        }else{
            this.props.addToCart({unique:this.generateKey(),id,name,prices,gallery,brand,attributes,selectedAttrs:attrs, count:1});
        }
    }
    render(){
        //it might take longer time to load if user visit product directly not from other page in our store
        if(this.state.isLoading || Object.keys(this.props.currency).length === 0){
            return null
        }
        const {name,attributes,gallery,brand,prices,inStock} = this.state.product
        const {activeImg} = this.state;
        const dynamicPrice = prices.filter((p)=>p.currency.label === this.props.currency.label)[0]

        return(
            <div className='product'>
                <div className="gallery">
                    {gallery.map((p)=>
                    <button key={p} onClick={()=>this.changeImg(p)}>
                        <img src={p} alt ='product' />
                    </button>)}
                </div>
                <div className="active"><img src={activeImg.length>0?activeImg:gallery[0]} alt='product' /></div>
                <div className="product-info">
                    <h1 className="brand">{brand}</h1>
                    <h1>{name}</h1>
                    <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                        {attributes.map((a)=>
                        <div key={a.id}>
                            <h3>{a.name}</h3>
                            <AttributesForm items={a.items} id={a.id} name={a.name} type={a.type} />
                        </div>)}
                        <h2>Price:
                            <br />
                            {dynamicPrice.currency.symbol} {dynamicPrice.amount}
                        </h2>
                        {inStock?<button type="submit" className="submit-form">ADD TO CART</button>:<div className="submit-form">OUT OF STOCK</div>}
                    </form>
                    <div ref={this.contentRef} className="description-container"></div>
                </div>
            </div>
        )
    }
}

export default Product