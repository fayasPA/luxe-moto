import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import React from "react";
import UsedVehicles from "./pages/UsedVehicles/UsedVehicles";
import About from "./pages/About/About";
import Calculator from "./pages/Calculator/Calculator";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="vehicles" >
          <Route path="" element={<UsedVehicles />} />
          {/* <Route path=":carId/*" element={<CarDetails />} /> */}
        </Route>
        {/* <Route path="sellcar" element={<SellCar />} /> */}
        {/* <Route path="showroom" element={<Showroom />} /> */}
        {/* <Route path="gallery" element={<Gallery />} /> */}
        {/* <Route path="insurance" element={<Insurance />} /> */}
        <Route path="emi-calculator" element={<Calculator />} />
        <Route path="about" element={<About />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
