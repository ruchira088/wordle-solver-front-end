import React from "react"
import {PossibleSolution} from "../WordleSolverApi"
import styles from "./Solutions.module.scss"

const Solutions = (props: {solutions: PossibleSolution[], onClick: (word: string) => void}) => (
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
)

export default Solutions
