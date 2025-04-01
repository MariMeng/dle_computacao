//para colocar as rotas
import React from "react";
import { Link } from "react-router-dom";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Ranking from "./pages/Ranking";
import WhatAlgorithm from "./pages/WhatAlgorithm";
import WhatError from "./pages/WhatError";
import WhatLanguage from "./pages/WhatLanguage";

function App(){
    
    return(
        <Router>
            <nav>
                <Link to="/">Login</Link> |
                <Link to="/quiz-algorithm">WhatAlgorithm</Link> |
                <Link to="/quiz-error">WhatError</Link> |
                <Link to="/quiz-Language">WhatLanguage</Link> |
                <Link to="/profile">Profile</Link> |
                <Link to="/ranking">Ranking</Link> 
            </nav>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/quiz-algorithm" element={<WhatAlgorithm/>}/>
                <Route path="/quiz-error" element={<WhatError/>}/>
                <Route path="/quiz-language" element={<WhatLanguage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/ranking" element={<Ranking/>}/>
            </Routes>
        </Router>
    );
}

export default App;