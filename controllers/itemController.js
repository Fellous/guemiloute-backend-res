import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faList,
  faPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "./assets/styles/App.css";
import CreateItem from "./components/CreateItem";
import ItemList from "./components/ItemList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserManagement from "./components/UserManagement";
import { make as RescriptApp } from "./App.bs";
import { make as UserForm } from "./components/rescript/UserForm.bs";
import { make as HomePage } from "./components/rescript/HomePage.bs";
import ItemDetail from "./components/ItemDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  return (
    <Router>
      <div className="app-container">
        <div className="animated-background">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <header className="App-header">
          <nav className="navbar">
            <Link to="/" className="logo">
              Guemiloute
            </Link>
            {isLoggedIn ? (
              <div className="nav-links">
                <Link to="/items" className="nav-link">
                  <FontAwesomeIcon icon={faList} /> Liste des objets
                </Link>
                <Link to="/create-item" className="nav-link">
                  <FontAwesomeIcon icon={faPlus} /> Créer un objet
                </Link>
                <Link to="/user-management" className="nav-link">
                  <FontAwesomeIcon icon={faUsers} /> Gestion des utilisateurs
                </Link>
                <button
                  onClick={handleLogout}
                  className="logout-button nav-link"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
                </button>
              </div>
            ) : (
              <div className="nav-links">
                <Link to="/login" className="nav-link">
                  Connexion
                </Link>
                <Link to="/signup" className="nav-link">
                  Inscription
                </Link>
              </div>
            )}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/create-item" element={<CreateItem />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/item/:title" element={<ItemDetail />} />
          <Route path="/rescript-app" element={<RescriptApp />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
}

export default App;
