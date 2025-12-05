import { useState } from 'react';
import { Event } from '../types';
import { EventClickArg } from '@fullcalendar/core';
import { checkEventOverlapsWithSlots, isAvailableSlot } from '../utils/eventUtils';

export const useEventHandlers = (filteredEvents: Event[]) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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
        allDay: clickedEvent.allDay,
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
    const availableSlots = filteredEvents.filter(isAvailableSlot);
    const overlapsWithAvailableSlot = checkEventOverlapsWithSlots(
      newStart,
      newEnd,
      availableSlots
    );

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
    const availableSlots = filteredEvents.filter(isAvailableSlot);
    const overlapsWithAvailableSlot = checkEventOverlapsWithSlots(
      newStart,
      newEnd,
      availableSlots
    );

    if (!overlapsWithAvailableSlot) {
      (info as { revert: () => void }).revert();
      alert('利用可能な時間帯内でのみリサイズできます');
    }
  };

  return {
    isModalOpen,
    selectedEvent,
    handleEventClick,
    handleCloseModal,
    handleEventDrop,
    handleEventResize,
  };
};
