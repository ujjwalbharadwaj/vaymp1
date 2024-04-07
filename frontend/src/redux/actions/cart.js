 // add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  //console.log("llll",data)
  dispatch({
    type: "addToCart",
    payload:data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  //console.log("klj",getState().cart.cart)
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
//update to cart
export const updateTocart = (data) => async (dispatch, getState) => {
  console.log("updateTocart action",data)
  // const {id,selectedSize,count}=data
  // const p=getState().cart.cart.map((val)=>{

  // })
  dispatch({
    type: "updateToCart",
    payload:data,
  });

   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
   return data;
};



// addTocart action
// export const addTocart = (data) => async (dispatch, getState) => {
//   const { cart } = getState().cart;
//   const { stock, ...restData } = data;
//   const { size, qty } = restData; // Destructure size and qty from restData

//   // Check if the selected size already exists in the cart
//   const existingProduct = cart.find(
//     (item) => item._id === restData._id && item.size === size
//   );

//   if (existingProduct) {
//     // If the selected size already exists, update its quantity in the cart
//     const updatedCart = cart.map((item) =>
//       item._id === existingProduct._id && item.size === size
//         ? { ...item, quantity: item.quantity + qty }
//         : item
//     );

//     dispatch({
//       type: "updateCart",
//       payload: updatedCart,
//     });

//     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//   } else {
//     // If the selected size does not exist, create a new cart item
//     // Avoid changing the isSelected and quantity of other sizes
//     const updatedStock = stock.map((item) => {
//       if (item.size === size) {
//         return {
//           ...item,
//           quantity: item.quantity - qty,
//           isSelected: true
//         };
//       }
//       return item; // Do not modify other sizes
//     });

//     const cartItem = {
//       ...restData,
//       stock: updatedStock,
//       size: size,
//       qty: qty,
//       isSelected: true
//     };

//     dispatch({
//       type: "addToCart",
//       payload: [...cart, cartItem],
//     });

//     localStorage.setItem("cartItems", JSON.stringify([...cart, cartItem]));
//   }

//   return restData; // Return restData instead of cartItem
// };




// // remove from cart
// export const removeFromCart = (data,sizeChoosen) => async (dispatch, getState) => {
//   const { cart } = getState().cart;
//   const { stock, ...restData } = data;
//   // Check if the selected size already exists in the cart
//   const existingProduct = cart.find(
//     (item) => item._id === restData._id && item.size === sizeChoosen
//   );

//   console.log("removeFromCart--",existingProduct)
//   if (existingProduct) {
//     // Update isSelected to false for the selectedSize in item.stock
//     console.log("existingProduct.stock",existingProduct.stock)
//     let existPro=JSON.stringify(existingProduct)
//     let existParse=JSON.parse(existPro)
//     console.log("existParse",existParse)
//     const updatedStock = existParse.stock.map((item) =>{
//       //console.log("object",item)
//       let p12= item;
//       if(item.size == sizeChoosen){
//         console.log("lokdi")
//         p12= { ...item, isSelected: false };
//       }
//     //console.log("lkj",item.size,"lkj",item)
//      return p12
//   });
//    console.log("updatedStock",updatedStock)
//     // Update the existing product with the updated stock
//     const updatedProduct = { ...existingProduct, stock: updatedStock };
//     const p1=cart.map((item) =>
//     item._id === existingProduct._id && item.size === sizeChoosen
//       ? updatedProduct
//       : item
//   )
// console.log("updatedremove p1 ",p1)
//     // Dispatch action to update cart with the updated product
//     dispatch({
//       type: "updateCart",
//       payload: cart.map((item) =>
//         item._id === existingProduct._id && item.size === sizeChoosen
//           ? updatedProduct
//           : item
//       ),
//     });
//   }

//   dispatch({
//     type: "removeFromCart",
//     payload: {id:data._id,sizeC:sizeChoosen},
//   });
//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
//   return data;
// };





// addTocart action
// export const addTocart = (data) => async (dispatch, getState) => {
//   const { cart } = getState().cart;
//   const { stock, ...restData } = data;
//   const { size, qty } = restData; // Destructure size and qty from restData

//   // Check if the selected size already exists in the cart
//   const existingProduct = cart.find(
//     (item) => item._id === restData._id && item.size === size
//   );

//   if (existingProduct) {
//     // If the selected size already exists, update its quantity in the cart
//     const updatedCart = cart.map((item) =>
//       item._id === existingProduct._id && item.size === size
//         ? { ...item, quantity: item.quantity + qty }
//         : item
//     );

//     dispatch({
//       type: "updateCart",
//       payload: updatedCart,
//     });

//     localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//   } else {
//     // If the selected size does not exist, create a new cart item
//     // Avoid changing the isSelected and quantity of other sizes
//     const updatedStock = stock.map((item) => {
//       if (item.size === size) {
//         return {
//           ...item,
//           quantity: item.quantity - qty,
//           isSelected: true
//         };
//       }
//       return item; // Do not modify other sizes
//     });

//     const cartItem = {
//       ...restData,
//       stock: updatedStock,
//       size: size,
//       qty: qty,
//       isSelected: true
//     };

//     dispatch({
//       type: "addToCart",
//       payload: [...cart, cartItem],
//     });

//     localStorage.setItem("cartItems", JSON.stringify([...cart, cartItem]));
//   }

//   return restData; // Return restData instead of cartItem
// };




// // remove from cart
// export const removeFromCart = (data) => async (dispatch, getState) => {
//   dispatch({
//     type: "removeFromCart",
//     payload: data._id,
//   });
//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
//   return data;
// };