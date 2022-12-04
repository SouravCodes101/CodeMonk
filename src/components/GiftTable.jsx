import React from "react";
import StickImage from "../assets/Images/stick.png";
export default function GiftTable({ product }) {
  return (
    <tr className="font-bold bg-gray-50 w-full">
      <td className="pl-8 pb-1 pt-5 ">
        <div className="flex gap-8">
          <div className="bg-white">
            <img
              className="h-24 w-24 p-1 object-fit"
              src={StickImage}
              alt="prod"
            />
          </div>
          <div className=""> 
            <span className="bg-[#000] px-1 text-center text-white">Gift</span>
            <p className="opacity-60"> {product.gift.name} </p>
          </div>
        </div>
      </td>

      <td className=" font-bold  pl-8 pb-1 pt-5 opacity-60 ">
        {product.price}$
      </td>
      <td className="opacity-60 text-center pr-24">1</td>
    </tr>
  );
}
