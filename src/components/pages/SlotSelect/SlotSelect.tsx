import React, { useRef, useState } from 'react';
import PageSidebar from './PageSidebar/PageSidebar';
import PageHeader from './PageHeader/PageHeader';
import CalendarToolbar from './CalendarToolbar/CalendarToolbar';
import CalendarView, { CalendarViewRef } from './CalendarView/CalendarView';
import ListView from './ListView/ListView';
import EventModal from './EventModal/EventModal';
import CalendarSettings from './CalendarSettings/CalendarSettings';
import { events, users } from './data/eventsData';
import { useEventFiltering } from './hooks/useEventFiltering';
import { useCalendarNavigation } from './hooks/useCalendarNavigation';
import { useEventHandlers } from './hooks/useEventHandlers';
import { getHeaderDates } from './utils/dateUtils';
import './SlotSelect.css';

const SlotSelect: React.FC = () => {
  const calendarRef = useRef<CalendarViewRef>(null);
  const [showCalendarSettings, setShowCalendarSettings] = useState(false);

  // カスタムフックを使用してロジックを分離
  const { visibleUsers, filteredEvents, handleToggleUser } = useEventFiltering(events, users);

  const {
    currentView,
    showViewMenu,
    viewMode,
    currentDate,
    setViewMode,
    setShowViewMenu,
    handleViewChange,
    onPrev,
    onNext,
    onToday,
  } = useCalendarNavigation(calendarRef);

  const {
    isModalOpen,
    selectedEvent,
    handleEventClick,
    handleCloseModal,
    handleEventDrop,
    handleEventResize,
  } = useEventHandlers(filteredEvents);

  return (
    <div className="booking-container">
      <PageSidebar />

      <div className="booking-main">
        <PageHeader viewMode={viewMode} onViewModeChange={setViewMode} />

        <CalendarToolbar
          dates={getHeaderDates(currentDate, currentView)}
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
