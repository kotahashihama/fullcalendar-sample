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

export type ViewType = 'timeGridWeek' | 'timeGridThreeDay' | 'timeGridDay';
export type ViewMode = 'calendar' | 'list';
