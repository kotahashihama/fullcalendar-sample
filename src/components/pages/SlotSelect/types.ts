export interface Event {
  id: string;
  start: string;
  end: string;
  title?: string;
  display?: string;
  editable?: boolean;
  className?: string;
  allDay?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  userClass: string; // user-1, user-2, etc.
}

export type ViewType = 'timeGridWeek' | 'timeGridThreeDay' | 'timeGridDay';
export type ViewMode = 'calendar' | 'list';
