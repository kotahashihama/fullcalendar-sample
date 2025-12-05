import React, { useState, useRef, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import SlotSelectorHeader from './SlotSelector/Header/Header';
import CalendarView, { CalendarViewRef } from './SlotSelector/View/CalendarView/CalendarView';
import ListView from './SlotSelector/View/ListView/ListView';
import EventModal from './EventModal/EventModal';
import CalendarSettings from './CalendarSettings/CalendarSettings';
import { ViewType, ViewMode, Event } from './types';
import { events, users } from './eventsData';
import { EventClickArg } from '@fullcalendar/core';
import './SlotSelect.css';

const SlotSelect: React.FC = () => {
  const calendarRef = useRef<CalendarViewRef>(null);
  const [currentView, setCurrentView] = useState<ViewType>('timeGridWeek');
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2025-12-07'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showCalendarSettings, setShowCalendarSettings] = useState(false);
  const [visibleUsers, setVisibleUsers] = useState<Set<string>>(
    new Set(users.map((user) => user.userClass))
  );

  // イベントのフィルタリング
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // available-slot と movable-event は常に表示
      if (event.className?.includes('available-slot') || event.className?.includes('movable-event')) {
        return true;
      }

      // existing-event の場合、ユーザーの表示設定に従う
      if (event.className?.includes('existing-event')) {
        const userClass = users.find((user) =>
          event.className?.includes(user.userClass)
        )?.userClass;

        return userClass ? visibleUsers.has(userClass) : true;
      }

      return true;
    });
  }, [visibleUsers]);

  const handleToggleUser = (userClass: string) => {
    setVisibleUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userClass)) {
        newSet.delete(userClass);
      } else {
        newSet.add(userClass);
      }
      return newSet;
    });
  };

  // viewModeやcurrentDateが変更されたときにカレンダーの日付を同期
  useEffect(() => {
    if (viewMode === 'calendar') {
      const timer = setTimeout(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          calendarApi.gotoDate(currentDate);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentDate, viewMode]);

  const handleEventClick = (info: EventClickArg) => {
    const clickedEvent = info.event;
    const classNames = clickedEvent.classNames;

    // existing-eventのみモーダルを表示
    if (classNames.some(className => className.includes('existing-event'))) {
      const event: Event = {
        id: clickedEvent.id,
        start: clickedEvent.startStr,
        end: clickedEvent.endStr,
        title: clickedEvent.title,
        className: classNames.join(' '),
        allDay: clickedEvent.allDay
      };

      setSelectedEvent(event);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventDrop = (info: unknown) => {
    const droppedEvent = (info as { event: { start: Date | null; end: Date | null } }).event;
    const newStart = droppedEvent.start;
    const newEnd = droppedEvent.end;

    // available-slotと重なっているかチェック
    const overlapsWithAvailableSlot = filteredEvents.some(event => {
      if (!event.className?.includes('available-slot')) return false;

      const slotStart = new Date(event.start);
      const slotEnd = new Date(event.end);

      // イベントがスロット内に完全に含まれているかチェック
      return newStart && newEnd && newStart >= slotStart && newEnd <= slotEnd;
    });

    if (!overlapsWithAvailableSlot) {
      (info as { revert: () => void }).revert();
      alert('利用可能な時間帯にのみ移動できます');
    }
  };

  const handleEventResize = (info: unknown) => {
    const resizedEvent = (info as { event: { start: Date | null; end: Date | null } }).event;
    const newStart = resizedEvent.start;
    const newEnd = resizedEvent.end;

    // available-slotと重なっているかチェック
    const overlapsWithAvailableSlot = filteredEvents.some(event => {
      if (!event.className?.includes('available-slot')) return false;

      const slotStart = new Date(event.start);
      const slotEnd = new Date(event.end);

      // イベントがスロット内に完全に含まれているかチェック
      return newStart && newEnd && newStart >= slotStart && newEnd <= slotEnd;
    });

    if (!overlapsWithAvailableSlot) {
      (info as { revert: () => void }).revert();
      alert('利用可能な時間帯内でのみリサイズできます');
    }
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    if (view === 'timeGridDay') {
      handleToday();
    } else if (view === 'timeGridWeek') {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - dayOfWeek);
      setCurrentDate(sunday);
    } else if (view === 'timeGridThreeDay') {
      setCurrentDate(new Date());
    }
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    let offset = 7;

    if (currentView === 'timeGridDay') {
      offset = 1;
    } else if (currentView === 'timeGridThreeDay') {
      offset = 3;
    }

    newDate.setDate(newDate.getDate() - offset);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    let offset = 7;

    if (currentView === 'timeGridDay') {
      offset = 1;
    } else if (currentView === 'timeGridThreeDay') {
      offset = 3;
    }

    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = new Date();

    if (currentView === 'timeGridWeek') {
      const dayOfWeek = today.getDay();
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - dayOfWeek);
      setCurrentDate(sunday);
    } else if (currentView === 'timeGridThreeDay') {
      setCurrentDate(today);
    } else {
      setCurrentDate(today);
    }
  };

  const getHeaderDates = () => {
    const baseDate = new Date(currentDate);
    if (currentView === 'timeGridWeek') {
      const sunday = new Date(baseDate);
      sunday.setDate(baseDate.getDate() - baseDate.getDay());
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(sunday);
        date.setDate(sunday.getDate() + i);
        dates.push(date);
      }
      return dates;
    } else if (currentView === 'timeGridThreeDay') {
      const dates = [];
      for (let i = 0; i < 3; i++) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + i);
        dates.push(date);
      }
      return dates;
    } else {
      return [baseDate];
    }
  };

  const onPrev = () => {
    if (viewMode === 'calendar') {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.prev();
        const newDate = calendarApi.getDate();
        setCurrentDate(newDate);
      }
    } else {
      handlePrev();
    }
  };

  const onNext = () => {
    if (viewMode === 'calendar') {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.next();
        const newDate = calendarApi.getDate();
        setCurrentDate(newDate);
      }
    } else {
      handleNext();
    }
  };

  const onToday = () => {
    if (viewMode === 'calendar') {
      const calendarApi = calendarRef.current?.getApi();
      if (calendarApi) {
        calendarApi.today();
        const newDate = calendarApi.getDate();
        setCurrentDate(newDate);
      }
    } else {
      handleToday();
    }
  };

  return (
    <div className="booking-container">
      <Sidebar />

      <div className="booking-main">
        <Header viewMode={viewMode} onViewModeChange={setViewMode} />

        <SlotSelectorHeader
          dates={getHeaderDates()}
          events={filteredEvents}
          viewMode={viewMode}
          currentDate={currentDate}
          currentView={currentView}
          showViewMenu={showViewMenu}
          onPrev={onPrev}
          onNext={onNext}
          onToday={onToday}
          onViewChange={handleViewChange}
          onToggleViewMenu={() => setShowViewMenu(!showViewMenu)}
          onToggleCalendarSettings={() => setShowCalendarSettings(!showCalendarSettings)}
        />

        {viewMode === 'calendar' ? (
          <CalendarView
            ref={calendarRef}
            events={filteredEvents}
            currentDate={currentDate}
            currentView={currentView}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
          />
        ) : (
          <ListView events={filteredEvents} currentDate={currentDate} currentView={currentView} />
        )}
      </div>

      {showCalendarSettings && viewMode === 'calendar' && (
        <CalendarSettings
          users={users}
          visibleUsers={visibleUsers}
          onToggleUser={handleToggleUser}
          onClose={() => setShowCalendarSettings(false)}
        />
      )}

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <div className="mobile-settings-footer">
        <div className="mobile-settings-container">
          <button className="mobile-settings-button">日本標準時間 ▼</button>
          <button className="mobile-settings-button">日本語 ▼</button>
        </div>
      </div>
    </div>
  );
};

export default SlotSelect;
