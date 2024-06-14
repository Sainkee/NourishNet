import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemsCard from "../component/CartItemsCard";

import { resetCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cart);
  console.log(cartItems, " cartItems");
  const navigate = useNavigate();

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please Login First", {
        position: "bottom-right",
        theme: "colored",
      });
      navigate("/login");
      return;
    }
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?", {
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }

    const options = {
      key: "rzp_test_d6c3GOjzsdGdZC", // Replace with your Razorpay key ID
      amount: total * 100, // Razorpay requires the amount in paise (smallest currency unit)
      currency: "INR",
      name: "EatsExpress",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      handler: (response) => {
        dispatch(resetCart());
        navigate("/");
        toast.success("Payment Successful!", {
          position: "bottom-right",
          theme: "colored",
        });
        console.log(response);
      },
      prefill: {
        name: user ? user.DisplayName : "",
        email: user ? user.Email : "",
        contact: "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTax = (subtotal) => {
    const taxRate = 0.08; // 8% tax rate
    return subtotal * taxRate;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const total = subtotal + tax;

  return (
    <div className="mx-auto p-4 h-[100dvh] md:h-[70dvh] sm:flex-row justify-center mt-10 flex flex-col gap-6">
      {/* Cart Items Section */}
      <div className="bg-white  p-4 md:max-h-[60dvh]   h-[80dvh] overflow-y-scroll cursor-pointer  grow shadow-lg rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <CartItemsCard key={crypto.randomUUID()} item={item} />
            ))}
          </ul>
        )}
      </div>

      {/* Total Cost Section */}
      <div className="bg-white p-6 h-fit shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold mb-4">Total Cost</h2>
        <div className="mb-2">
          <p className="text-gray-600">
            Subtotal:{" "}
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </p>
        </div>
        <div className="mb-2">
          <p className="text-gray-600">
            Tax: <span className="font-semibold">${tax.toFixed(2)}</span>
          </p>
        </div>
        <div className="border-t pt-2">
          <p className="text-lg font-bold">
            Total: <span className="text-orange-500">${total.toFixed(2)}</span>
          </p>
        </div>
        <div className="border-t pt-2">
          <p className="text-lg font-bold">
            Items: <span className="text-orange-500">{cartItems.length}</span>
          </p>
        </div>
        <button
          disabled={total == 0}
          onClick={handlePayment}
          className="mt-4 w-full whitespace-nowrap disabled:bg-slate-600 disabled:cursor-not-allowed bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
