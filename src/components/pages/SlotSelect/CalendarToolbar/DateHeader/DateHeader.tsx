import React from 'react';
import { Event, ViewMode } from '../../types';
import './DateHeader.css';

interface DateHeaderProps {
  dates: Date[];
  events: Event[];
  viewMode: ViewMode;
}

const DateHeader: React.FC<DateHeaderProps> = ({ dates, events, viewMode }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={`common-day-headers ${viewMode === 'calendar' ? 'calendar-mode' : 'list-mode'}`}>
      {dates.map((date, index) => {
        const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
        const dayNumber = date.getDate();

        // 今日かどうかチェック
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        const isToday = checkDate.getTime() === today.getTime();

        // この日に利用可能スロットがあるかチェック
        const hasAvailableSlot = events.some((event) => {
          if (!event.className?.includes('available-slot')) return false;
          const eventStart = new Date(event.start);
          const eventEnd = new Date(event.end);
          const cellDateStart = new Date(date);
          cellDateStart.setHours(0, 0, 0, 0);
          const cellDateEnd = new Date(date);
          cellDateEnd.setHours(23, 59, 59, 999);
          return (eventStart >= cellDateStart && eventStart < cellDateEnd) ||
                 (eventEnd > cellDateStart && eventEnd <= cellDateEnd);
        });

        return (
          <div key={index} className="common-day-header-cell">
            <div className="common-day-name">{dayOfWeek}</div>
            <div className={`common-day-number ${hasAvailableSlot ? 'has-slots' : ''} ${isToday ? 'is-today' : ''}`}>
              {dayNumber}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DateHeader;
