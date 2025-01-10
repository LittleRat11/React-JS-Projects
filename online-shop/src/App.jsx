import {BrowserRouter,Routes,Route} from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Product from "./pages/Product";


function App() {
 

  return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/products/:id" element={<Product/>}/>
                </Routes>
            </div>
        </BrowserRouter>
  )
}

export default App
