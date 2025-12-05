import { ViewType } from '../types';

/**
 * 週の開始日（日曜日）を取得
 */
export const getWeekStartDate = (date: Date): Date => {
  const dayOfWeek = date.getDay();
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - dayOfWeek);
  return sunday;
};

/**
 * ビュータイプに応じたヘッダー日付の配列を取得
 */
export const getHeaderDates = (baseDate: Date, viewType: ViewType): Date[] => {
  if (viewType === 'timeGridWeek') {
    const sunday = getWeekStartDate(baseDate);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      dates.push(date);
    }
    return dates;
  } else if (viewType === 'timeGridThreeDay') {
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

/**
 * ビュータイプに応じた日付オフセットを計算
 */
export const calculateDateOffset = (
  currentDate: Date,
  viewType: ViewType,
  direction: 'prev' | 'next'
): Date => {
  const newDate = new Date(currentDate);
  let offset = 7;

  if (viewType === 'timeGridDay') {
    offset = 1;
  } else if (viewType === 'timeGridThreeDay') {
    offset = 3;
  }

  if (direction === 'prev') {
    newDate.setDate(newDate.getDate() - offset);
  } else {
    newDate.setDate(newDate.getDate() + offset);
  }

  return newDate;
};

/**
 * 今日の日付を取得（ビュータイプに応じて調整）
 */
export const getTodayDate = (viewType: ViewType): Date => {
  const today = new Date();

  if (viewType === 'timeGridWeek') {
    return getWeekStartDate(today);
  } else if (viewType === 'timeGridThreeDay') {
    return today;
  } else {
    return today;
  }
};
