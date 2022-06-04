import {GridState, TileState, TileStatus} from "./Models"

const API_URL = process.env.API_URL || "http://localhost:8000"
const RESULT_COUNT = 10

interface WordleConstraints {
    readonly length: number
    readonly excludedLetters: string[]
    readonly notInPosition: {[key: number]: string[]}
    readonly inPosition: {[key: number]: string}
    readonly limit: number
}

export interface PossibleSolution {
    readonly word: string
    readonly score: number
}

export const transformToWordleConstraints =
    (gridState: GridState) => {
        const filterMapByStatus = (tileStatus: TileStatus): TileState[] =>
            filterTiles(gridState, tileState => tileState.status === tileStatus)


        const notInPosition: { [key: number]: string[] } =
            filterMapByStatus(TileStatus.NotInPosition)
                .reduce<{[key: number]: string[]}>(
                    (result, tileState) =>
                        ({
                            ...result,
                            [tileState.coordinate.x]: (result[tileState.coordinate.x] || []).concat(tileState.value.toArray())
                        }),
                    {}
                )

        const inPosition: { [key: number]: string } =
            filterMapByStatus(TileStatus.InPosition)
                .reduce<{[key: number]: string}>(
                    (result, tileState) =>
                        ({
                            ...result,
                            [tileState.coordinate.x]: tileState.value.getOrElse("")
                        }),
                    {}
                )

        const applicableLetters: string[] =
            filterMapByStatus(TileStatus.InPosition).concat(filterMapByStatus(TileStatus.NotInPosition))
                .flatMap(tileState => tileState.value.toArray())

        const excludedLetters: string[] =
            filterMapByStatus(TileStatus.Unused)
                .flatMap(tileState => tileState.value.toArray())
                .filter(char => applicableLetters.indexOf(char) === -1)

        return {
            limit: RESULT_COUNT,
            length: gridState.dimensions.x,
            excludedLetters,
            notInPosition,
            inPosition
        }
    }

const filterTiles =
    (gridState: GridState, filter: (tileState: TileState) => boolean): TileState[] =>
        gridState.rows.flatMap(row => row.tiles.filter(filter))

export const possibleMatches =
    async (wordleConstraints: WordleConstraints): Promise<PossibleSolution[]> => {
        const response = await fetch(`${API_URL}/solutions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wordleConstraints)
        })

        const { solutions }: { solutions: PossibleSolution[] } = await response.json()

        return solutions;
    }