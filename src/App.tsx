import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import ImageUploader from "./components/image-uploader/image-uploader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/uploader"} replace />,
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
