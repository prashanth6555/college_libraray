import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { useLibrary } from "./context/LibraryContext";
import BookDetails from "./pages/BookDetails";
import Catalog from "./pages/Catalog";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Rules from "./pages/Rules";
import Services from "./pages/Services";

function Protected({ children }) {
  const { user } = useLibrary();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="books/:id" element={<BookDetails />} />
        <Route path="services" element={<Services />} />
        <Route path="rules" element={<Rules />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
