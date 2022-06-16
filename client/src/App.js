import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import "./App.css";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/restaurants/:id/update' element={<UpdatePage />} />
            <Route path='/restaurants/:id' element={<RestaurantDetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
