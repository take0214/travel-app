export type ItineraryBase = {
  id: string;
  type: 'divider' | 'item';
};

export type DateDivider = ItineraryBase & {
  type: 'divider';
  date: string;
};

export type ItineraryItem = ItineraryBase & {
  type: 'item';
  startTime?: string;
  endTime?: string;
  category?: string;
  moveMethod?: string;
  moveMethodCustom?: string;
  place?: string;
  url?: string;
  notes?: string;
};

export const CATEGORY_OPTIONS = [
  { value: 'meal', label: 'ご飯' },
  { value: 'move', label: '移動' },
  { value: 'activity', label: 'アクティビティ' },
  { value: 'shopping', label: 'ショッピング' },
  { value: 'other', label: 'その他' },
];

export const MOVE_METHOD_OPTIONS = [
  { value: 'walk', label: '徒歩' },
  { value: 'train', label: '電車' },
  { value: 'bus', label: 'バス' },
  { value: 'car', label: '車' },
  { value: 'airplane', label: '飛行機' },
  { value: 'other', label: 'その他' },
];

export const createEmptyDateDivider = (): DateDivider => ({
  id: `divider-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  type: 'divider',
  date: new Date().toISOString().split('T')[0],
});

export const createEmptyItineraryItem = (initialCategory = 'meal') => ({
  id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  type: 'item' as const,
  startTime: '',
  endTime: '',
  category: initialCategory,
  moveMethod: 'train',
  moveMethodCustom: '',
  place: '',
  url: '',
  notes: '',
});
