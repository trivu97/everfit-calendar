export type IExcercise = {
  id: string;
  title: string;
  quantity: number;
  description: string;
}

export type IEvent = {
  id: string;
  title: string;
  children: IExcercise[];
}

export type IDate = {
  id: string;
  date: number;
  events: IEvent[];
}

export enum ItemType {
  EVENT = 'event',
  EXERCISE = 'exercise',
}