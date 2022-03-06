import React from "react";

class AttributesForm extends React.Component{
    render(){
        const {items,id,name,type} = this.props
        return(
            <ul className={`attribute-list ${type === 'text'? 'text-attribute':'switch-attribute'}`}>
                {items.map((i)=>
                <li key={i.id}>
                    <input
                     type='radio' 
                     value={i.value} 
                     name={id} 
                     className={i.id}  
                     id={`${name}${i.value}`} />
                     
                    <label 
                    htmlFor={`${name}${i.value}`} 
                    style={{backgroundColor:`${type === 'text'? '':i.id}`}}> 
                        {type === 'text'? i.value :''}
                    </label>
                </li>
                )}
            </ul>
        )
    }
}

export default AttributesForm