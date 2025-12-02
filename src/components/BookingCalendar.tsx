import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import './BookingCalendar.css';

interface Event {
  id: string;
  start: string;
  end: string;
  title?: string;
  display?: string;
  editable?: boolean;
  className?: string;
}

const BookingCalendar: React.FC = () => {
  const [currentView, setCurrentView] = useState<'timeGridWeek' | 'timeGridThreeDay' | 'timeGridDay'>('timeGridWeek');
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    // 火曜日 12/9 の利用可能スロット（背景、移動不可）
    { id: '1', start: '2025-12-09T09:00:00', end: '2025-12-09T11:00:00', title: '9:00-11:00', editable: false, className: 'available-slot' },
    { id: '2', start: '2025-12-09T13:00:00', end: '2025-12-09T14:00:00', title: '13:00-14:00', editable: false, className: 'available-slot' },
    { id: '3', start: '2025-12-09T16:00:00', end: '2025-12-09T18:00:00', title: '16:00-18:00', editable: false, className: 'available-slot' },

    // 木曜日 12/11 の利用可能スロット（背景、移動不可）
    { id: '4', start: '2025-12-11T09:00:00', end: '2025-12-11T10:00:00', title: '9:00-10:00', editable: false, className: 'available-slot' },
    { id: '5', start: '2025-12-11T13:00:00', end: '2025-12-11T15:00:00', title: '13:00-15:00', editable: false, className: 'available-slot' },
    { id: '6', start: '2025-12-11T16:00:00', end: '2025-12-11T18:00:00', title: '16:00-18:00', editable: false, className: 'available-slot' },

    // 金曜日 12/12 の利用可能スロット（背景、移動不可）
    { id: '7', start: '2025-12-12T09:00:00', end: '2025-12-12T10:00:00', title: '9:00-10:00', editable: false, className: 'available-slot' },
    { id: '8', start: '2025-12-12T13:00:00', end: '2025-12-12T14:00:00', title: '13:00-14:00', editable: false, className: 'available-slot' },
    { id: '9', start: '2025-12-12T16:00:00', end: '2025-12-12T18:00:00', title: '16:00-18:00', editable: false, className: 'available-slot' },

    // 移動可能な1時間のイベント
    { id: 'movable-1', start: '2025-12-09T09:00:00', end: '2025-12-09T10:00:00', title: '予約枠', editable: true, className: 'movable-event' },
  ]);

  const handleEventClick = (info: any) => {
    if (!info.event.extendedProps.editable) {
      alert(`予約時間: ${info.event.startStr} - ${info.event.endStr}`);
    }
  };

  const handleEventDrop = (info: any) => {
    const droppedEvent = info.event;
    const newStart = droppedEvent.start;
    const newEnd = droppedEvent.end;

    // 利用可能スロット内に配置されているかチェック
    const isWithinAvailableSlot = events.some((event) => {
      if (!event.className?.includes('available-slot')) return false;

      const slotStart = new Date(event.start);
      const slotEnd = new Date(event.end);

      return newStart >= slotStart && newEnd <= slotEnd;
    });

    if (!isWithinAvailableSlot) {
      // 利用可能スロット外なので元に戻す
      info.revert();
      alert('利用可能な時間帯（青い点線の範囲）内に配置してください');
    } else {
      // イベントの位置を更新（定着させる）
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === droppedEvent.id
            ? {
                ...event,
                start: newStart.toISOString(),
                end: newEnd.toISOString(),
              }
            : event
        )
      );
      console.log('イベントが移動されました:', info.event.title, 'to', newStart);
    }
  };

  const handleEventResize = (info: any) => {
    const resizedEvent = info.event;
    const newStart = resizedEvent.start;
    const newEnd = resizedEvent.end;

    // 利用可能スロット内に収まっているかチェック
    const isWithinAvailableSlot = events.some((event) => {
      if (!event.className?.includes('available-slot')) return false;

      const slotStart = new Date(event.start);
      const slotEnd = new Date(event.end);

      return newStart >= slotStart && newEnd <= slotEnd;
    });

    if (!isWithinAvailableSlot) {
      // 利用可能スロット外なので元に戻す
      info.revert();
      alert('利用可能な時間帯（青い点線の範囲）内に収めてください');
    } else {
      console.log('イベントのサイズが変更されました:', info.event.title);
    }
  };

  const renderDayHeaderContent = (args: any) => {
    const date = args.date;
    const dayOfWeek = date.toLocaleDateString('ja-JP', { weekday: 'short' });
    const dayNumber = date.getDate();
    const isToday = args.isToday;

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
      <div className="custom-day-header">
        <div className="day-name">{dayOfWeek}</div>
        <div className={`day-number ${hasAvailableSlot ? 'has-slots' : ''} ${isToday ? 'is-today' : ''}`}>
          {dayNumber}
        </div>
      </div>
    );
  };

  const handleViewChange = (view: 'timeGridWeek' | 'timeGridThreeDay' | 'timeGridDay') => {
    setCurrentView(view);
  };

  const getViewLabel = () => {
    switch (currentView) {
      case 'timeGridWeek':
        return '週';
      case 'timeGridThreeDay':
        return '3日';
      case 'timeGridDay':
        return '日';
      default:
        return '週';
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-sidebar">
        <h2 className="booking-title">Spirご説明会</h2>
        <p className="booking-description">
          Spir製品における説明・ご紹介を行わせていただきます。
        </p>
        <div className="booking-info">
          <div className="info-item">
            <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>山田太郎</span>
          </div>
          <div className="info-item">
            <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>60分</span>
          </div>
          <div className="info-item">
            <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>日程確定後にリンク発行</span>
          </div>
        </div>
      </div>

      <div className="booking-main">
        <div className="calendar-header">
          <h3 className="calendar-title">日程を選択してください</h3>
          <div className="calendar-controls">
            <button className="control-button">日本標準時間 ▼</button>
            <button className="control-button">リスト</button>
            <button className="control-button active">カレンダー</button>
          </div>
        </div>

        <div className="login-info">
          <svg className="info-icon-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>ログインすると、カレンダーであなたの予定を見ながら日程を選択できます。</span>
          <button className="login-button">ログイン</button>
        </div>

        <div className="calendar-wrapper">
          {showViewMenu && (
            <div className="calendar-view-dropdown-menu">
              <button
                className={`view-dropdown-item ${currentView === 'timeGridDay' ? 'active' : ''}`}
                onClick={() => {
                  handleViewChange('timeGridDay');
                  setShowViewMenu(false);
                }}
              >
                日
              </button>
              <button
                className={`view-dropdown-item ${currentView === 'timeGridThreeDay' ? 'active' : ''}`}
                onClick={() => {
                  handleViewChange('timeGridThreeDay');
                  setShowViewMenu(false);
                }}
              >
                3日
              </button>
              <button
                className={`view-dropdown-item ${currentView === 'timeGridWeek' ? 'active' : ''}`}
                onClick={() => {
                  handleViewChange('timeGridWeek');
                  setShowViewMenu(false);
                }}
              >
                週
              </button>
            </div>
          )}
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView={currentView}
            initialDate={currentView === 'timeGridThreeDay' ? new Date().toISOString().split('T')[0] : '2025-12-09'}
            locale={jaLocale}
            key={currentView}
            headerToolbar={{
              left: 'title',
              center: '',
              right: 'viewSelector prev,next today'
            }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            buttonText={{
              today: '今日'
            }}
            customButtons={{
              viewSelector: {
                text: `${getViewLabel()} ▼`,
                click: () => setShowViewMenu(!showViewMenu)
              }
            }}
            views={{
              timeGridThreeDay: {
                type: 'timeGrid',
                duration: { days: 3 },
                dateIncrement: { days: 3 }
              }
            }}
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            slotDuration="01:00:00"
            snapDuration="00:30:00"
            height="auto"
            events={events}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            eventClassNames={(arg) => {
              return arg.event.extendedProps.className || [];
            }}
            eventDidMount={(info) => {
              if (info.event.extendedProps.className?.includes('movable-event')) {
                const el = info.el;
                el.style.left = '0';
                el.style.right = '0';
                el.style.width = '100%';
                el.style.insetInlineStart = '0';
                el.style.insetInlineEnd = '0';
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
            allDaySlot={false}
            dayHeaderContent={renderDayHeaderContent}
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
      </div>
    </div>
  );
};

export default BookingCalendar;
