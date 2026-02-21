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
						<header style={{
							display: 'flex',
							alignItems: 'center',
							background: 'linear-gradient(90deg, #1677FF 0%, #52C41A 100%)',
							color: 'white',
							padding: '16px 32px',
							marginBottom: '24px',
							boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
						}}>
							<span style={{
								fontSize: '2rem',
								fontWeight: 'bold',
								letterSpacing: '2px',
								background: 'linear-gradient(90deg, #52C41A 0%, #1677FF 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								marginRight: '32px'
							}}>ShelfX</span>
							<nav style={{ fontSize: '1.1rem' }}>
								<Link to="/" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
								<Link to="/books" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Books</Link>
								<Link to="/cart" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Cart</Link>
								<Link to="/checkout" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Checkout</Link>
								<Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Profile</Link>
							</nav>
						</header>
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
