import Header from "./Components/Header";
import UserManage from "./features/UserManage";
import Home from "./features/Home";
import "./styles/App.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserManage />} />
      </Routes>
    </div>
  );
}

export default App;
