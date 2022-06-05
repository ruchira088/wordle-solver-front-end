import React from "react"
import {RowState, TileState} from "../Models"
import Tile from "../tile/Tile"
import styles from "./Row.module.scss"

const Row = (props: {rowState: RowState, onTileClick: (tile: TileState) => void}) =>
    <div className={styles.row}>
        {
            props.rowState.tiles.map(
                (tileState, index) => <Tile key={index} tileState={tileState} onTileClick={props.onTileClick}/>
            )
        }
    </div>

export default Row