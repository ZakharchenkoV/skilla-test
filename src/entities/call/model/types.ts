type CallErrorType =
  | 'noerrors' // Без ошибок
  | 'noscript' // Скрипт не использован
  | 'timeover' // Превышено время ожидания в очереди удержания
  | 'notavailable' // Вызываемый номер недоступен
  | 'noanswer' // Вызов не получил ответа в течение времени ожидания
  | 'subscribercompleted'; // Вызов завершен вызывающим абонентом;

type CallResultsType =
  | 'is_new' // новый звонок
  | 'message' // обращение
  | 'order' // создан заказ
  | 'preorder' // создан предзаказ
  | 'title' // заголовок
  | 'tooltip'; // всплывающая подсказка(если есть)

type CallStatus = 'Дозвонился' | 'Не дозвонился';

type InOut =
  | null // Все звонки
  | 0 // Исходящий
  | 1; // Входящий;

interface IAbuseAnswers {
  message: string;
  from_support: number;
  support_read_status: number;
  person_read_status: number;
}

interface IAbuse {
  date: string;
  person_name: string;
  message: string;
  support_read_status: number;
  support_answer_status: number;
  answers: IAbuseAnswers[];
}

interface IPartnerData {
  id: string;
  name: string;
  phone: string;
}

interface IError {
  title: CallErrorType;
}

interface IResult {
  type: CallResultsType;
  title: string;
  tooltip: string;
}

interface IStage {
  person_name: string;
  person_surname: string;
  person_mango_phone: string;
  duration: string;
  disconnect_reason: string;
}

export interface ICall {
  id: number;
  partnership_id: string;
  partner_data: IPartnerData;
  date: string;
  date_notime: string;
  time: number;
  from_number: string;
  from_extension: string;
  to_number: string;
  to_extension: string;
  is_skilla: number;
  status: CallStatus;
  record: string;
  line_number: string;
  line_name: string;
  in_out: InOut;
  from_site: number;
  source: string;
  errors: IError[];
  disconnect_reason: string;
  results: IResult[];
  stages: IStage[];
  abuse: IAbuse;
  contact_name: string;
  contact_company: string;
  person_id: number;
  person_name: string;
  person_surname: string;
  person_avatar: string;
}

export interface ICallsResponse {
  results: ICall[];
  total_rows: string;
}

export interface GetCallsParams {
  limit: number;
}

export interface GetRecordParams {
  record: string;
  partnershipId: string;
}

export type CallType = 'Все типы' | 'Входящие' | 'Исходящие';
