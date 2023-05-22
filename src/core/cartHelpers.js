export const addItem = (item, next) => {
  if (typeof window !== "undefined") {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1,
    });
    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
        return cart.find(p => p._id === id);
    });
    
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const totalItems=()=>{
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart")).length;
        }
        return 0;
    }
};
export const cartItems=()=>{
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart"));
        }
        return [];
    }
};
export const updateQuantity=(productId,quantity)=>{
  if (typeof window !== "undefined") {
    let cart=[]
      if (localStorage.getItem("cart")) {
      cart= JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((p,i)=>{
        if(p._id===productId){
          cart[i].count=quantity;
        }
      })
      localStorage.setItem('cart',JSON.stringify(cart))
  }
};
export const removeProduct=(productId)=>{
 
  if (typeof window !== "undefined") {
    let cart=[]
      if (localStorage.getItem("cart")) {
      cart= JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((p,i)=>{
        if(p._id===productId){
          cart.splice(i,1)
        }
      })
      localStorage.setItem('cart',JSON.stringify(cart))
  }
};

export const emptyCart=(next)=>{
  if (typeof window !== "undefined"){
    localStorage.removeItem('cart')
    next()
  }
}
