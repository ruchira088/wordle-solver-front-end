import React, {useState} from "react"
import {useNavigate} from "react-router-dom"

export const DEFAULT_LETTER_COUNT = 5
export const DEFAULT_ATTEMPTS = 6

const HomePage = () => {
    const navigate = useNavigate()

    const [letterCount, setLetterCount] = useState(DEFAULT_LETTER_COUNT)
    const [attempts, setAttempts] = useState(DEFAULT_ATTEMPTS)

    return (
        <div>
            <div>
                <label>Letter Count</label>
                <input type="number" value={letterCount}
                       onChange={event => setLetterCount(parseInt(event.target.value, 10))}/>
            </div>
            <div>
                <label>Attempts</label>
                <input type="number" value={attempts}
                       onChange={event => setAttempts(parseInt(event.target.value, 10))}/>
            </div>
            <button onClick={() => navigate(`/game?letter-count=${letterCount}&attempts=${attempts}`)}>Start</button>
        </div>
    )
}

export default HomePage
