import { useState, useEffect, RefObject } from 'react';
import { ViewType, ViewMode } from '../types';
import { CalendarViewRef } from '../View/CalendarView/CalendarView';
import { calculateDateOffset, getTodayDate, getWeekStartDate } from '../utils/dateUtils';

export const useCalendarNavigation = (calendarRef: RefObject<CalendarViewRef | null>) => {
  const [currentView, setCurrentView] = useState<ViewType>('timeGridWeek');
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2025-12-07'));

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
  }, [currentDate, viewMode, calendarRef]);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    if (view === 'timeGridDay') {
      const today = getTodayDate('timeGridDay');
      setCurrentDate(today);
    } else if (view === 'timeGridWeek') {
      const today = new Date();
      const sunday = getWeekStartDate(today);
      setCurrentDate(sunday);
    } else if (view === 'timeGridThreeDay') {
      setCurrentDate(new Date());
    }
  };

  const handlePrev = () => {
    const newDate = calculateDateOffset(currentDate, currentView, 'prev');
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = calculateDateOffset(currentDate, currentView, 'next');
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = getTodayDate(currentView);
    setCurrentDate(today);
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

  return {
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
  };
};
