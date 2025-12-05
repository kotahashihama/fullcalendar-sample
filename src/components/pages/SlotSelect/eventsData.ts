import { Event, User } from './types';

// ユーザーデータ
export const users: User[] = [
  { id: '1', name: 'taro.yamada@gmail.com', email: 'taro.yamada@gmail.com', userClass: 'user-1' },
  { id: '2', name: 'kenji.tanaka@gmail.com', email: 'kenji.tanaka@gmail.com', userClass: 'user-2' },
  { id: '3', name: 'yuki.suzuki@gmail.com', email: 'yuki.suzuki@gmail.com', userClass: 'user-3' },
  { id: '4', name: 'haruka.kobayashi@gmail.com', email: 'haruka.kobayashi@gmail.com', userClass: 'user-4' },
  { id: '5', name: 'takeshi.ito@gmail.com', email: 'takeshi.ito@gmail.com', userClass: 'user-5' },
  { id: '6', name: 'ayumi.nakamura@gmail.com', email: 'ayumi.nakamura@gmail.com', userClass: 'user-6' },
  { id: '7', name: 'Hanako Sato', email: 'hanako.sato@example.com', userClass: 'user-7' },
  { id: '8', name: 'Kazuki Watanabe', email: 'kazuki.watanabe@example.com', userClass: 'user-8' },
];

