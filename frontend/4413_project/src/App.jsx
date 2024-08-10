import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import Cart from './Cart.jsx'
import Item from './Item.jsx'
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import Profile from './Profile.jsx'
import Checkout from './Checkout.jsx'


function App() {
  return (
    <Router>
      <Navbar />
      <div className="route">
        <Routes >
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>

    </Router>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App
