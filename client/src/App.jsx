import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import AdminHome from "./pages/AdminHome";
import Adminviewer from "./pages/Adminviewer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/User/:id" element={<UserHome />} />
          <Route path="/Admin/:id" element={<AdminHome />} />
          <Route path="/Adminviewer/:id" element={<Adminviewer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
