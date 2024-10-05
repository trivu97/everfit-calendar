import React, { FC, PropsWithChildren } from 'react'
import { IEvent, ItemType } from '../../types'
import classes from './styles.module.css'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EventProps {
  data: IEvent;
}

const Event: FC<PropsWithChildren<EventProps>> = ({data, children}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: data.id,
    data: {
      type: ItemType.EVENT,
    }
  })

  return (
    <div 
      className={classes.container} 
      {...attributes} 
      {...listeners} 
      ref={setNodeRef} 
      style={{
        transition, 
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.8 : 1,
      }}
    >
      <div className={classes.eventTitle}>
        <h5 className={classes.title}>{data.title}</h5>
        <span>&#8943;</span>
      </div>
      <div className={classes.exerciseList}>
        {children}
      </div>
      <div className={classes.footer}>
        <span>&#8853;</span>  
      </div>
    </div>
  )
}

export default Event
