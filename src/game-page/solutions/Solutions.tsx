import React from "react"
import {PossibleSolution} from "../WordleSolverApi"
import styles from "./Solutions.module.scss"

const Solutions = (props: {solutions: PossibleSolution[]}) => (
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
                    <tr key={index}>
                        <td>{solution.word}</td>
                        <td>{solution.score}</td>
                    </tr>
                )
        }
        </tbody>
    </table>
)

export default Solutions
