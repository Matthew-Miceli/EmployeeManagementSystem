import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";

function App() {
  return (
    <>
      <HeaderComponent className="h-50" />
      <ListEmployeeComponent />
    </>
  );
}

export default App;
