import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import GamePage from "./game-page/GamePage"

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<GamePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
