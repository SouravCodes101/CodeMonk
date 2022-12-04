import React, { useState } from "react";
import minusIcon from "../assets/icon/minus.png";
import plusIcon from "../assets/icon/plus.png";
import minusActive from "../assets/icon/minus-active.png";
import deleteIcon from "../assets/icon/DELETE.png";
export default function MobileItem({ product, discount, setCart, cart }) {
  const persistedProd = cart.products.find((p) => product.id == p.product.id); //undefined or that item in cart
  let InitialQuantity = persistedProd ? persistedProd?.quantity : 0;
  const [quantity, setQuantity] = useState(InitialQuantity);
  let initialSub =
    cart.products.length !== 0
      ? persistedProd
        ? persistedProd.quantity * product.price -
          cart.totalDiscount[product.id]
        : 0
      : 0;
  const [subtotal, setSubtotal] = useState(initialSub);

  const increment = () => {
    let updatedQuantity = quantity + 1;
    let totalAmt = updatedQuantity * parseInt(product.price);
    let discountAmnt = 0;
    if (totalAmt > discount.minTotal) {
      discountAmnt = parseInt(totalAmt * (discount.discountPercentage / 100));
    }
    setQuantity(updatedQuantity);
    setSubtotal(totalAmt - discountAmnt);
    setCart({
      ...cart,
      subtotal: cart.subtotal - subtotal + (totalAmt - discountAmnt),
      products:
        cart.products.length > 0 &&
        cart.products.find((p) => p.product.id == product.id)
          ? cart.products.map((p) =>
              p.product.id == product.id
                ? { ...p, quantity: p.quantity + 1 }
                : p
            )
          : [...cart.products, { product, quantity: 1 }],
      totalDiscount: Object.assign(cart.totalDiscount, {
        [product.id]: discountAmnt,
      }),
      total: cart.total - subtotal + (totalAmt - discountAmnt),
    });
  };
  const decrement = () => {
    let updatedQuantity = quantity - 1;
    let total = updatedQuantity * parseInt(product.price);
    let discountAmnt = 0;

    if (total > discount.minTotal) {
      discountAmnt = parseInt(total * (discount.discountPercentage / 100));
    }
    let existingProducts = JSON.parse(JSON.stringify(cart.products));
    existingProducts =
      updatedQuantity == 0
        ? existingProducts.filter((c) => c.product.id !== product.id)
        : existingProducts.map((p) =>
            p.product.id == product.id ? { ...p, quantity: p.quantity - 1 } : p
          );
    setCart({
      ...cart,
      subtotal: cart.subtotal - subtotal + (total - discountAmnt),
      products: existingProducts,
      totalDiscount: Object.assign(cart.totalDiscount, {
        [product.id]: discountAmnt,
      }),
      standardShipping:
        existingProducts.length == 0 ? "free" : cart.standardShipping,
      total:
        cart.total -
        subtotal +
        (total - discountAmnt) -
        (cart.standardShipping != "free" ? cart.standardShipping : 0),
    });
    setSubtotal(total - discountAmnt);
    setQuantity(updatedQuantity);
  };

  const clearEntire = () => {
    let curSubtotal = subtotal;
    console.log(curSubtotal);
    let existingProducts = JSON.parse(JSON.stringify(cart.products));
    existingProducts = existingProducts.filter(
      (p) => p.product.id !== product.id
    );
    setCart({
      ...cart,
      subtotal: cart.subtotal - curSubtotal,
      products: existingProducts,
      standardShipping:
        existingProducts.length == 0 ? "free" : cart.standardShipping,
      totalDiscount: Object.assign(cart.totalDiscount, { [product.id]: 0 }),
      total:
        cart.total -
        curSubtotal -
        (cart.standardShipping != "free" ? cart.standardShipping : 0),
    });
    setSubtotal(0);
    setQuantity(0);
  };
  return (
    <div className="flex p-4 gap-2 items-center">
      <img src={product.imageUrl} alt="" srcset="" />
      <div>
        {product?.tagline ? (
          <span className="bg-[#211c5f] rounded-sm text-white p-1">
            {product.tagline}
          </span>
        ) : (
          <></>
        )}
        <p className="opacity-60"> {product.name} </p>
        <div className="flex gap-2">
          <p className="opacity-60"> {product.desc} </p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="font-bold opacity-60">{product.price} $</p>
          <div className="flex gap-1">
            <button disabled={!quantity} onClick={decrement}>
              {" "}
              {!quantity ? (
                <img src={minusIcon} />
              ) : (
                <img src={minusActive} />
              )}{" "}
            </button>
            <button className="border-[2px] p-1">{quantity}</button>
            <button onClick={increment}>
              <img src={plusIcon} alt="" srcset="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
