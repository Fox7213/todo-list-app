import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Layout from "./layouts/Layout/BaseLayout";
import AddTask from './pages/AddTask';
import AllTasks from "./pages/AllTasks";
import HomePage from "./pages/Home/HomePage";
import CompletedTasks from './pages/СompletedTasks';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={"/alltasks"} element={<AllTasks/>}/>
                    <Route path={"/completedtasks"} element={<CompletedTasks/>}/>
                    <Route path={"/addTask"} element={<AddTask/>}/>
                    <Route path="*" element={<div>404</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App