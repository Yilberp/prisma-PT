import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import Transactions from "./pages/Transactions/Transactions"
import RoutesWithNotFound from "./utilities/RoutesWithNotFound"
import store from './redux/store'

function App() {
  

  return (
    <Provider store={store}>
    <BrowserRouter>
        <Toaster/>
      <RoutesWithNotFound>
        <Route path="/" element={<Login/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
      </RoutesWithNotFound>
    </BrowserRouter>
    </Provider>
  )
}

export default App
