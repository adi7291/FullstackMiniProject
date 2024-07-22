const App =()=>{

   const [product,setProduct]=React.useState([]);

   const [form,setForm]=React.useState({
    name:'',
    price:'',
   })

//    console.log('product of app',product)

   React.useEffect(()=>{
         fetchProduct()
   },[])

   function fetchProduct(){
    fetch('/api/products')
      .then((res)=>{
        console.log(res)
       return res.json();
      })
      .then((data)=>{
        // console.log("data from fetch")
        // console.log(data)
        setProduct(data)
      })
   }
// implementing with form  logics

const handleSubmit=(event)=>{
    event.preventDefault();  
    console.log(form)
   //if we don't have any of the field we will not submit the form  
   if( !form.name || !form.price){
      return;
   }
   //all field are filled the we do fetch post api call.

   fetch('/api/products',{
    method:'POST',
    header:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(form),
   })
   .then(res=>{
    if(!res.ok){
        throw new error('Network response is not on'+ res.statusText)
    }
    return res.json();
   })
   .then(data=>{
    console.log("success",data)
   })

}

// handling the change in the input field and update the state at the same time. 
const handleChange=(event,field)=>{
    if(field==='name'){
        console.log("ram")
        setForm({
            ...form,
            name:event.target.value
        })
    }
    if(field==='price'){
        setForm({
            ...form,
            price:event.target.value
        })
    }
   
}
return (
        <>
           <div className="card">
                <div className="card-header">
                    Product Details
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <input type='text' className="form-control mb-3" placeholder="Product name..." value={form.name} onChange={(event)=>handleChange(event,'name')}/>
                    <input type='text' className="form-control mb-3" placeholder="Product price..." value={form.detail} onChange={(event)=>handleChange(event,'price')}/>
                    <button type='submit' className="btn btn-primary">Submit</button>
                  </form>
                </div>
            </div>
           <ul className="list-group mt-3">

            {product.map(item=> {
                return (
                <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-between w-50" >
                        <span><strong>{item.name}: </strong></span>
                        <span>${item.price}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                </li>
                )
            })}
            
            
         </ul>
    </>
    )
}

ReactDOM.render(<App/>,document.getElementById('app'));