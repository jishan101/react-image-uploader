import {
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import ImageUploader from "./components/image-uploader/image-uploader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard"} replace />,
    // children: [
    //   {
    //     path: "dashboard",
    //     element: <Link to={"/"}>Home</Link>,
    //     loader: teamLoader,
    //   },
    // ],
  },
  {
    path: "dashboard",
    element: <Link to={"/uploader"}>Uploader</Link>,
  },
  {
    path: "uploader",
    element: <ImageUploader />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
