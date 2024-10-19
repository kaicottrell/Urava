import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

import Home from './Pages/Home.tsx';
import SignIn from './Pages/Identity/SignIn.tsx';
import Register from './Pages/Identity/Register.tsx';
import InterviewQuestions from './Components/InterviewQuestions.tsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ToastProvider } from './Context/ToastContext.tsx';
import './index.css'; // Tailwind CSS file
import './styles/globals.css';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Home />} />
                <Route path="signIn" element={<SignIn />} />
                <Route path="register" element={<Register />} />
                <Route path="interviewQuestions" element={<InterviewQuestions /> } />
                {/* ... etc. */}
            </>
        )
    );

    return (
        <ToastProvider>
            <ToastContainer />
            <RouterProvider router={router} />
        </ToastProvider>
    );
}

export default App;
