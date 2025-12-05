import React from 'react';
import { Event, ViewType } from '../../types';
import './ListView.css';

interface ListViewProps {
  events: Event[];
  currentDate: Date;
  currentView: ViewType;
}

const ListView: React.FC<ListViewProps> = ({ events, currentDate, currentView }) => {
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

  const slotsByDate = getAvailableSlotsByDate();
  const weekDates = getWeekDates();

  // 曜日を取得
  const getDayOfWeek = (date: Date): string => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return days[date.getDay()];
  };

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
          const dayOfWeek = getDayOfWeek(date);

          return (
            <div key={index} className="list-view-day-column">
              <div className="list-view-day-header">
                {parseInt(day)}日({dayOfWeek})
              </div>
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

export default ListView;
