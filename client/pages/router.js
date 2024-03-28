import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./signin";
import SignUp from "./signup";
import HomeScreen from "./home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
