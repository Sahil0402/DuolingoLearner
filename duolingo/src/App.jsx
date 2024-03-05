import Layout from "./components/Layout";
import Allwords from "./components/Allwords";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Addwords from "./components/Addwords";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="addwords" element={<Addwords />} />
      <Route path="allwords" element={<Allwords name={"Sahil"} />} />
      {/* <Route path='test' element={<Home />} /> */}
      <Route path="aboutus" element={<Aboutus />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
