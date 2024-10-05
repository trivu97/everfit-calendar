import React, { FC } from 'react'
import classes from './styles.module.css'
import { IExcercise } from '../../types'

interface ExerciseProps {
  data: IExcercise;
}
  

const Exercise: FC<ExerciseProps> = ({data}) => {
  return (
    <div 
      className={classes.exerciseWrapper} 
    >
      <h4 className={classes.exerciseTitle}>{data.title}</h4>
      <div className={classes.exerciseContent}>
        <p className={classes.exQuantity}>{data.quantity}x</p>
        <p className={classes.exDesc}>{data.description}</p>
      </div>
    </div>
  )
}

export default Exercise
