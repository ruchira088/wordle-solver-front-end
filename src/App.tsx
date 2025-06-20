import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import GamePage from "./game-page/GamePage"

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GamePage/>}/>
        </Routes>
      </BrowserRouter>
    )
}

export default App