// 既存の予定データ（モック）
export const existingEvents: Event[] = [
  // ユーザー1の予定（紫）
  { id: 'existing-1', start: '2025-12-09T10:00:00', end: '2025-12-09T11:00:00', title: '会議A', editable: false, className: 'existing-event user-1' },
  { id: 'existing-2', start: '2025-12-09T14:00:00', end: '2025-12-09T15:00:00', title: 'MTG', editable: false, className: 'existing-event user-1' },
  { id: 'existing-3', start: '2025-12-11T11:00:00', end: '2025-12-11T12:00:00', title: 'ランチ', editable: false, className: 'existing-event user-1' },
  { id: 'existing-13', start: '2025-12-10T10:00:00', end: '2025-12-10T11:00:00', title: '開発作業', editable: false, className: 'existing-event user-1' },
  { id: 'existing-14', start: '2025-12-11T13:00:00', end: '2025-12-11T14:30:00', title: 'レビュー', editable: false, className: 'existing-event user-1' },

  // ユーザー2の予定（緑）
  { id: 'existing-4', start: '2025-12-10T10:00:00', end: '2025-12-10T11:00:00', title: '朝会', editable: false, className: 'existing-event user-2' },
  { id: 'existing-5', start: '2025-12-10T13:00:00', end: '2025-12-10T14:30:00', title: 'レビュー', editable: false, className: 'existing-event user-2' },
  { id: 'existing-6', start: '2025-12-12T10:00:00', end: '2025-12-12T11:30:00', title: '打ち合わせ', editable: false, className: 'existing-event user-2' },
  { id: 'existing-15', start: '2025-12-11T13:00:00', end: '2025-12-11T14:00:00', title: 'コードレビュー', editable: false, className: 'existing-event user-2' },
  { id: 'existing-16', start: '2025-12-09T10:00:00', end: '2025-12-09T11:30:00', title: 'スプリント計画', editable: false, className: 'existing-event user-2' },

  // ユーザー3の予定（オレンジ）
  { id: 'existing-7', start: '2025-12-09T15:00:00', end: '2025-12-09T16:30:00', title: 'プロジェクト会議', editable: false, className: 'existing-event user-3' },
  { id: 'existing-8', start: '2025-12-11T14:00:00', end: '2025-12-11T15:30:00', title: '定例会', editable: false, className: 'existing-event user-3' },
  { id: 'existing-9', start: '2025-12-12T15:00:00', end: '2025-12-12T17:00:00', title: 'ワークショップ', editable: false, className: 'existing-event user-3' },
  { id: 'existing-17', start: '2025-12-10T13:30:00', end: '2025-12-10T15:00:00', title: '設計会議', editable: false, className: 'existing-event user-3' },
  { id: 'existing-18', start: '2025-12-10T10:00:00', end: '2025-12-10T11:00:00', title: '進捗確認', editable: false, className: 'existing-event user-3' },

  // ユーザー4の予定（ピンク）
  { id: 'existing-10', start: '2025-12-08T10:00:00', end: '2025-12-08T11:00:00', title: '週次MTG', editable: false, className: 'existing-event user-4' },
  { id: 'existing-11', start: '2025-12-10T15:00:00', end: '2025-12-10T16:00:00', title: '1on1', editable: false, className: 'existing-event user-4' },
  { id: 'existing-12', start: '2025-12-11T16:00:00', end: '2025-12-11T17:30:00', title: 'チーム会議', editable: false, className: 'existing-event user-4' },
  { id: 'existing-19', start: '2025-12-10T10:00:00', end: '2025-12-10T11:00:00', title: 'デモ準備', editable: false, className: 'existing-event user-4' },
  { id: 'existing-20', start: '2025-12-11T13:30:00', end: '2025-12-11T14:30:00', title: '仕様確認', editable: false, className: 'existing-event user-4' },

  // ユーザー5の予定（青）
  { id: 'existing-21', start: '2025-12-10T10:00:00', end: '2025-12-10T11:00:00', title: 'システム設計', editable: false, className: 'existing-event user-5' },
  { id: 'existing-22', start: '2025-12-11T10:00:00', end: '2025-12-11T11:30:00', title: '要件定義', editable: false, className: 'existing-event user-5' },
  { id: 'existing-23', start: '2025-12-12T14:00:00', end: '2025-12-12T15:30:00', title: 'テスト計画', editable: false, className: 'existing-event user-5' },

  // ユーザー6の予定（赤）
  { id: 'existing-24', start: '2025-12-10T10:00:00', end: '2025-12-10T11:00:00', title: 'セキュリティ監査', editable: false, className: 'existing-event user-6' },
  { id: 'existing-25', start: '2025-12-11T09:00:00', end: '2025-12-11T10:30:00', title: 'インシデント対応', editable: false, className: 'existing-event user-6' },
  { id: 'existing-26', start: '2025-12-09T13:30:00', end: '2025-12-09T15:00:00', title: 'リスク分析', editable: false, className: 'existing-event user-6' },

  // ユーザー7の予定（黄）
  { id: 'existing-27', start: '2025-12-10T10:00:00', end: '2025-12-10T11:00:00', title: 'マーケティング会議', editable: false, className: 'existing-event user-7' },
  { id: 'existing-28', start: '2025-12-11T15:00:00', end: '2025-12-11T16:30:00', title: 'キャンペーン企画', editable: false, className: 'existing-event user-7' },
  { id: 'existing-29', start: '2025-12-12T11:00:00', end: '2025-12-12T12:00:00', title: '広告レビュー', editable: false, className: 'existing-event user-7' },

  // ユーザー8の予定（シアン）
  { id: 'existing-30', start: '2025-12-10T10:00:00', end: '2025-12-10T11:00:00', title: 'データ分析', editable: false, className: 'existing-event user-8' },
  { id: 'existing-31', start: '2025-12-11T11:30:00', end: '2025-12-11T13:00:00', title: 'レポート作成', editable: false, className: 'existing-event user-8' },
  { id: 'existing-32', start: '2025-12-09T11:00:00', end: '2025-12-09T12:30:00', title: '統計処理', editable: false, className: 'existing-event user-8' },

  // 12/14-20の週の予定
  // ユーザー1の予定（紫）
  { id: 'existing-33', start: '2025-12-16T10:00:00', end: '2025-12-16T11:00:00', title: '会議B', editable: false, className: 'existing-event user-1' },
  { id: 'existing-34', start: '2025-12-16T14:00:00', end: '2025-12-16T15:30:00', title: 'プレゼン準備', editable: false, className: 'existing-event user-1' },
  { id: 'existing-35', start: '2025-12-18T11:00:00', end: '2025-12-18T12:00:00', title: '部署MTG', editable: false, className: 'existing-event user-1' },

  // ユーザー2の予定（緑）
  { id: 'existing-36', start: '2025-12-16T09:00:00', end: '2025-12-16T10:00:00', title: '朝会', editable: false, className: 'existing-event user-2' },
  { id: 'existing-37', start: '2025-12-17T13:00:00', end: '2025-12-17T14:30:00', title: 'ペアプログラミング', editable: false, className: 'existing-event user-2' },
  { id: 'existing-38', start: '2025-12-19T10:00:00', end: '2025-12-19T11:30:00', title: 'ふりかえり', editable: false, className: 'existing-event user-2' },

  // ユーザー3の予定（オレンジ）
  { id: 'existing-39', start: '2025-12-16T15:00:00', end: '2025-12-16T16:30:00', title: '企画会議', editable: false, className: 'existing-event user-3' },
  { id: 'existing-40', start: '2025-12-18T14:00:00', end: '2025-12-18T15:30:00', title: 'クライアント打ち合わせ', editable: false, className: 'existing-event user-3' },
  { id: 'existing-41', start: '2025-12-19T15:00:00', end: '2025-12-19T17:00:00', title: 'デザインレビュー', editable: false, className: 'existing-event user-3' },

  // ユーザー4の予定（ピンク）
  { id: 'existing-42', start: '2025-12-15T10:00:00', end: '2025-12-15T11:00:00', title: '週次報告', editable: false, className: 'existing-event user-4' },
  { id: 'existing-43', start: '2025-12-17T15:00:00', end: '2025-12-17T16:00:00', title: 'メンター面談', editable: false, className: 'existing-event user-4' },
  { id: 'existing-44', start: '2025-12-18T16:00:00', end: '2025-12-18T17:30:00', title: '部門会議', editable: false, className: 'existing-event user-4' },

  // ユーザー5の予定（青）
  { id: 'existing-45', start: '2025-12-17T10:00:00', end: '2025-12-17T11:30:00', title: 'アーキテクチャレビュー', editable: false, className: 'existing-event user-5' },
  { id: 'existing-46', start: '2025-12-18T10:00:00', end: '2025-12-18T11:30:00', title: 'API設計', editable: false, className: 'existing-event user-5' },
  { id: 'existing-47', start: '2025-12-19T14:00:00', end: '2025-12-19T15:30:00', title: 'パフォーマンス検証', editable: false, className: 'existing-event user-5' },

  // ユーザー6の予定（赤）
  { id: 'existing-48', start: '2025-12-17T10:00:00', end: '2025-12-17T11:00:00', title: '脆弱性診断', editable: false, className: 'existing-event user-6' },
  { id: 'existing-49', start: '2025-12-18T09:00:00', end: '2025-12-18T10:30:00', title: 'セキュリティパッチ', editable: false, className: 'existing-event user-6' },
  { id: 'existing-50', start: '2025-12-16T13:30:00', end: '2025-12-16T15:00:00', title: 'コンプライアンス確認', editable: false, className: 'existing-event user-6' },

  // ユーザー7の予定（黄）
  { id: 'existing-51', start: '2025-12-17T10:00:00', end: '2025-12-17T11:00:00', title: 'SNS戦略会議', editable: false, className: 'existing-event user-7' },
  { id: 'existing-52', start: '2025-12-18T15:00:00', end: '2025-12-18T16:30:00', title: 'コンテンツ企画', editable: false, className: 'existing-event user-7' },
  { id: 'existing-53', start: '2025-12-19T11:00:00', end: '2025-12-19T12:00:00', title: '効果測定', editable: false, className: 'existing-event user-7' },

  // ユーザー8の予定（シアン）
  { id: 'existing-54', start: '2025-12-17T10:00:00', end: '2025-12-17T11:00:00', title: 'BIツール検討', editable: false, className: 'existing-event user-8' },
  { id: 'existing-55', start: '2025-12-18T11:30:00', end: '2025-12-18T13:00:00', title: 'ダッシュボード作成', editable: false, className: 'existing-event user-8' },
  { id: 'existing-56', start: '2025-12-16T11:00:00', end: '2025-12-16T12:30:00', title: 'データクレンジング', editable: false, className: 'existing-event user-8' },

  // 週末（12/14、12/20）の予定
  // 日曜日 12/14 の予定
  { id: 'existing-57', start: '2025-12-14T10:00:00', end: '2025-12-14T11:00:00', title: '個人面談', editable: false, className: 'existing-event user-1' },
  { id: 'existing-58', start: '2025-12-14T14:00:00', end: '2025-12-14T15:30:00', title: 'ワークショップ', editable: false, className: 'existing-event user-3' },
  { id: 'existing-59', start: '2025-12-14T11:00:00', end: '2025-12-14T12:00:00', title: 'スキルアップ講座', editable: false, className: 'existing-event user-5' },

  // 土曜日 12/20 の予定
  { id: 'existing-60', start: '2025-12-20T10:00:00', end: '2025-12-20T11:00:00', title: 'チームビルディング', editable: false, className: 'existing-event user-2' },
  { id: 'existing-61', start: '2025-12-20T13:00:00', end: '2025-12-20T14:30:00', title: '社内勉強会', editable: false, className: 'existing-event user-4' },
  { id: 'existing-62', start: '2025-12-20T15:00:00', end: '2025-12-20T16:00:00', title: 'メンテナンス作業', editable: false, className: 'existing-event user-6' },
];

