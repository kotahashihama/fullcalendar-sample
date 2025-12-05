import React from 'react';
import './PageSidebar.css';

const PageSidebar: React.FC = () => {
  return (
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
      <div className="language-selector">
        <button className="language-button">日本語 ▼</button>
      </div>
    </div>
  );
};

export default PageSidebar;
