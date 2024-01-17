import LoginPanel from "./components/Login/Login";
import { Routes, Route, useParams } from "react-router-dom";  // Import useParams
import Register from "./components/Register/Register";
import Dealers from './components/Dealers/Dealers';
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/Dealers/PostReview";
import DealerSearchWrapper from "./components/Dealers/DealerSearchWrapper";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dealers" element={<Dealers />} />
      <Route
        path="/dealer/:id"
        element={
          <>
            <DealerSearchWrapper dealerId={useParams().id} /> {/* Render the DealerSearchWrapper component */}
            <Dealer />
          </>
        }
      />
      <Route path="/postreview/:id" element={<PostReview />} />
    </Routes>
  );
}

export default App;
