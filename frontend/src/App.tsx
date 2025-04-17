import { Routes, Route } from "react-router-dom"
import { Toaster } from "./components/ui/toaster"
import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import HomePage from "./pages/home"
import BooksPage from "./components/books/browse-books"
import BookDetailPage from "./components/books/book-detail"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"
// import DashboardPage from "./pages/dashboard"
// import CheckoutPage from "./pages/checkout"
import CategoriesPage from "./pages/categories"
// import AboutPage from "./components/home/about"
import ContactPage from "./components/home/contact"
import NotFound from "./pages/NotFound"
// import CartPage from "./pages/cart"
import Headerv0 from "./components/layout/oldfiles/headerv0"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Headerv0 />} />

          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
          {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
          {/* <Route path="/categories" element={<CategoriesPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/* <Toaster /> */}
    </div>
  )
}

export default App
