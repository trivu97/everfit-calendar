import { useState } from 'react'
import Day from './Day';
import classes from './styles.module.css';
import { DAY_OF_WEEK, events as initialEvents} from '../datas';
import { 
  defaultDropAnimationSideEffects, 
  DndContext, 
  DragEndEvent, 
  DragOverEvent, 
  DragOverlay, 
  DragStartEvent, 
  DropAnimation, 
  MouseSensor, 
  TouchSensor, 
  UniqueIdentifier, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { IEvent, IExcercise, ItemType } from '../types';
import DayEvent from './DayEvents/DayEvent';
import Exercise from './Exercises/Exercise';

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [activeItemId, setActiveItemId] = useState<UniqueIdentifier | null>(null);
  const [activeItemType, setActiveItemType] = useState<ItemType | null>(null);
  const [activeItemData, setActiveItemData] = useState<IEvent | IExcercise | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const {active: {id, data: {current}}} = event;

    if (!current) return;

    const isExercise = !!current.eventId;

    setActiveItemId(id);
    setActiveItemType(isExercise ? ItemType.EXERCISE : ItemType.EVENT);
    setActiveItemData(isExercise ? current as IExcercise : current as IEvent);
  }

  const handleDragOver = (event: DragOverEvent) => {
    const {active, over} = event;

    if (!over) return;

    const {id: activeId, data: {current: activeData}} = active;
    const {id: overId, data: {current: overData}} = over;

    if (!activeData) return;

    if (activeItemType === ItemType.EXERCISE) {
      if (!overData) return;

      // Drag card to new events
      if (!overData.eventId) {
        const {date, id} = overData as IEvent;
        const destinationEvent = Object.assign({}, events.find(e => e.id === id));
        const currentEvent = Object.assign({}, events.find(e => e.id === activeData.eventId));

        if (!destinationEvent || destinationEvent.exercises.findIndex(e => e.id === activeId) !== -1) return;

        const currentEventIndex = events.findIndex(e => e.id === currentEvent.id);
        const destinationEventIndex = events.findIndex(e => e.id === destinationEvent.id);

        currentEvent.exercises = currentEvent.exercises.filter(e => e.id !== activeId);
        destinationEvent.exercises.push({...activeItemData, date, eventId: id} as IExcercise);
        const newEvents = [...events];
        newEvents[currentEventIndex] = currentEvent;
        newEvents[destinationEventIndex] = destinationEvent;
        setEvents(newEvents);
      } else {
        // Drag card to new card in other event
        const {date, eventId} = overData as IExcercise;
        const destinationEvent = Object.assign({}, events.find(e => e.id === eventId));
        const currentEvent = Object.assign({}, events.find(e => e.id === activeData.eventId));

        if (!destinationEvent || currentEvent.id === destinationEvent.id) return;

        const currentEventIndex = events.findIndex(e => e.id === currentEvent.id);
        const destinationEventIndex = events.findIndex(e => e.id === destinationEvent.id);
        const newCardIndex = destinationEvent.exercises.findIndex(e => e.id === overId);

        currentEvent.exercises = currentEvent.exercises.filter(e => e.id !== activeId);
        destinationEvent.exercises.splice(newCardIndex, 0, {...activeItemData, date, eventId} as IExcercise);

        const newEvents = [...events];
        newEvents[currentEventIndex] = currentEvent;
        newEvents[destinationEventIndex] = destinationEvent;
        setEvents(newEvents);
      }

      return;
    }

    // Drag current event to no event date or far from the event list
    if (!overData) {
      const newEvent = {...activeData, date: overId} as IEvent;
      const oldIndex = events.findIndex(e => e.id === activeId);
      const newEventList = [...events];
      newEventList.splice(oldIndex, 1);
      newEventList.push(newEvent);
      setEvents(newEventList);
      return;
    }

    // Drag current event to new date
    if (activeData.date !== overData.date) {
      const newEvent = {...activeData, date: overData.date} as IEvent;
      const oldIndex = events.findIndex(e => e.id === activeId);
      const newIndex = events.findIndex(e => e.id === overId);
      const newEventList = [...events];
      newEventList.splice(oldIndex, 1);
      newEventList.splice(newIndex, 0, newEvent);
      setEvents(newEventList);
    }
  };

  // Handle when finished dragging
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;

    if (!over) return;

    const {id: activeId, data: {current: activeData}} = active;
    const {id: overId, data: {current: overData}} = over;

    if (!activeData || !overData) return;

    // Drag exercise card
    if (activeItemType === ItemType.EXERCISE) {      
      const currentEventIndex = events.findIndex(e => e.id === (activeData as IExcercise).eventId);
      const currentCardIndex = events[currentEventIndex].exercises.findIndex(ex => ex.id === activeId);
      const newCardIndex = events[currentEventIndex].exercises.findIndex(ex => ex.id === overId);

      const newEvents = [...events];
      newEvents[currentEventIndex].exercises = arrayMove(newEvents[currentEventIndex].exercises, currentCardIndex, newCardIndex);
      setEvents(newEvents);
      return;
    }

    // Active and over are both event and in the same day
    if (activeData.date === overData.date) {
      const oldIndex = events.findIndex(e => e.id === activeId);
      const newIndex = events.findIndex(e => e.id === overId);
      setEvents((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(useSensor(MouseSensor),useSensor(TouchSensor));

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
      <div className={classes.container}>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart} onDragOver={handleDragOver}>
          {DAY_OF_WEEK.map((d, idx) => (
            <Day key={d.id} day={idx} date={d.date} id={d.id} events={events.filter(e => e.date === d.id)}/>
          ))}
          <DragOverlay dropAnimation={dropAnimation} adjustScale={false}>
            {(!activeItemId || !activeItemData) && null}
            {activeItemData && activeItemType === ItemType.EVENT && <DayEvent data={activeItemData as IEvent} />}
            {activeItemData && activeItemType === ItemType.EXERCISE && <Exercise data={activeItemData as IExcercise} />}
          </DragOverlay>
        </DndContext>
      </div>
  )
}

export default Calendar
