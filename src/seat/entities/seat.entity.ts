export enum SeatType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
}

export enum SeatStatus {
  NEW = 'NEW',
  BOOKED = 'BOOKED',
}

export class SeatEntity {
  id: string;
  name: string;
  type: SeatType;
  room_id: string;
  status: SeatStatus;
  capacity: number;
}
