import React from "react";
import CartItem from "./CartItem";
import GiftTable from "./GiftTable";

export default function Desktop({ products, discount, setCart, cart }) {
  return (
    <>
      <div className=" bg-white rounded-md hidden md:block">
        <table className="w-full ">
          <thead className="border-b-[1px] ">
            <tr className="">
              <th className="w-[48%] text-left opacity-60 pl-8 pb-1 pt-5">
                Product
              </th>
              <th className="w-[20%] text-left opacity-60 pl-8 pb-1 pt-5">
                Price
              </th>
              <th className="w-[20%] text-left opacity-60 pl-8 pb-1 pt-5">
                Quantity
              </th>
              <th className="w-[20%] text-left opacity-60 pl-8 pb-1 pt-5">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="">
            {products.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                discount={discount}
                setCart={setCart}
                cart={cart}
              />
            ))}
            {cart.products.map((p) => p.product?.gift && <GiftTable product={p.product} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
