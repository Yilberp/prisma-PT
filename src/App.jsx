import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Transactions from "./pages/Transactions/Transactions";
import RoutesWithNotFound from "./utilities/RoutesWithNotFound";
import store from "./redux/store";
import AuthGuard from "./guards/auth.guard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <RoutesWithNotFound>
          <Route path="/" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </RoutesWithNotFound>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
