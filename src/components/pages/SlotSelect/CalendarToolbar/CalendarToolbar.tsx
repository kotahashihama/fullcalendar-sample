import React from 'react';
import { Event, ViewMode, ViewType } from '../types';
import Navigation from './Navigation/Navigation';
import DateHeader from './DateHeader/DateHeader';
import './CalendarToolbar.css';

interface CalendarToolbarProps {
  dates: Date[];
  events: Event[];
  viewMode: ViewMode;
  currentDate: Date;
  currentView: ViewType;
  showViewMenu: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: ViewType) => void;
  onToggleViewMenu: () => void;
  onToggleCalendarSettings?: () => void;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  dates,
  events,
  viewMode,
  currentDate,
  currentView,
  showViewMenu,
  onPrev,
  onNext,
  onToday,
  onViewChange,
  onToggleViewMenu,
  onToggleCalendarSettings,
}) => {
  return (
    <>
      <Navigation
        currentDate={currentDate}
        currentView={currentView}
        viewMode={viewMode}
        showViewMenu={showViewMenu}
        onPrev={onPrev}
        onNext={onNext}
        onToday={onToday}
        onViewChange={onViewChange}
        onToggleViewMenu={onToggleViewMenu}
        onToggleCalendarSettings={onToggleCalendarSettings}
      />

      <DateHeader dates={dates} events={events} viewMode={viewMode} />
    </>
  );
};

export default CalendarToolbar;
