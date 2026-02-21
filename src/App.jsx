import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BookList from './pages/BookList.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Profile from './pages/Profile.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';

function App() {
	return (
		<BrowserRouter>
					<div>
								<header style={{
									position: 'fixed',
									top: 0,
									left: 0,
									width: '100vw',
									zIndex: 100,
									display: 'flex',
									alignItems: 'center',
									background: 'linear-gradient(90deg, #1677FF 0%, #52C41A 100%)',
									color: 'white',
									padding: '16px 32px',
									boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
								}}>
										<span style={{
											fontSize: '2.5rem',
											fontWeight: 'bold',
											letterSpacing: '2px',
											color: '#fff',
											textShadow: '0 2px 8px rgba(0,0,0,0.15)',
											marginRight: '32px'
										}}>ShelfX</span>
							<nav style={{ fontSize: '1.1rem' }}>
								<Link to="/" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
								<Link to="/books" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Books</Link>
								<Link to="/cart" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Cart</Link>
								<Link to="/checkout" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Checkout</Link>
								<Link to="/profile" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Profile</Link>
								<Link to="/register" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
								<Link to="/login" style={{ color: 'white', marginRight: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
								<Link to="/logout" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Logout</Link>
							</nav>
						</header>
								<div style={{ marginTop: '80px' }}>
									<Routes>
										<Route path="/" element={<Home />} />
										<Route path="/books" element={<BookList />} />
										<Route path="/cart" element={<Cart />} />
										<Route path="/checkout" element={<Checkout />} />
										<Route path="/profile" element={<Profile />} />
										<Route path="/register" element={<Register />} />
										<Route path="/login" element={<Login />} />
										<Route path="/logout" element={<Logout />} />
									</Routes>
								</div>
					</div>
		</BrowserRouter>
	);
}

export default App;
