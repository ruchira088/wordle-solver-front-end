import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./home-page/HomePage"
import GamePage from "./game-page/GamePage"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
