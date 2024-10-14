
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Login from './Pages/Identity/Login.tsx';
import Register from './Pages/Identity/Register.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { ToastProvider } from './Context/ToastContext.tsx';


function App() {
    return (
        <ToastProvider>
            <HashRouter>
                <ToastContainer />
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </HashRouter>
        </ToastProvider>
      
    );

}
export default App;