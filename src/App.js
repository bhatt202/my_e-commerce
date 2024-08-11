import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import UserSignup from './Auth/UserSignup';
import Login from './Auth/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SareeCollection from './components/Product/SareeCollection';
import MensCollection from './components/Product/MensCollection';
import KidsCollection from './components/Product/KidsCollection';
import SingleProduct from './components/Product/SingleProduct';
import Cart from './components/Product/Cart';
import Wishlist from './components/Product/Wishlist'
import CheckOut from './components/Checkout/checkout';
import Sucess from './components/Sucess/Sucess';
import Cancel from './components/Cancel/Cancel';
import Payment from './components/Payment/Payment';
import Profile from './components/Profile/profile';
import ReletedProduct from './components/Product/ReletedProduct';

const WrapperComponent=({children})=><>{children}<ToastContainer position="top-center"  autoClose={4000} draggable={false} /></>

function App() {
  console.log('------- env', process.env.REACT_APP_API_URL)
  return (
   <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<WrapperComponent><Home/></WrapperComponent>} />
      <Route path='/signup' element={<WrapperComponent><UserSignup/></WrapperComponent>} />
      <Route path='/Login' element={<WrapperComponent><Login/></WrapperComponent>} />
      <Route path='/SareeProduct' element={<WrapperComponent><SareeCollection/></WrapperComponent>} />
      <Route path='/MensProduct' element={<WrapperComponent><MensCollection/></WrapperComponent>} />
      <Route path='/kidsProduct' element={<WrapperComponent><KidsCollection/></WrapperComponent>} />
      <Route path='/SingleProduct/:id' element={<WrapperComponent><SingleProduct/></WrapperComponent>} />
      <Route path="/related/:id" element={<ReletedProduct/>} />
      <Route path='/Cart' element={<WrapperComponent><Cart/></WrapperComponent>} />
      <Route path='/wishlist' element={<WrapperComponent><Wishlist/></WrapperComponent>} />
      <Route path='/checkout' element={<WrapperComponent><CheckOut/></WrapperComponent>} />
      <Route path='/sucess' element={<WrapperComponent><Sucess/></WrapperComponent>} />
      <Route path='/cancel' element={<WrapperComponent><Cancel/></WrapperComponent>} />
      <Route path='/payment' element={<WrapperComponent><Payment/></WrapperComponent>} />
      <Route path='/profile' element={<WrapperComponent><Profile/></WrapperComponent>} />
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
