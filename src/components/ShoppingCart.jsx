import React, { useState, useEffect, useRef } from "react";
import data from "../data/data.json";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import LocationIcon from "../assets/icon/LOCATION.png";
import checkIcon from "../assets/icon/check.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
export default function ShoppingCart() {
  const persistCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const [products, setProducts] = useState(data.products);
  const [pincodes, setPincodes] = useState(data.pincode);
  const [discount, setDiscount] = useState(data.discount);
  const inptRef = useRef(null);
  const [checkoutStatus, setCheckOutStatus] = useState({
    pinStatus: false,
    productStatus: false,
  });

  //cart data structure
  let cartInstance = {
    subtotal: 0,
    products: [], //array
    totalDiscount: {},
    standardShipping: "free",
    total: 0,
  };
  //--------------------

  if (localStorage.getItem("cart")) {
    cartInstance = JSON.parse(localStorage.getItem("cart"));
  }
  const [cart, setCart] = useState(cartInstance); //cart
  useEffect(() => {
    persistCart();
  }, [cart]);

  useEffect(() => {
    if (checkoutStatus.pinStatus != false) {
      let deliveryPrice = checkoutStatus.pinStatus.deliveryPrice;
      let previous =
        cart.standardShipping == "free" ? 0 : cart.standardShipping;
      setCart({
        ...cart,
        standardShipping: deliveryPrice ? deliveryPrice : "free",
        total: cart.total - previous + deliveryPrice,
      });
    } else {
      let previous = cart.standardShipping;
      if (previous != "free")
        setCart({
          ...cart,
          standardShipping: "free",
          total: cart.total - previous,
        });
    }
  }, [checkoutStatus.pinStatus]);

  console.log(cart);

  useEffect(() => {
    setCheckOutStatus({
      productStatus: cart.products.length > 0,
      pinStatus: checkoutStatus.pinStatus,
    });
  }, [cart.products.length]);
  return (
    <>
      <div className="flex md:flex-col md:items-start items-center gap-5 p-3 md:px-14  border-b-[2px] md:border-none"> 
        <div className="hidden md:flex justify-center w-full bg-indigo-300 p-2 text-white mb-5">
          Shop for $3000 or more and get 10% discount on your order
        </div>
        <span className="md:hidden">
          <ArrowLeftOutlined />{" "}
        </span>{" "}
        <h1 className="tracking-wider text-sm md:text-xl mt-1 font-bold md:font-normal">
          Shopping Cart
        </h1>
      </div>
      <div className="md:px-14 pl-3 pt-3 pr-3">
        <div className=" w-full md:bg-white  rounded-xl  ">
          <Desktop
            products={products}
            setCart={setCart}
            cart={cart}
            discount={discount}
          />
          <Mobile
            products={products}
            setCart={setCart}
            cart={cart}
            discount={discount}
          />

          <div className="flex flex-col items-center md:flex-row md:gap-3 w-full md:px-8 justify-between ">
            <div className="mt-16 border-[1px] md:border-none w-[340px]  rounded-md md:shadow-none shadow-sm p-2 ">
              <p className="mb-4">Delivery Availability</p>
              <div className="flex w-[100%] items-center justify-between md:w-[320px] border-b-2 ">
                <div className="flex">
                  <img src={LocationIcon} alt="" className="" />
                  <input
                    type="text"
                    ref={inptRef}
                    className="outline-none"
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log(pincodes[value]);
                      if (pincodes[value]) {
                        setCheckOutStatus({
                          pinStatus: pincodes[value],
                          productStatus: checkoutStatus.productStatus,
                        });
                      } else {
                        setCheckOutStatus({
                          ...checkoutStatus,
                          pinStatus: false,
                        });
                      }
                    }}
                  />
                </div>
                <p
                  onClick={() => {
                    inptRef.current.value = "";
                    setCheckOutStatus({ ...checkoutStatus, pinStatus: false });
                  }}
                  className="text-sm cursor-pointer text-blue-800 font-bold"
                >
                  CHANGE
                </p>
              </div>
              {checkoutStatus.pinStatus && (
                <div className="flex gap-5 w-[270px] flex-wrap">
                  {!checkoutStatus.pinStatus.deliveryPrice && (
                    <div className="flex text-sm">
                      <img src={checkIcon} alt="" />
                      <p>Free Delivery </p>
                    </div>
                  )}
                  {checkoutStatus.pinStatus.cashOnDelivery && (
                    <div className="flex text-sm">
                      <img src={checkIcon} alt="" />
                      <p>Cash on delivery </p>
                    </div>
                  )}
                  <div className="flex text-sm">
                    <img src={checkIcon} alt="" />
                    <p>
                      {" "}
                      Estimated delivery time{" "}
                      {checkoutStatus.pinStatus.estimatedDays.min +
                        "-" +
                        checkoutStatus.pinStatus.estimatedDays.max}{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5  w-[100%]   p-2 md:w-[400px] mt-10 ">
              <div className="flex flex-col gap-5 border-[1px] rounded-md shadow-sm md:border-none p-2">
                <h1 className="font-bold ">
                  Order Summary({cart.products.length + " items"})
                </h1>
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{cart.subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total Discount</p>
                  <p>
                    -
                    {Object.keys(cart.totalDiscount).reduce(
                      (accumulator, currentValue) =>
                        accumulator + cart.totalDiscount[currentValue],
                      0
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Standard Shipping</p>
                  <p>{cart.standardShipping}</p>
                </div>
                <div className="flex justify-between"> 
                   <p className="font-bold md:hidden">Grand Total</p>
                  <p className="hidden md:block">Order Total</p>
                  <p className="font-bold md:font-normal">{cart.total}</p>
                </div>
              </div>
              <div className="flex flex-col-reverse items-center gap-5 md:flex-row justify-between">
                <p className="text-sm text-indigo-900 font-bold">CONTINUE SHOPPING</p>
                <button
                  disabled={
                    !checkoutStatus.pinStatus || !checkoutStatus.productStatus
                  }
                  className={
                    !checkoutStatus.productStatus || !checkoutStatus.pinStatus
                      ? "px-5 py-2 bg-blue-800 text-white rounded-full opacity-40"
                      : "px-5 py-2 bg-blue-800 text-white rounded-full"
                  }
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
