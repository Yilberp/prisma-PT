import { Toaster } from "react-hot-toast"
import { BrowserRouter, Route } from "react-router-dom"
import Login from "./pages/Login/Login"
import Transactions from "./pages/Transactions/Transactions"
import RoutesWithNotFound from "./utilities/RoutesWithNotFound"


function App() {
  

  return (
    <BrowserRouter>
        <Toaster/>
      <RoutesWithNotFound>
        <Route path="/" element={<Login/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
      </RoutesWithNotFound>
    </BrowserRouter>
  )
}

export default App
