import { Route, BrowserRouter, Routes } from "react-router-dom";
import React from 'react'
import Header from "../components/Header";
import ProductScreen from "../container/ProductScreen";
import Footer from "../components/Footer";
import CartScreen from "../container/CartScreen";
import SignInScreen from "../container/SignInScreen";
import ShipinngAdressScreen from "../container/ShipinngAdressScreen";
import Payment from "../container/Payment";
import SignupScreen from "../container/SignupScreen";
import PlaceOrder from "../container/PlaceOrder";
import OrderScreen from "../container/OrderScreen";
import OrderHistory from "../container/OrderHistory";
import Profile from "../container/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../container/Dashboard";
import AdminRoute from "./AdminRoute";
import Layout from "../layout/Layout";
import ProductView from "../container/ProductView";
import AboutUs from "../container/AboutUs";
import NotFound from "../container/NotFound";
import Prueba from "../components/Prueba";
import Products from "../container/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/prueba' element={<Prueba />} />
          <Route exact path='/product/:slug' element={<ProductScreen />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/cart' element={<CartScreen />} />
          <Route exact path='/signin' element={<SignInScreen/>} />
          <Route exact path='/signup' element={<SignupScreen/>} />
          <Route exact path='/shipping' element={<ShipinngAdressScreen/>} />
          <Route exact path='/payment' element={<Payment/>} />
          <Route exact path='/placeorder' element={<PlaceOrder/>} />
          <Route path="*" element= {<NotFound />}/>
          <Route exact path='/order/:id' element={ <ProtectedRoute> <OrderScreen/> </ProtectedRoute>} />
          
          <Route exact path='/orderhistory' element={<ProtectedRoute> <OrderHistory/> </ProtectedRoute>} />
          <Route exact path='/profile' element={
            <ProtectedRoute> <Profile/> </ProtectedRoute>
          } />
          {/* admin route */}
          <Route exact path='/dashboard' element={<AdminRoute> <Dashboard/> </AdminRoute>}/>
          <Route exact path='/' element={<Layout />} />
          {/* navigate route */}
          <Route exact path='/product-view' element={<ProductView/> } />
          <Route exact path='/about-us' element={<AboutUs/> } /> </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
