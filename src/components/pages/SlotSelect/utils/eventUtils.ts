import { Event } from '../types';

/**
 * available-slotかどうかを判定
 */
export const isAvailableSlot = (event: Event): boolean => {
  return event.className?.includes('available-slot') ?? false;
};

/**
 * イベントがavailable-slotと重なっているかチェック
 */
export const checkEventOverlapsWithSlots = (
  newStart: Date | null,
  newEnd: Date | null,
  availableSlots: Event[]
): boolean => {
  if (!newStart || !newEnd) return false;

  return availableSlots.some(slot => {
    const slotStart = new Date(slot.start);
    const slotEnd = new Date(slot.end);

    // イベントがスロット内に完全に含まれているかチェック
    return newStart >= slotStart && newEnd <= slotEnd;
  });
};
