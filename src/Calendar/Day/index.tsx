import React, { FC, PropsWithChildren } from 'react'
import classes from './styles.module.css'
import { today, WEEKDAY } from '../../utils/const';
import { useDroppable } from '@dnd-kit/core';

interface DayProps {
  date: number;
  day: number;
}

const Day: FC<PropsWithChildren<DayProps>> = ({day, date, children}) => {
  const {setNodeRef} = useDroppable({
    id: 'dropable'
  });
  const isToday = date === today;
  return (
    <div className={classes.container}>
      <h5 style={{color: '#6A7988'}}>{WEEKDAY[day]}</h5>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h4 className={classes.date} style={{color: isToday ? '#5A57CB' : '#728096'}}>{date.toString().padStart(2, '0')}</h4>
          <span style={{fontSize: 12, color: '#A0A8B1'}}>&#8853;</span>
        </div>
        <div className={classes.eventWrapper} ref={setNodeRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Day
