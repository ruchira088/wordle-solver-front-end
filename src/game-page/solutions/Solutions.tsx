import React from "react"
import {PossibleSolution} from "../WordleSolverApi"
import styles from "./Solutions.module.scss"

const Solutions = (props: {solutions: PossibleSolution[]}) => (
    <table className={styles.solutionsTable}>
        <tr>
            <th>Word</th>
            <th>Score</th>
        </tr>
        {
            props.solutions
                .map((solution, index) =>
                    <tr key={index}>
                        <td>{solution.word}</td>
                        <td>{solution.score}</td>
                    </tr>
                )
        }
    </table>
)

export default Solutions
