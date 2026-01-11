window.addEventListener("load",function(){

const cartIcon=document.getElementById("floatingCart");
const popup=document.getElementById("miniCartPopup");
const badge=document.getElementById("cartBadge");
const content=document.getElementById("miniCartContent");
const totalBox=document.getElementById("miniCartTotal");
const btn=document.getElementById("miniCheckoutBtn");

const checkoutURL="/checkout"; // CHANGE to your checkout page

function getCart(){
 return JSON.parse(localStorage.getItem("cart")||"[]");
}

function cartTotal(){
 return getCart().reduce((t,i)=>t+(i.price*i.qty),0);
}

function tax(){
 return localStorage.getItem("shippingMethod")==="ship"?cartTotal()*0.07:0;
}

function ship(){
 return localStorage.getItem("shippingMethod")==="ship"?8.99:0;
}

function grand(){
 return cartTotal()+tax()+ship();
}

function updateBadge(){
 let qty=0;
 getCart().forEach(i=>qty+=i.qty);
 badge.innerText=qty;
 badge.style.display=qty>0?"flex":"none";
}

function draw(){
 const cart=getCart();
 content.innerHTML="";
 if(cart.length===0){
  content.innerHTML="<p style='text-align:center;color:#777'>Cart is empty</p>";
  totalBox.innerText="0.00";
  return;
 }
 cart.forEach((i,x)=>{
  const row=document.createElement("div");
  row.style.display="flex";
  row.style.justifyContent="space-between";
  row.style.marginBottom="8px";
  row.innerHTML=`${i.name} x${i.qty} <b>$${(i.price*i.qty).toFixed(2)}</b>`;
  content.appendChild(row);
 });
 totalBox.innerText=grand().toFixed(2);
}

cartIcon.onclick=function(){
 popup.style.display=popup.style.display==="block"?"none":"block";
 draw();
};

btn.onclick=function(){
 window.location.href=checkoutURL;
};

setInterval(()=>{
 updateBadge();
 if(popup.style.display==="block") draw();
},500);

updateBadge();

});
