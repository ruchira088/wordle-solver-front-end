import React from "react"
import {PossibleSolution} from "../WordleSolverApi"
import styles from "./Solutions.module.scss"
import closeIcon from "./close.svg"

const Solutions = (props: {solutions: PossibleSolution[], onClose: () => void, onClick: (word: string) => void}) => (
    <div className={styles.solutionsContainer}>
        <div className={styles.solutionsBody}>
            <div className={styles.close}>
                <img className={styles.closeIcon} src={closeIcon} alt="close icon" onClick={props.onClose}/>
            </div>
            <table className={styles.solutionsTable}>
                <thead>
                <tr>
                    <th>Word</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.solutions
                        .map((solution, index) =>
                            <tr key={index} onClick={() => props.onClick(solution.word)}>
                                <td>{solution.word}</td>
                                <td>{solution.score}</td>
                            </tr>
                        )
                }
                </tbody>
            </table>
        </div>
    </div>

)

export default Solutions
