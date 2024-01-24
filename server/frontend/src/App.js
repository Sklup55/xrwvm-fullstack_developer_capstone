import LoginPanel from "./components/Login/Login";
import { Routes, Route, useParams } from "react-router-dom";  // Import useParams
import Register from "./components/Register/Register";
import Dealers from './components/Dealers/Dealers';
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/Dealers/PostReview";
import SearchCars from "./components/Dealers/SearchCars";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dealers" element={<Dealers />} />
      <Route path="/dealer/:id" element={<Dealer/>} />
      <Route path="/searchcars/:id" element={<SearchCars />} />
      <Route path="/postreview/:id" element={<PostReview />} />
    </Routes>
  );
}

export default App;