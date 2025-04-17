import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Login from '@pages/login';
import Register from '@pages/register';
import Cart from './pages/cart';
import Dashboard from './pages/dashboard';
import Books from "@components/books/browse-books";
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from "./components/ui/toaster"
import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import HomePage from "./pages/home"
import BooksPage from "./components/books/browse-books"
import BookDetailPage from "./components/books/book-detail"
import CategoriesPage from "./pages/categories"
import ContactPage from "./components/home/contact"
import NotFound from "./pages/NotFound"
import Headerv0 from "./components/layout/oldfiles/headerv0"
import DashboardPage from './pages/dashboard';
import AboutPage from './components/home/about';
import CheckoutPage from './pages/checkout';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/test" element={<Headerv0 />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/about" element={<AboutPage />} />

              <Route
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
