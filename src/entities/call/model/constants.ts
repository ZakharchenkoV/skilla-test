import type { CallType } from './types';

export const CALL_TYPES = ['Все типы', 'Входящие', 'Исходящие'] as const;

export const DEFAULT_CALL_TYPE: CallType = 'Все типы';
