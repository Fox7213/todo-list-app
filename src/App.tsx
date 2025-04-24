import { Global, css } from '@emotion/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useInitialize } from "./hooks/useInitialize";
import { ThemeProvider } from './theme/ThemeContext';

import Layout from "./layouts/Layout/BaseLayout";
import AddTask from './pages/AddTask/AddTask';
import AllTasks from "./pages/AllTasks/AllTasks";
import CompletedTasks from './pages/CompletedTasks/СompletedTasks';
import HomePage from "./pages/Home/HomePage";

import './App.css';

function App() {
    useInitialize();

    return (
        <ThemeProvider>
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
        </ThemeProvider>
    );
}

export default App;