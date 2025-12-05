import React from 'react';
import { ViewType, ViewMode } from '../../../types';
import './Navigation.css';

interface NavigationProps {
  currentDate: Date;
  currentView: ViewType;
  viewMode: ViewMode;
  showViewMenu: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onViewChange: (view: ViewType) => void;
  onToggleViewMenu: () => void;
  onToggleCalendarSettings?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentDate,
  currentView,
  viewMode,
  showViewMenu,
  onPrev,
  onNext,
  onToday,
  onViewChange,
  onToggleViewMenu,
  onToggleCalendarSettings,
}) => {
  const yearMonth = currentDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });

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
    <>
      <div className="common-calendar-header">
        <div className="common-calendar-title">{yearMonth}</div>
        <div className="common-calendar-controls">
          <button className="common-control-button" onClick={onToggleViewMenu}>
            {getViewLabel()} ▼
          </button>
          <div className="common-nav-buttons">
            <button className="common-today-button" onClick={onToday}>今日</button>
            <button className="common-nav-button" onClick={onPrev}>‹</button>
            <button className="common-nav-button" onClick={onNext}>›</button>
            {viewMode === 'calendar' && onToggleCalendarSettings && (
              <button className="calendar-settings-button" onClick={onToggleCalendarSettings}>
                カレンダー設定
              </button>
            )}
          </div>
        </div>
      </div>

      {showViewMenu && (
        <div className="calendar-view-dropdown-menu">
          <button
            className={`view-dropdown-item ${currentView === 'timeGridDay' ? 'active' : ''}`}
            onClick={() => {
              onViewChange('timeGridDay');
              onToggleViewMenu();
            }}
          >
            日
          </button>
          <button
            className={`view-dropdown-item ${currentView === 'timeGridThreeDay' ? 'active' : ''}`}
            onClick={() => {
              onViewChange('timeGridThreeDay');
              onToggleViewMenu();
            }}
          >
            3日
          </button>
          <button
            className={`view-dropdown-item ${currentView === 'timeGridWeek' ? 'active' : ''}`}
            onClick={() => {
              onViewChange('timeGridWeek');
              onToggleViewMenu();
            }}
          >
            週
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
