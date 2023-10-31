import React from "react";
import { BrowserRouter, Route, Routes, Link, useParams } from "react-router-dom"; // Import useParams
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} /> {/* Add route parameter */}
          {/* Add other routes as needed */}
        </Routes>

        <AuthDetails />
      </BrowserRouter>
    </div>
  );
}

export default App;
