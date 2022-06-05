import React from "react"
import {TileState, TileStatus} from "../Models"
import styles from "./Tile.module.scss"
import classNames from "classnames"

const Tile = (props: { tileState: TileState, onTileClick: (tile: TileState) => void }) => {
    const tileStatus = props.tileState.status

    const className =
        classNames(styles.tile, {
            [styles.unknown]: tileStatus === TileStatus.Unknown,
            [styles.unused]: tileStatus === TileStatus.Unused,
            [styles.notInPosition]: tileStatus === TileStatus.NotInPosition,
            [styles.inPosition]: tileStatus === TileStatus.InPosition,
            [styles.empty]: props.tileState.value.isNone(),
            [styles.nonEmpty]: props.tileState.value.isSome()
        })

    return (
        <div className={className}
             onClick={() => props.onTileClick(props.tileState)}>{props.tileState.value.getOrElse("")}</div>
    )
}

export default Tile