import { formatDateForApi } from './formatDateForApi';

export const getDateLabel = (dateString: string) => {
  const today = formatDateForApi(new Date());

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const dayBeforeYesterday = new Date();
  dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);

  if (dateString === today) {
    return 'Сегодня';
  }

  if (dateString === formatDateForApi(yesterday)) {
    return 'Вчера';
  }

  if (dateString === formatDateForApi(dayBeforeYesterday)) {
    return 'Позавчера';
  }

  return dateString;
};
