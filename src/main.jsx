import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  Login,
  Singup,
  CreatePost,
  Post,
  EditPost,
  Profile,
  LandingPage,
} from "./index";
import PrivateRoute from "./components/PrivateRoutes";
import AuthLayout from "./components/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "home",
        element: (
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <Singup />
          </AuthLayout>
        ),
      },
      {
        path: "create-post",
        element: (
          <AuthLayout authentication={true}>
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          </AuthLayout>
        ),
      },
      {
        path: "profile",
        element: (
          <AuthLayout authentication={true}>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
