import React, {useEffect, useState} from "react"
import {useLocation} from "react-router-dom"
import {Just, Maybe, None} from "monet"
import {DEFAULT_ATTEMPTS, DEFAULT_LETTER_COUNT} from "../home-page/HomePage"
import {Coordinate, createGrid, GridState, nextTileStatus, TileState, TileStatus, updateTile} from "./Models"
import Grid from "./grid/Grid"
import {possibleMatches, PossibleSolution, transformToWordleConstraints} from "./WordleSolverApi"
import Solutions from "./solutions/Solutions"

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

    const onKeyDown = async (event: KeyboardEvent) => {
        if (event.key === "Enter" && cursor.x === letterCount && cursor.y < attempts - 1) {
            setCursor({x: 0, y: cursor.y + 1})
            const words: PossibleSolution[] = await possibleMatches(transformToWordleConstraints(gridState))
            setSolutions(Just(words))
        } else if (event.key === "Backspace") {
            const previous = {x: Math.max(0, cursor.x - 1), y: cursor.y}
            setGridState(updateTile(gridState, previous, tileState => ({
                ...tileState,
                status: TileStatus.Unknown,
                value: None()
            })))
            setCursor(previous)
        } else if (isLetter(event.key) && cursor.x < letterCount) {
            setGridState(updateTile(gridState, cursor, tileState => ({...tileState, value: Just(event.key)})))
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
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    })

    return (
        <div>
            <Grid gridState={gridState} onTileClick={onTileClick}/>
            {
                solutions.map(value => <Solutions solutions={value}/>).orNull()
            }
        </div>
    )
}

const isLetter = (input: string): boolean => input.length === 1 && input.match(/[a-z]/i) !== null

export default GamePage