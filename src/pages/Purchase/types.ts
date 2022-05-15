export type TTransaction = {
  status: number;
  statusString: TransactionStatus;
  statusCode: number;
  errorMessage: string;
  events: TEvent[];
};

export enum TransactionStatus {
  Unknown = 'UNKNOWN',
  Pending = 'PENDING',
  Executed = 'EXECUTED',
  Sealed = 'SEALED',
}

type TEvent = {
  data: Record<string, number | string>;
  eventIndex: number;
  transactionId: string;
  transactionIndex: number;
  type: string;
};
