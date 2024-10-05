import { FC } from 'react'
import classes from './styles.module.css'
import { today, WEEKDAY } from '../../utils/const';
import { IEvent } from '../../types';
import DayEvents from '../DayEvents';
import { useDroppable } from '@dnd-kit/core';

interface DayProps {
  date: number;
  day: number;
  id: string;
  events: IEvent[];
}

const Day: FC<DayProps> = ({day, date, events, id}) => {
  const {setNodeRef} = useDroppable({
    id,
  })

  const isToday = date === today;
  return (
    <div className={classes.container}>
      <h5 style={{color: '#6A7988'}}>{WEEKDAY[day]}</h5>
      <div className={classes.wrapper} ref={setNodeRef}>
        <div className={classes.header}>
          <h4 className={classes.date} style={{color: isToday ? '#5A57CB' : '#728096'}}>{date.toString().padStart(2, '0')}</h4>
          <button className={classes.btn} style={{ color: '#A0A8B1'}}><span>&#8853;</span></button>
        </div>
        <DayEvents data={events}/>
      </div>
    </div>
  )
}

export default Day
