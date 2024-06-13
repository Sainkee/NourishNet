import SignUp from "./component/Auth/SignUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import Hero from "./component/Home/Hero";
import "swiper/css";
import "swiper/css/navigation";
import "react-toastify/dist/ReactToastify.css";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import ProfilePage from "./pages/ProfilePage";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Login from "./component/Auth/Login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          path: "/",
          element: <Hero />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },

        {
          path: "/category/:categoryName",
          element: <ProductCategoryPage />,
        },
        {
          path: "user",
          element: <ProfilePage />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
