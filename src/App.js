import "./styles/App.scss";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App-container">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
