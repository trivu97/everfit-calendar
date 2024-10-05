import React, { useState } from 'react'
import Day from './Day';
import classes from './styles.module.css';
import { DAY_OF_WEEK } from '../datas';
import Event from './Event';
import { closestCorners, DndContext, DragEndEvent, DragMoveEvent, PointerSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core';
import Exercise from './Event/Exercise';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { ItemType } from '../types';

const Calendar = () => {
  const [days, setDays] = useState(DAY_OF_WEEK);

  const findDayHasItem = (id: UniqueIdentifier, type: ItemType = ItemType.EVENT) => {
    if (type === ItemType.EVENT) {
      return days.find(d => d.events.find(e => e.id === id));
    }
  }

  const onDragMove = (event: DragMoveEvent) => {
    const {active, over} = event;

    // Handle drag event
    if (active && over && active.data.current?.type === ItemType.EVENT && over.data.current?.type === ItemType.EVENT && active.id !== over.id) {
      // Find active day
      const activeDay = findDayHasItem(active.id, ItemType.EVENT);
      const overDay = findDayHasItem(over.id, ItemType.EVENT);

      if (activeDay && overDay) {
        const activeDayIndex = days.findIndex(day => day.id === activeDay.id);
        const overDayIndex = days.findIndex(day => day.id === overDay.id);

        const activeEventIndex = activeDay.events.findIndex(event => event.id === active.id);
        const overEventIndex = overDay.events.findIndex(event => event.id === over.id);

        // Move to other day
        if (activeDay.id !== overDay.id) {
          const newDays = [...days];
          const [removedEvent] = newDays[activeDayIndex].events.splice(activeEventIndex, 1);
          newDays[overDayIndex].events.splice(overEventIndex, 0, removedEvent);

          setDays(newDays);
        }
      }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    
    // Handle events sorting
    if (active && over && active.data.current?.type === ItemType.EVENT && over.data.current?.type === ItemType.EVENT && over.id !== active.id) {
      const activeDay = findDayHasItem(active.id, ItemType.EVENT);
      const overDay = findDayHasItem(over.id, ItemType.EVENT);

      if (activeDay && overDay && activeDay.id === overDay.id) {
        const activeDayIndex = days.findIndex(d => d.id === activeDay.id);
        const activeEventIndex = activeDay.events.findIndex(event => event.id === active.id);
        const overEventIndex = overDay.events.findIndex(event => event.id === over.id);
        const newDays = [...days];
        newDays[activeDayIndex].events = arrayMove(
          newDays[activeDayIndex].events,
          activeEventIndex,
          overEventIndex
        )

        setDays(newDays);
      }
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
      <div className={classes.container}>
        <DndContext sensors={sensors} onDragEnd={onDragEnd} onDragStart={() => {}} onDragMove={onDragMove} collisionDetection={closestCorners}>
          {days.map((d, idx) => (
            <Day key={d.id} day={idx} date={d.date}>
              <SortableContext items={d.events.map(ev => ev.id)} >
                  {d.events.map(e => (
                    <Event key={e.id} data={e}>
                      {e.children.map(exercise => (
                        <Exercise data={exercise} key={exercise.id}/>
                      ))}
                    </Event>
                  ))}
              </SortableContext>
            </Day>
          ))}
        </DndContext>
      </div>
  )
}

export default Calendar
