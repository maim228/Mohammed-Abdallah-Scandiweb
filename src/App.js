import React, {Component} from 'react';
import './App.css';
//Import React Router DOM to use them in our project
import { Routes, Route, Navigate } from 'react-router-dom'

//Import API functions from API file we created
import * as API from './API/index'

//Import Main Components in our project
import Header from './components/header';
import Products from './components/products-list';
import Product from './components/product-page';
import Cart from './components/cart';

class App extends Component {
  //Use Constructor to get updates from Child Components to our main component
  constructor(props) {
    super(props)
    this.updateCurrency = this.updateCurrency.bind(this);
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.updateKeys = this.updateKeys.bind(this)
  }

  //Main states that control all the project
  state = {
    categories:[],
    currencies:[],
    defaultPath:'',
    defaultCurrency:{},
    activeCurrency:{},
    cart:[],
    keys:[], 
    isLoading:true,
  }
  
  //Fetch basic data we need to start
  componentDidMount(){
    API.categories()
    .then(res=>{
      this.setState({categories:res})
      this.setState({defaultPath:res[0].name})
      this.setState({isLoading:false})
    });
    API.currencies()
    .then(res=>{
      this.setState({currencies:res})
      //to specific default currency to start with it
      this.setState({defaultCurrency:res[0]})
    });
  }
  
  //Functions we use to update our state on any action

  // switch currency
  updateCurrency(newCurrency,all){
    this.setState({activeCurrency:all.filter((c)=>c.label === newCurrency.label)[0]})
  }

  // increase number of spices for same product
  increaseCart(product){
    product[0].count++;
    this.setState({cart:[...this.state.cart]})
  }

  // add product to cart
  addToCart(product){
    //check if we have products with same ID  in our cart
    let checkRepeat = this.state.cart.filter((p)=> p.id === product.id)

    if(checkRepeat.length === 0){
      // if no, it will add product to cart 

      this.setState({cart:[...this.state.cart,product]})
    }else if(product.action === "add-more"){
      //if it just click on increase button it will pass the product to increase spices function

      checkRepeat = checkRepeat.find((p)=> p.unique === product.unique);
      this.increaseCart([checkRepeat])
    }else{
      //if product is in cart it will check attributes
      checkRepeat= checkRepeat.filter((s)=> JSON.stringify(s.selectedAttrs) === JSON.stringify(product.selectedAttrs))

      if(checkRepeat.length > 0){
        //if it same atrributes it will pass product to increase spices function 
        this.increaseCart(checkRepeat)
      }else{
        //if it with different attributes it will add it as new product
        this.setState({cart:[...this.state.cart,product]})
      }  
    }
    
  }

  //remove one spice of product in cart
  descreaseCart(product){
    product[0].count--;
    this.setState({cart:[...this.state.cart]})
  }

  //function to check the product and pass it to descrease function
  removeFromCart(product){
    let checkProduct = this.state.cart.filter((p)=> p.unique === product.id)
    this.descreaseCart(checkProduct)
  }

  //function to add the new unique key in our state to stop using it agin with another product
  updateKeys = (key)=>{
    this.setState({cart:[...this.state.keys,key]})
  }

  render(){
    const {categories, currencies, defaultPath, defaultCurrency, activeCurrency, cart, keys, isLoading} = this.state;
    // if it failed to fetch data from server won't show any thing 
    if(isLoading){
      return null
    }
    return (
      <div className="App">
        <Routes>
          {/* Redirect on load to first category */}
          <Route exact path="/" element={<Navigate to={defaultPath} />} />

          {/* Create Route (Page) for every category in our DB */}
          {categories.map((c)=>
          <Route key={c.name} path={c.name} element={
            <div>
              <Header 
              menuName={categories} 
              currencies={currencies} 
              cart={cart} 
              activeMenu={c.name} 
              increaseProduct={this.addToCart} 
              descreaseProduct={this.removeFromCart}
              currency={Object.keys(activeCurrency).length === 0?defaultCurrency:activeCurrency} 
              updateCurrency={this.updateCurrency} />

              <Products 
              key={c.name} 
              category={c.name} 
              addToCart={this.addToCart} 
              currency={Object.keys(activeCurrency).length === 0?defaultCurrency:activeCurrency} 
              updateCurrency={this.updateCurrency} 
              uniqueKeys = {keys}
              updateKeys={this.updateKeys}
              />
            </div>
          } />)}

          {/* Create Route (Page) for products (description page) */}
          <Route exact path='product/:id' element={
            <div>
              <Header 
              menuName={categories} 
              currencies={currencies} 
              cart={cart} 
              increaseProduct={this.addToCart} 
              descreaseProduct={this.removeFromCart}
              currency={Object.keys(activeCurrency).length === 0?defaultCurrency:activeCurrency} 
              updateCurrency={this.updateCurrency} />
              <Product 
              currency={Object.keys(activeCurrency).length === 0?defaultCurrency:activeCurrency} 
              addToCart={this.addToCart} 
              uniqueKeys = {keys}
              updateKeys={this.updateKeys}
              />
            </div>
          }></Route>

          {/* Create Route (Page) for cart */}
          <Route exact path='cart' element={
            <div>
              <Header 
              menuName={categories} 
              currencies={currencies} 
              cart={cart} 
              increaseProduct={this.addToCart} 
              descreaseProduct={this.removeFromCart}
              currency={Object.keys(activeCurrency).length === 0?defaultCurrency:activeCurrency} 
              updateCurrency={this.updateCurrency} />
              <Cart 
              currency={Object.keys(activeCurrency).length === 0?defaultCurrency:activeCurrency} 
              increase={this.addToCart} 
              descrease={this.removeFromCart}
              cart={this.state.cart}
              />
            </div>
          }></Route>
        </Routes>
      </div>
    )
  }
  
}

export default App;
