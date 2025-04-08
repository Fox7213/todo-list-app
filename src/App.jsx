// App.jsx
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./layouts/BaseLayout.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={"/test"} element={<div>Test</div>}/>
                    <Route path="*" element={<div>404</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App