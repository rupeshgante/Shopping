
window.addEventListener('DOMContentLoaded',(e)=>{
        axios.get('http://18.237.188.87:5000/orders')
        .then(res=>{
// console.log('response : '+JSON.stringify(res));
            if(res.request.status===200){
                const products=res.data.products;
                console.log('response   '+JSON.stringify(products));
                const parent=document.getElementById('orders-items');
                products.forEach(prod => {
                  const total_order = document.createElement('div');
                  total_order.setAttribute('class','total_order');
                  prod.forEach(product=>{

                    const order_item = document.createElement('div');
                    order_item.classList.add('order-row');
                    order_item.setAttribute('id',`in-order-${product.id}`);
                    // let total_order_price = document.querySelector('#total-value').innerText;
                    order_item.innerHTML = `
                            <span class='order-item order-column'>
                             <img class='order-img' src="${product.imageUrl}" alt="">
                             <span>${product.title}</span>
                               </span>
                                 <span class='order-price order-column'>${product.price}</span>
                                 <span class='order-date order-column'>${product.createdAt}</span>
                                   `
                    total_order.appendChild(order_item);
                });
parent.appendChild(total_order);
              })
            }
            }).catch(err=>console.log(err));
        })
        
        //  document.querySelector('#order').style = "display:none";
         // if (e.target.className='cancel'){
         // document.querySelector('#order').style = "display:none";
         // }
        //  console.log('orders: '+JSON.stringify(res));
        // }).catch(err=>console.log(err));
     
