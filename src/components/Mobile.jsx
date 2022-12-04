import React, { useState } from "react";
import minusIcon from "../assets/icon/minus.png";
import plusIcon from "../assets/icon/plus.png";
import minusActive from "../assets/icon/minus-active.png";
import deleteIcon from "../assets/icon/DELETE.png";
import MobileItem from "./MobileItem";
export default function Mobile({ products, discount, setCart, cart }) {
  return (
    <div className="bg-slate-100 md:hidden flex flex-col  gap-2">
      {products.map((p) => (
        <MobileItem
          product={p}
          setCart={setCart}
          cart={cart}
          discount={discount}
        />
      ))}
    </div>
  );
}
