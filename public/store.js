
window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`http://18.237.188.87:5000/products/1`).then(res=>{
         console.log(res);
        
        // console.log(data);
        if(res.request.status===200){
        const data=res.data.products;
        console.log('response   '+data);
        const parent=document.getElementById('product-content');
        data.forEach(product => {
            const productHtml=`
              <div id=${product.title}>
                <h3>${product.title}</h3>
                    <div class="image-container">
                        <img class="prod-images" src=${product.imageUrl} alt="">
                    </div>
                     <div class="prod-details">
                        <span>$<span>${product.price}</span></span>
                        <button onClick="addToCart(${product.id})" class="shop-item-button" type='button'>ADD TO CART</button>
                    </div>


             </div>
             </div>
        `
        parent.innerHTML +=productHtml;
        });
        
    }
    }).catch(err=>console.log(err));
})

const page=document.getElementById('pagination-button');
page.addEventListener('click',(e)=>{
    if(e.target.className=='pbutton'){
        const pageno=e.target.innerText;
        console.log('pageno:'+pageno);
        axios.get(`http://18.237.188.87:5000/products/${pageno}`).then(res=>{
            console.log(res);
           
           // console.log(data);
           if(res.request.status===200){
            const parent=document.getElementById('product-content');
            parent.innerHTML='';
           const data=res.data.products;
           console.log('response   '+data);
           
           data.forEach(product => {
               const productHtml=`
                 <div id=${product.title}>
                   <h3>${product.title}</h3>
                       <div class="image-container">
                           <img class="prod-images" src=${product.imageUrl} alt="">
                       </div>
                        <div class="prod-details">
                           <span>$<span>${product.price}</span></span>
                           <button onClick="addToCart(${product.id})" class="shop-item-button" type='button'>ADD TO CART</button>
                       </div>
   
   
                </div>
                </div>
           `
           parent.innerHTML +=productHtml;
           });
           
       }
       }).catch(err=>console.log(err));

    }
})


function addToCart(productId){

    axios.post('http://18.237.188.87:5000/cart',{productId:productId})
    .then(res=>{
        // console.log(res);
        if(res.status==200){
            notifyUser(res.data.message);
        }else{
            throw new Error();
        }
    })
    .catch(err=>{
        // console.log('this is error'+err);
    notifyUser(err.message);
})
}

function notifyUser(message){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500);
}


const parentContainer = document.getElementById('EcommerceContainer');
parentContainer.addEventListener('click',(e)=>{
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        axios.get('http://18.237.188.87:5000/cart')
          .then(res=>{
          const data=res.data.products;
          document.querySelector('.cart-number').innerText=res.data.products.length;
        //   console.log('cart data: '+res);
            showCart(data);
            document.querySelector('#cart').style = "display:block;"
          })
          .catch(err=>console.log(err));
        }
                        if (e.target.className=='cancel'){
                            document.querySelector('#cart').style = "display:none";
                            document.querySelector('.cart-items').innerHTML = '';

                            
                        }
                        if (e.target.className=='purchase-btn'){
                            if (document.querySelector('.cart-items').innerHTML=''){
                                alert('You have Nothing in Cart , Add some products to purchase !');
                                return
                            }
                            const total=document.querySelector('#total-value').innerText;

                            axios.post('http://18.237.188.87:5000/orders',{total:total})
                            .then(res=>{
                                console.log(JSON.stringify(res));
                            })
                            .catch(err=>console.log(err));
                }
                        
                    
                        if (e.target.className=='remove-btn'){
                            // let total_cart_price = document.querySelector('#total-value').innerText;
                            // total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
                            // document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
                            // document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`

                            const prodid=e.target.parentNode.parentNode.id;

                            axios.post('http://18.237.188.87:5000/delete', {id:prodid } )
                            .then(res=>{
                                console.log('delete erspose is :'+res);
                            })
                            .catch(err=>console.log(err));
                        
                            // console.log('productid : '+)
                            e.target.parentNode.parentNode.remove()
                        }
          
    
})

function showCart(data){
    if(    document.querySelector('#cart').style = "display:block;"){
        document.querySelector('.cart-items').innerHTML = '';
        document.querySelector('#total-value').innerText=0;
    }
const cart_items = document.querySelector('#cart .cart-items');
data.forEach(product=>{
    const cart_item = document.createElement('div');
    cart_item.classList.add('cart-row');
    cart_item.setAttribute('id',`${product.id}`);
    let total_cart_price = document.querySelector('#total-value').innerText;
    total_cart_price = parseFloat(total_cart_price) + parseFloat(product.price*product.cartItem.quantity)
    total_cart_price = total_cart_price.toFixed(2)
    document.querySelector('#total-value').innerText = `${total_cart_price}`;
    cart_item.innerHTML = `
            <span class='cart-item cart-column'>
             <img class='cart-img' src="${product.imageUrl}" alt="">
             <span>${product.title}</span>
               </span>
                 <span class='cart-price cart-column'>${product.price}</span>
                    <span class='cart-quantity cart-column'>
                        <input type="text" value=${product.cartItem.quantity}>
                           <button class="remove-btn" id="remove-btn" >REMOVE</button>
            </span>`
    cart_items.appendChild(cart_item);
})

}

