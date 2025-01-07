import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AccountProvider} from "./Components/AccountIdProvider";
import APICaller from "./Components/APICaller";
import LandingPage from "./Components/LandingPage";
import AccountPage from "./Components/AccountPage";

const App = () => {
  return (
    <AccountProvider>
      <APICaller />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/account/:id" element={<AccountPage />} />
        </Routes>
      </Router>
    </AccountProvider>
  );
};

export default App;
