import React from "react"
import {Bar, BarChart, XAxis, YAxis} from "recharts"
import {PossibleSolution} from "../WordleSolverApi"
import styles from "./Solutions.module.css"

const Solutions = (props: {solutions: PossibleSolution[]}) => {
    if (props.solutions.length === 0) {
        return (
            <div></div>
        )
    } else {
        return (
            <BarChart className={styles.barChart} width={400} height={400} data={props.solutions}>
                <XAxis dataKey="word"/>
                <YAxis/>
                <Bar dataKey="score" fill="#538d4e"/>
            </BarChart>
        )
    }
}

export default Solutions
