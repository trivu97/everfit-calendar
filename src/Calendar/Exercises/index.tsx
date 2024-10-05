import { FC } from 'react'
import { IExcercise } from '../../types'
import classes from './styles.module.css'
import Exercise from './Exercise';
import { SortableContext } from '@dnd-kit/sortable';

interface ExercisesProps {
  data: IExcercise[];
}

const Exercises: FC<ExercisesProps> = ({data}) => {
  return (
    <SortableContext items={data.map(e => e.id)}>
      <div className={classes.exerciseList}>
        {data.map(exercise => (
          <Exercise data={exercise} key={exercise.id}/>
        ))}
      </div>
    </SortableContext>
  )
}

export default Exercises
