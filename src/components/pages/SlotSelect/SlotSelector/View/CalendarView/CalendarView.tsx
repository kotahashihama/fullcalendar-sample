import { useRef, forwardRef, useImperativeHandle } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import { EventClickArg } from '@fullcalendar/core';
import { Event, ViewType } from '../../../types';
import './CalendarView.css';

interface CalendarViewProps {
  events: Event[];
  currentDate: Date;
  currentView: ViewType;
  onEventClick: (info: EventClickArg) => void;
  onEventDrop: (info: unknown) => void;
  onEventResize: (info: unknown) => void;
}

export interface CalendarViewRef {
  getApi: () => ReturnType<FullCalendar['getApi']> | undefined;
}

const CalendarView = forwardRef<CalendarViewRef, CalendarViewProps>(
  ({ events, currentDate, currentView, onEventClick, onEventDrop, onEventResize }, ref) => {
    const calendarRef = useRef<FullCalendar>(null);

    useImperativeHandle(ref, () => ({
      getApi: () => calendarRef.current?.getApi(),
    }));

    return (
      <div className="calendar-wrapper">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView={currentView}
          initialDate={currentDate.toISOString().split('T')[0]}
          locale={jaLocale}
          key={currentView}
          headerToolbar={false}
          views={{
            timeGridWeek: {
              dayMaxEvents: 6,
              eventMaxStack: 6
            },
            timeGridDay: {
              dayMaxEvents: 6,
              eventMaxStack: 6
            },
            timeGridThreeDay: {
              type: 'timeGrid',
              duration: { days: 3 },
              dateIncrement: { days: 3 },
              dayMaxEvents: 6,
              eventMaxStack: 6,
              visibleRange: (currentDate) => {
                const start = new Date(currentDate);
                const end = new Date(currentDate);
                end.setDate(end.getDate() + 3);
                return { start, end };
              }
            }
          }}
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          slotDuration="01:00:00"
          snapDuration="00:30:00"
          height="auto"
          events={events}
          eventClick={onEventClick}
          eventDrop={onEventDrop}
          eventResize={onEventResize}
          slotEventOverlap={false}
          nowIndicator={true}
          eventClassNames={(arg) => {
            return arg.event.extendedProps.className || [];
          }}
          eventDidMount={(info) => {
            const isMovableEvent = info.event.extendedProps.className?.includes('movable-event');

            if (isMovableEvent) {
              const el = info.el;
              const parent = el.closest('.fc-timegrid-col-frame');

              if (parent) {
                // available-slot の幅を取得
                const availableSlot = parent.querySelector('.fc-event.available-slot');

                if (availableSlot) {
                  const slotWidth = (availableSlot as HTMLElement).offsetWidth;
                  const slotLeft = (availableSlot as HTMLElement).offsetLeft;

                  // movable-event を available-slot と同じ位置・幅に設定
                  el.style.left = `${slotLeft}px`;
                  el.style.width = `${slotWidth}px`;
                }
              }
            }
          }}
          dayCellDidMount={(info) => {
            const cellDate = info.date;
            // この日に利用可能スロット（available-slot）があるかチェック
            const hasAvailableSlot = events.some((event) => {
              if (!event.className?.includes('available-slot')) return false;

              const eventStart = new Date(event.start);
              const eventEnd = new Date(event.end);

              // イベントがこの日に含まれているかチェック
              const cellDateStart = new Date(cellDate);
              cellDateStart.setHours(0, 0, 0, 0);
              const cellDateEnd = new Date(cellDate);
              cellDateEnd.setHours(23, 59, 59, 999);

              return (eventStart >= cellDateStart && eventStart < cellDateEnd) ||
                     (eventEnd > cellDateStart && eventEnd <= cellDateEnd);
            });

            // 利用可能スロットがない日には斜線を追加
            if (!hasAvailableSlot) {
              info.el.classList.add('striped-day');
            }
          }}
          allDaySlot={true}
          dayMaxEvents={6}
          moreLinkClick="popover"
          dayHeaderContent={() => null}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: false
          }}
          businessHours={false}
          firstDay={0}
        />
      </div>
    );
  }
);

CalendarView.displayName = 'CalendarView';

export default CalendarView;
