import { Route, Routes } from "react-router-dom";

// App Components
import Header from "./components/Header";
import Courses from "./components/Courses";

function App() {

  return (
    <div>
      <Header />
      <Courses />
      {/* <Routes>

      </Routes> */}
    </div>
  );
}

export default App;