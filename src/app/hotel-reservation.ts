export class HotelReservation {
  public id: number;
  public hotelId: number;
  public rooms: number[];
  public username: string;
  public checkInDate: Date;
  public checkOutDate: Date;
  public numberOfNights: number;
  public total: number;
  public extraServices: number[];

}
