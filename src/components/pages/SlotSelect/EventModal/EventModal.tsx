import React from 'react';
import { Event } from '../types';
import './EventModal.css';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  const formatDateTime = (dateString: string, isAllDay: boolean) => {
    const date = new Date(dateString);
    if (isAllDay) {
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{event.title || '予定'}</h2>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {event.allDay && (
            <div className="modal-info-item">
              <span className="modal-info-label">終日</span>
              <span className="modal-info-value">はい</span>
            </div>
          )}
          <div className="modal-info-item">
            <span className="modal-info-label">{event.allDay ? '日付' : '開始時刻'}</span>
            <span className="modal-info-value">{formatDateTime(event.start, event.allDay || false)}</span>
          </div>
          {!event.allDay && (
            <div className="modal-info-item">
              <span className="modal-info-label">終了時刻</span>
              <span className="modal-info-value">{formatDateTime(event.end, false)}</span>
            </div>
          )}
          {event.id && (
            <div className="modal-info-item">
              <span className="modal-info-label">ID</span>
              <span className="modal-info-value">{event.id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
