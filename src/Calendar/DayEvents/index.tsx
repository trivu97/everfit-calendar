import { FC } from 'react'
import { IEvent } from '../../types'
import classes from './styles.module.css'
import DayEvent from './DayEvent';
import { SortableContext } from '@dnd-kit/sortable';

interface DayEventsProps {
  data: IEvent[];
}

const DayEvents: FC<DayEventsProps> = ({data}) => {
  return (
    <div className={classes.eventWrapper}>
      <SortableContext items={data.map(e => e.id)}>
        <div className={classes.eventList}>
          {data.map((e) => <DayEvent data={e} key={e.id} /> )}
        </div>
      </SortableContext>
    </div>
  )
}

export default DayEvents
