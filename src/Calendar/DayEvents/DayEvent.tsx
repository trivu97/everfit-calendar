import { CSSProperties, FC } from 'react'
import classes from './styles.module.css'
import { IEvent } from '../../types'
import Exercises from '../Exercises';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface DayEventProps {
  data: IEvent;
}

const DayEvent: FC<DayEventProps> = ({data}) => {
  const {listeners, attributes, setNodeRef, transform, transition, isDragging} = useSortable({
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
      {...listeners}
      {...attributes}
      className={classes.container}
      style={customStyle}
    >
      <div className={classes.eventTitle}>
        <h5 className={classes.title}>{data.title}</h5>
        <button className={classes.btn} style={{color: 'black'}}><span>&#8943;</span></button>
      </div>
      <Exercises data={data.exercises} />
      <div className={classes.footer}>
        <button className={classes.btn} style={{color: 'inherit'}}><span>&#8853;</span></button>
      </div>
    </div>
  )
}

export default DayEvent
