import React from "react"
import {RowState, TileState} from "../Models"
import Tile from "../tile/Tile"

const Row = (props: {rowState: RowState, onTileClick: (tile: TileState) => void}) =>
    <div>
        {
            props.rowState.tiles.map(
                (tileState, index) => <Tile key={index} tileState={tileState} onTileClick={props.onTileClick}/>
            )
        }
    </div>

export default Row