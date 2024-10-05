import { CSSProperties, FC } from 'react'
import classes from './styles.module.css'
import { IExcercise } from '../../types'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ExerciseProps {
  data: IExcercise;
}

const Exercise: FC<ExerciseProps> = ({data}) => {
  const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
    id: data.id,
    data: {...data},
  })

  const customStyle: CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
  }

  return (
    <div 
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={customStyle}
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
