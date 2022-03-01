// To make it easy to change Server url 
const api_url = process.env.REACT_APP_API_URL
const headers = {
    'Content-Type': 'application/json'
}

export const categories = ()=>
    fetch(`${api_url}`,{
        method:"POST",
        headers: headers,
        body: JSON.stringify({query:"{categories {\nname\n}\n}"})
    })
    .then(res=>res.json())
    .then(response=>response.data.categories)


export const productsCategory = (title)=>
    fetch(`${api_url}`,{
        method:"POST",
        headers: headers,
        body: JSON.stringify({query:`{category(input:{title:"${title}"}){\nproducts{\n  id\n  name\n  inStock\n brand\n  gallery\n  prices{\n    amount\n    currency{\n      label\n      symbol\n    }\n  }\n  attributes{\n    id\n    name\n    type\n    items{\n      id\n      value\n      displayValue\n    }\n  }\n  \n}\n}\n}`})
    })
    .then(res=>res.json())
    .then(response=>response)


export const productInfo = (id)=>
    fetch(`${api_url}`,{
        method:"POST",
        headers: headers,
        body: JSON.stringify({query:`{product(id:"${id}"){\n  id\n  name\n  inStock\n  gallery\n  description\n  brand\n  prices{\n    currency{\n      label\n      symbol\n    }\n    amount\n  }\n  attributes{\n    id\n    name\n    type\n    items{\n      id\n      value\n      displayValue\n    }\n  }\n  \n}\n}`})
    })
    .then(res=>res.json())
    .then(response=>response)

export const currencies = ()=>
    fetch(`${api_url}`,{
        method:"POST",
        headers: headers,
        body: JSON.stringify({query:"{currencies{\n  label\n  symbol\n}\n}"})
    })
    .then(res=>res.json())
    .then(response=>response.data.currencies)
