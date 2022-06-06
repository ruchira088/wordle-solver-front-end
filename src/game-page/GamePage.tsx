import React, {useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {Just, Maybe, None} from "monet"
import Keyboard from "react-simple-keyboard"
import {DEFAULT_ATTEMPTS, DEFAULT_LETTER_COUNT} from "../home-page/HomePage"
import {Coordinate, createGrid, GridState, nextTileStatus, TileState, TileStatus, updateTile} from "./Models"
import Grid from "./grid/Grid"
import {possibleMatches, PossibleSolution, transformToWordleConstraints} from "./WordleSolverApi"
import Solutions from "./solutions/Solutions"
import styles from "./GamePage.module.scss"
import "react-simple-keyboard/build/css/index.css"

const GamePage = () => {
    const queryParams = new URLSearchParams(useLocation().search)

    const attempts: number =
        Maybe.fromNull(queryParams.get("attempts"))
            .map(value => parseInt(value, 10))
            .orJust(DEFAULT_ATTEMPTS)

    const letterCount =
        Maybe.fromNull(queryParams.get("letter-count"))
            .map(value => parseInt(value, 10))
            .orJust(DEFAULT_LETTER_COUNT)

    const [gridState, setGridState] = useState<GridState>(createGrid(attempts, letterCount))
    const [cursor, setCursor] = useState<Coordinate>({x: 0, y: 0})
    const [solutions, setSolutions] = useState<Maybe<PossibleSolution[]>>(None())

    const onKeyDown = async (key: string) => {
        if (key === "Enter" && cursor.x === letterCount && cursor.y < attempts - 1) {
            setCursor({x: 0, y: cursor.y + 1})
            const words: PossibleSolution[] = await possibleMatches(transformToWordleConstraints(gridState))
            setSolutions(Just(words))
        } else if (key === "Backspace" && !(cursor.x === 0 && cursor.y === 0)) {
            const previous =
                cursor.x === 0 ? {x: letterCount - 1, y: cursor.y - 1} : {x: cursor.x - 1, y: cursor.y}

            setGridState(updateTile(gridState, previous, tileState => ({
                ...tileState,
                status: TileStatus.Unknown,
                value: None()
            })))
            setCursor(previous)
        } else if (isLetter(key) && cursor.x < letterCount) {
            setGridState(updateTile(gridState, cursor, tileState => ({...tileState, value: Just(key)})))
            setCursor({x: cursor.x + 1, y: cursor.y})
        }
    }

    const onTileClick = (tile: TileState) => {
        if (tile.value.isSome()) {
            setGridState(updateTile(gridState, tile.coordinate, tileState => ({
                ...tileState,
                status: nextTileStatus(tileState.status)
            })))
        }
    }

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => onKeyDown(event.key)
        document.addEventListener("keydown", keyDownHandler)
        return () => document.removeEventListener("keydown", keyDownHandler)
    })

    return (
        <div>
            <div className={styles.gamePageBody}>
                <div className={styles.row}>
                    <Grid gridState={gridState} onTileClick={onTileClick}/>
                </div>
                <div className={styles.row}>
                    { solutions.map(value => <Solutions solutions={value}/>).orNull() }
                </div>
            </div>
            <div>
                <div className={styles.keyboard}>
                    <Keyboard onKeyPress={onKeyDown} physicalKeyboardHighlight={true} layout={keyboardLayout} display={keyboardDisplay}/>
                </div>
            </div>
        </div>
    )
}

const isLetter = (input: string): boolean => input.length === 1 && input.match(/[a-z]/i) !== null

const keyboardLayout = {
    default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "Enter z x c v b n m Backspace"
    ]
}

const keyboardDisplay = {
    Enter: "⏎",
    Backspace: "⌫"
}

export default GamePage