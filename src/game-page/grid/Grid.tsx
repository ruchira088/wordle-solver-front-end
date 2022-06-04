import React from "react"
import {GridState, TileState} from "../Models"
import Row from "../row/Row"

const Grid = (props: { gridState: GridState, onTileClick: (tile: TileState) => void }) =>
    <div>
        {
            props.gridState.rows.map(
                (rowState, index) => <Row key={index} rowState={rowState} onTileClick={props.onTileClick}/>
            )
        }
    </div>

export default Grid