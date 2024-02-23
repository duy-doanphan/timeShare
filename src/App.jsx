import React from "react";
import "./app.css";
import {routers} from "./routers";
import MainLayout from "./Components/Layouts";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LayoutAdmin from "./pages/Admin/Layout";
import DashboardPage from "./pages/Admin/Dashboard";
import NotFoundPage from "./pages/Share/NotFound";
import TimeSharePage from "./pages/Admin/TimeShare";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {routers.map((route) => {
                        const Layouts = MainLayout;
                        const path = route.path;
                        const Components = route.components;
                        return (
                            <Route
                                path={path}
                                element={
                                    <Layouts>
                                        <Components/>
                                    </Layouts>
                                }
                            />
                        );
                    })}
                    {/* Route for NotFoundPage */}
                    <Route path="*" element={<NotFoundPage />} />
                    {/*Admin*/}
                    <Route path="/admin" element={<LayoutAdmin/>}>
                        <Route index={true} element={<DashboardPage/>}/>
                        <Route path="user" element={<div>Users</div>}/>
                        <Route path="time-share" element={<TimeSharePage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};
export default App;
