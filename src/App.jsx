import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BookList from './pages/BookList.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Profile from './pages/Profile.jsx';

function App() {
	return (
		<BrowserRouter>
			<div>
				<h1>ShelfX Online Bookstore</h1>
				<nav>
					<Link to="/">Home</Link> |{' '}
					<Link to="/books">Books</Link> |{' '}
					<Link to="/cart">Cart</Link> |{' '}
					<Link to="/checkout">Checkout</Link> |{' '}
					<Link to="/profile">Profile</Link>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/books" element={<BookList />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
