import { IDate, IEvent } from "../types";

export const DAY_OF_WEEK: IDate[] = [
  {
    id: '0510', 
    date: 5,    
  }, 
  {
    id: '0610', 
    date: 6, 
  }, 
  {
    id: '0710', 
    date: 7,    
  }, 
  {
    id: '0810', 
    date: 8, 
  }, 
  {
    id: '0910', 
    date: 9, 
  },
  {
    id: '1010', 
    date: 10, 
  }, 
  {
    id: '1110', 
    date: 11, 
  }
];

export const events: IEvent[] = [
  {
    id: 'event-01',
    title: 'Chest day A',
    date: '0510',
    exercises: [
      {
        id: 'card-01',
        title: 'Bench Press Medium',
        quantity: 3,
        description: '50 lb x 5, 60 lb x 5, 70 lb x 5',
        eventId: 'event-01',
        date: '0510',
      },
      {
        id: 'card-02',
        title: 'Exercise B',
        quantity: 1,
        description: '40lb X 10',
        eventId: 'event-01',
        date: '0510',
      }
    ],
  },
  {
    id: 'event-02',
    title: 'Chest day - With arm exercises',
    date: '0610',
    exercises: [
      {
        id: 'card-03',
        title: 'Bench Press Medium',
        quantity: 3,
        description: '50 lb x 5, 60 lb x 5, 70 lb x 5',
        eventId: 'event-02',
        date: '0610',
      },
      {
        id: 'card-04',
        title: 'Exercise B',
        quantity: 1,
        description: '40lb X 10',
        eventId: 'event-02',
        date: '0610',
      }
    ],
  },
  {
    id: 'event-03',
    title: 'Leg day A',
    date: '0710',
    exercises: [
      {
        id: 'card-05',
        title: 'Leg Exercise 1',
        quantity: 3,
        description: '40lb X 10',
        date: '0710',
        eventId: 'event-03'
      },
      {
        id: 'card-06',
        title: 'Leg Exercise 2',
        quantity: 1,
        description: '40lb X 10',
        date: '0710',
        eventId: 'event-03'
      },
    ],
  },
  {
    id: 'event-04',
    title: 'Leg day B',
    date: '0710',
    exercises: [
      {
        id: 'card-07',
        title: 'Leg Exercise 1',
        quantity: 3,
        description: '40lb X 10',
        date: '0710',
        eventId: 'event-04'
      },
      {
        id: 'card-08',
        title: 'Leg Exercise 2',
        quantity: 1,
        description: '40lb X 10',
        date: '0710',
        eventId: 'event-04'
      },
    ],
  },
  {
    id: 'event-05',
    title: 'Leg day C',
    date: '0710',
    exercises: [
      {
        id: 'card-09',
        title: 'Leg Exercise 1',
        quantity: 3,
        description: '40lb X 10',
        date: '0710',
        eventId: 'event-05'
      },
      {
        id: 'card-10',
        title: 'Leg Exercise 2',
        quantity: 1,
        description: '40lb X 10',
        date: '0710',
        eventId: 'event-05'
      },
    ],
  },
  {
    id: 'event-06',
    title: 'Leg day D',
    date: '0710',
    exercises: [
      {
        id: 'card-11',
        title: 'Leg Exercise 1',
        quantity: 3,
        description: '40lb X 10',
        date: '0710',
        eventId: 'event-06'
      },
      {
        id: 'card-12',
        title: 'Leg Exercise 2',
        quantity: 1,
        description: '40lb X 10',
        date: '0710',
        eventId: 'event-06'
      },
    ],
  },
  {
    id: 'event-07',
    title: 'Leg day E',
    date: '0810',
    exercises: [
      {
        id: 'card-13',
        title: 'Leg Exercise 1',
        quantity: 3,
        description: '40lb X 10',
        date: '0810',
        eventId: 'event-07',
      },
      {
        id: 'card-14',
        title: 'Leg Exercise 2',
        quantity: 1,
        description: '40lb X 10',
        date: '0810',
        eventId: 'event-07',
      },
    ],
  },
  {
    id: 'event-08',
    title: 'Leg day F',
    date: '0910',
    exercises: [
      {
        id: 'card-15',
        title: 'Leg Exercise 1',
        quantity: 3,
        description: '40lb X 10',
        date: '0910',
        eventId: 'event-08',
      },
      {
        id: 'card-16',
        title: 'Leg Exercise 2',
        quantity: 1,
        description: '40lb X 10',
        date: '0910',
        eventId: 'event-08',
      },
    ],
  },
  {
    id: 'event-09',
    title: 'Leg day G',
    date: '1010',
    exercises: [
      {
        id: 'card-17',
        title: 'Leg Exercise 1',
        quantity: 3,
        description: '40lb X 10',
        date: '1010',
        eventId: 'event-09'
      },
      {
        id: 'card-18',
        title: 'Leg Exercise 2',
        quantity: 1,
        description: '40lb X 10',
        date: '1010',
        eventId: 'event-09'
      },
    ],
  },
  {
    id: 'event-10',
    title: 'Leg day H',
    date: '1110',
    exercises: [
      {
        id: 'card-19',
        title: 'Leg Exercise 1',
        quantity: 3,
        description: '40lb X 10',
        date: '1110',
        eventId: 'event-10',
      },
      {
        id: 'card-20',
        title: 'Leg Exercise 2',
        quantity: 1,
        description: '40lb X 10',
        date: '1110',
        eventId: 'event-10',
      },
    ],
  },
];