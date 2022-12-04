import { useState } from "react";
import Navbar from "./components/Navbar";
import ShoppingCart from "./components/ShoppingCart";
//yo yo
function App() {
  return (
    <div className="md:bg-slate-100 ">
      <Navbar />
      <div className="hidden px-[30vw] md:flex shadow-sm items-start  py-5 bg-white relative">
        <div className="flex flex-col z-10 items-center">
          <div className="h-4 w-4 rounded-full flex relative border-2 items-center border-black  ">
            <div className="h-2 w-2 bg-black rounded-full absolute left-[1.6px] top-[2px]"></div>
          </div>
          <p className="text-[10px]">SHOPPING CART</p>
        </div>
        <div className="w-[15vw] h-[1.5px] bg-black absolute left-[33.5vw] top-7  "></div>
        <div className=" opacity-20 flex flex-col absolute z-10 left-[46.7vw] items-center">
          <div className="h-4 w-4 rounded-full flex relative border-2 items-center border-black  ">
            <div className="h-2 w-2 bg-black rounded-full absolute left-[1.6px] top-[2px]"></div>
          </div>
          <p className="text-[10px]">ORDER DETAILS</p>
        </div>  
        <div className="w-[15vw] h-[1.5px] opacity-20 bg-black absolute left-[50vw] top-7  "></div> 
        <div className=" opacity-20 flex flex-col absolute z-10 left-[63.2vw] items-center">
          <div className="h-4 w-4 rounded-full flex relative border-2 items-center border-black  ">
            <div className="h-2 w-2 bg-black rounded-full absolute left-[1.6px] top-[2px]"></div>
          </div>
          <p className="text-[10px]">MAKE PAYMENT</p>
        </div> 
      </div>
      <div className="">
        <ShoppingCart />
      </div>
    </div>
  );
}

export default App;