export const events: Event[] = [
  // 既存の予定（背景に表示）
  ...existingEvents,

  // 終日イベント
  { id: 'allday-1', start: '2025-12-09', end: '2025-12-09', title: '祝日', allDay: true, editable: false, className: 'existing-event allday-event user-1' },
  { id: 'allday-2', start: '2025-12-09', end: '2025-12-09', title: '研修日', allDay: true, editable: false, className: 'existing-event allday-event user-3' },
  { id: 'allday-3', start: '2025-12-10', end: '2025-12-10', title: '有給休暇', allDay: true, editable: false, className: 'existing-event allday-event user-2' },
  { id: 'allday-4', start: '2025-12-11', end: '2025-12-11', title: '社内イベント', allDay: true, editable: false, className: 'existing-event allday-event user-2' },
  { id: 'allday-5', start: '2025-12-11', end: '2025-12-11', title: '全社会議', allDay: true, editable: false, className: 'existing-event allday-event user-4' },
  { id: 'allday-6', start: '2025-12-12', end: '2025-12-12', title: 'メンテナンス日', allDay: true, editable: false, className: 'existing-event allday-event user-1' },
  { id: 'allday-7', start: '2025-12-12', end: '2025-12-12', title: 'リリース作業', allDay: true, editable: false, className: 'existing-event allday-event user-3' },

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

  // 12/14-20の週の利用可能スロット
  // 日曜日 12/14 の利用可能スロット（背景、移動不可）
  { id: '10', start: '2025-12-14T10:00:00', end: '2025-12-14T12:00:00', title: '10:00-12:00', editable: false, className: 'available-slot' },
  { id: '11', start: '2025-12-14T13:00:00', end: '2025-12-14T15:00:00', title: '13:00-15:00', editable: false, className: 'available-slot' },

  // 月曜日 12/15 の利用可能スロット（背景、移動不可）
  { id: '12', start: '2025-12-15T09:00:00', end: '2025-12-15T11:00:00', title: '9:00-11:00', editable: false, className: 'available-slot' },
  { id: '13', start: '2025-12-15T13:00:00', end: '2025-12-15T15:00:00', title: '13:00-15:00', editable: false, className: 'available-slot' },
  { id: '14', start: '2025-12-15T16:00:00', end: '2025-12-15T18:00:00', title: '16:00-18:00', editable: false, className: 'available-slot' },

  // 火曜日 12/16 の利用可能スロット（背景、移動不可）
  { id: '15', start: '2025-12-16T09:00:00', end: '2025-12-16T11:00:00', title: '9:00-11:00', editable: false, className: 'available-slot' },
  { id: '16', start: '2025-12-16T13:00:00', end: '2025-12-16T14:00:00', title: '13:00-14:00', editable: false, className: 'available-slot' },
  { id: '17', start: '2025-12-16T16:00:00', end: '2025-12-16T18:00:00', title: '16:00-18:00', editable: false, className: 'available-slot' },

  // 水曜日 12/17 の利用可能スロット（背景、移動不可）
  { id: '18', start: '2025-12-17T09:00:00', end: '2025-12-17T10:00:00', title: '9:00-10:00', editable: false, className: 'available-slot' },
  { id: '19', start: '2025-12-17T13:00:00', end: '2025-12-17T15:00:00', title: '13:00-15:00', editable: false, className: 'available-slot' },
  { id: '20', start: '2025-12-17T16:00:00', end: '2025-12-17T18:00:00', title: '16:00-18:00', editable: false, className: 'available-slot' },

  // 木曜日 12/18 の利用可能スロット（背景、移動不可）
  { id: '21', start: '2025-12-18T09:00:00', end: '2025-12-18T10:00:00', title: '9:00-10:00', editable: false, className: 'available-slot' },
  { id: '22', start: '2025-12-18T13:00:00', end: '2025-12-18T15:00:00', title: '13:00-15:00', editable: false, className: 'available-slot' },
  { id: '23', start: '2025-12-18T16:00:00', end: '2025-12-18T18:00:00', title: '16:00-18:00', editable: false, className: 'available-slot' },

  // 金曜日 12/19 の利用可能スロット（背景、移動不可）
  { id: '24', start: '2025-12-19T09:00:00', end: '2025-12-19T10:00:00', title: '9:00-10:00', editable: false, className: 'available-slot' },
  { id: '25', start: '2025-12-19T13:00:00', end: '2025-12-19T14:00:00', title: '13:00-14:00', editable: false, className: 'available-slot' },
  { id: '26', start: '2025-12-19T16:00:00', end: '2025-12-19T18:00:00', title: '16:00-18:00', editable: false, className: 'available-slot' },

  // 土曜日 12/20 の利用可能スロット（背景、移動不可）
  { id: '27', start: '2025-12-20T10:00:00', end: '2025-12-20T12:00:00', title: '10:00-12:00', editable: false, className: 'available-slot' },
  { id: '28', start: '2025-12-20T13:00:00', end: '2025-12-20T15:00:00', title: '13:00-15:00', editable: false, className: 'available-slot' },
];
