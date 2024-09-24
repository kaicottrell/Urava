import { useEffect, useState } from 'react';
import './css/App.css';
import './components/Home.tsx'
import Home from './components/Home.tsx';
function App() {  // Destructure and set a default value
    return (
        <div>
            <p>Test</p>
            <Home/>
        </div>
    );
}

export default App;
