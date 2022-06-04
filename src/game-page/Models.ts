import {Maybe, None} from "monet"

export interface GridState {
    readonly rows: RowState[]
    readonly dimensions: Coordinate
}

export interface Coordinate {
    readonly x: number
    readonly y: number
}

export interface RowState {
    readonly rowNumber: number
    readonly tiles: TileState[]
}

export interface TileState {
    readonly value: Maybe<string>
    readonly status: TileStatus
    readonly coordinate: Coordinate
}

export enum TileStatus {
    Unknown = "Unknown", Unused = "Unused", NotInPosition = "NotInPosition", InPosition = "InPosition"
}

export const nextTileStatus =
    (tileStatus: TileStatus): TileStatus => {
        const tileStatuses: TileStatus[] = Object.values(TileStatus)
        const index = tileStatuses.indexOf(tileStatus)
        const next = index === tileStatuses.length - 1 ? 0 : index + 1

        return tileStatuses[next]
    }

function fill<A>(count: number, value: (index: number) => A): A[] {
    if (count === 0) {
        return [];
    } else {
        return fill(count - 1, value).concat(value(count - 1))
    }
}

export const createGrid = (rows: number, columns: number): GridState => ({
    rows: fill<RowState>(rows, rowNumber => ({
        rowNumber,
        tiles: fill<TileState>(columns, columnNumber => ({
            value: None(),
            status: TileStatus.Unknown,
            coordinate: { x: columnNumber, y: rowNumber }
        }))
    })),
    dimensions: {x: columns, y: rows}
})

export const updateTile =
    (gridState: GridState, coordinate: Coordinate, mapper: ((tileState: TileState) => TileState)): GridState => ({
            rows:
                gridState.rows
                    .map(row =>
                        ({
                            ...row,
                            tiles: row.tiles.map(tile => {
                                if (tile.coordinate.x === coordinate.x && tile.coordinate.y === coordinate.y) {
                                    return mapper(tile)
                                } else {
                                    return tile
                                }
                            })
                        })
                    ),
            dimensions: gridState.dimensions
        })

