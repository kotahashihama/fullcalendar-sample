import React, { useState, useRef, useEffect } from 'react';
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
  const calendarRef = useRef<FullCalendar>(null);
  const [currentView, setCurrentView] = useState<'timeGridWeek' | 'timeGridThreeDay' | 'timeGridDay'>('timeGridWeek');
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2025-12-07'));

  // viewModeやcurrentDateが変更されたときにカレンダーの日付を同期
  useEffect(() => {
    if (viewMode === 'calendar') {
      // setTimeoutでFullCalendarの初期化を待つ
      const timer = setTimeout(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          calendarApi.gotoDate(currentDate);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [currentDate, viewMode]);

  const events: Event[] = [
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

    // 移動可能なイベント（最初のスロット内に配置）
    { id: 'movable-1', start: '2025-12-09T09:00:00', end: '2025-12-09T10:00:00', title: '予約枠', editable: true, className: 'movable-event' },
  ];

  const handleEventClick = (info: any) => {
    // クリックハンドラーは不要
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

  // リストビュー用：日付ごとに利用可能スロットをグループ化
  const getAvailableSlotsByDate = () => {
    const slotsByDate: { [date: string]: { time: string; start: string; end: string }[] } = {};

    events
      .filter(event => event.className?.includes('available-slot'))
      .forEach(event => {
        const date = event.start.split('T')[0];
        const startTime = new Date(event.start);
        const endTime = new Date(event.end);

        if (!slotsByDate[date]) {
          slotsByDate[date] = [];
        }

        // 30分刻みでスロットを生成
        let currentTime = new Date(startTime);
        while (currentTime < endTime) {
          const nextTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
          const timeStr = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
          slotsByDate[date].push({
            time: timeStr,
            start: currentTime.toISOString(),
            end: nextTime.toISOString()
          });
          currentTime = nextTime;
        }
      });

    return slotsByDate;
  };

  // リストビュー用：週の日付を取得
  const getWeekDates = () => {
    const dates = [];
    const baseDate = new Date(currentDate);

    if (currentView === 'timeGridWeek') {
      // 週ビュー: 日曜日から7日間
      const sunday = new Date(baseDate);
      sunday.setDate(baseDate.getDate() - baseDate.getDay());
      for (let i = 0; i < 7; i++) {
        const date = new Date(sunday);
        date.setDate(sunday.getDate() + i);
        dates.push(date);
      }
    } else if (currentView === 'timeGridThreeDay') {
      // 3日ビュー: 現在日から3日間
      for (let i = 0; i < 3; i++) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + i);
        dates.push(date);
      }
    } else {
      // 日ビュー: 現在日のみ
      dates.push(baseDate);
    }
    return dates;
  };

  // 前へ移動
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    let offset = 7; // デフォルトは週

    if (currentView === 'timeGridDay') {
      offset = 1;
    } else if (currentView === 'timeGridThreeDay') {
      offset = 3;
    }

    newDate.setDate(newDate.getDate() - offset);
    setCurrentDate(newDate);
  };

  // 次へ移動
  const handleNext = () => {
    const newDate = new Date(currentDate);
    let offset = 7; // デフォルトは週

    if (currentView === 'timeGridDay') {
      offset = 1;
    } else if (currentView === 'timeGridThreeDay') {
      offset = 3;
    }

    newDate.setDate(newDate.getDate() + offset);
    setCurrentDate(newDate);
  };

  // 今日へ移動
  const handleToday = () => {
    const today = new Date();

    if (currentView === 'timeGridWeek') {
      // 週ビュー: 今週の日曜日
      const dayOfWeek = today.getDay();
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - dayOfWeek);
      setCurrentDate(sunday);
    } else if (currentView === 'timeGridThreeDay') {
      // 3日ビュー: 今日を起点にした3日間
      setCurrentDate(today);
    } else {
      // 日ビュー: 今日
      setCurrentDate(today);
    }
  };

  // 共通の日付ヘッダー用の日付を取得
  const getHeaderDates = () => {
    // リストとカレンダーで共通の日付を使用
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

  // 共通のカレンダーヘッダーをレンダリング
  const renderCalendarHeader = () => {
    const yearMonth = currentDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });

    const onPrev = () => {
      if (viewMode === 'calendar') {
        // カレンダービューの場合、FullCalendar APIを使用して移動してから状態を同期
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          calendarApi.prev();
          const newDate = calendarApi.getDate();
          setCurrentDate(newDate);
        }
      } else {
        // リストビューの場合、状態を更新
        handlePrev();
      }
    };

    const onNext = () => {
      if (viewMode === 'calendar') {
        // カレンダービューの場合、FullCalendar APIを使用して移動してから状態を同期
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          calendarApi.next();
          const newDate = calendarApi.getDate();
          setCurrentDate(newDate);
        }
      } else {
        // リストビューの場合、状態を更新
        handleNext();
      }
    };

    const onToday = () => {
      if (viewMode === 'calendar') {
        // カレンダービューの場合、FullCalendar APIを使用して移動してから状態を同期
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          calendarApi.today();
          const newDate = calendarApi.getDate();
          setCurrentDate(newDate);
        }
      } else {
        // リストビューの場合、状態を更新
        handleToday();
      }
    };

    return (
      <div className="common-calendar-header">
        <div className="common-calendar-title">{yearMonth}</div>
        <div className="common-calendar-controls">
          <button className="common-control-button" onClick={() => setShowViewMenu(!showViewMenu)}>
            {getViewLabel()} ▼
          </button>
          <div className="common-nav-buttons">
            <button className="common-nav-button" onClick={onPrev}>‹</button>
            <button className="common-nav-button" onClick={onNext}>›</button>
            <button className="common-today-button" onClick={onToday}>今日</button>
          </div>
        </div>
      </div>
    );
  };

  // 共通の日付ヘッダーをレンダリング
  const renderDayHeaders = () => {
    const dates = getHeaderDates();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div className="common-day-headers">
        {dates.map((date, index) => {
          const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
          const dayNumber = date.getDate();
          const dateStr = date.toISOString().split('T')[0];

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

  const renderListView = () => {
    const slotsByDate = getAvailableSlotsByDate();
    const weekDates = getWeekDates();

    return (
      <div className="list-view">
        <div className="list-view-content">
          {weekDates.map((date, index) => {
            // タイムゾーンを考慮してローカル日付を取得
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;
            const hasSlots = slotsByDate[dateStr] && slotsByDate[dateStr].length > 0;

            return (
              <div key={index} className="list-view-day-column">
                <div className="list-view-slots">
                  {hasSlots ? (
                    slotsByDate[dateStr].map((slot, slotIndex) => (
                      <button key={slotIndex} className="list-slot-button">
                        {slot.time}
                      </button>
                    ))
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
            <button
              className={`control-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              リスト
            </button>
            <button
              className={`control-button ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              カレンダー
            </button>
          </div>
        </div>

        <div className="login-info">
          <svg className="info-icon-blue" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span>ログインすると、カレンダーであなたの予定を見ながら日程を選択できます。</span>
          <button className="login-button">ログイン</button>
        </div>

        {renderCalendarHeader()}
        {renderDayHeaders()}

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

        {viewMode === 'calendar' ? (
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
              const isMovableEvent = info.event.extendedProps.className?.includes('movable-event');

              if (isMovableEvent) {
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
        ) : (
          renderListView()
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;
