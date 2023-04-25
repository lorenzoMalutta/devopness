import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { TodoList } from "./pages/TodoList";
import { Login } from "./pages/Login";
import { useAuthStore } from "../hook/zustand";

export function Router() {
    const { token } = useAuthStore(state => state);

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Todo" element={token ? <TodoList /> : <Login />} />
        </Routes>
    );

}
