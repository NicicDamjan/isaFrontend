export class RoomOnDiscount {
  id: number;
  reserved: boolean;
  costPerNight: number;
  hotelId: number;
  capacity: number;
  floor: number;
  hasBalcony: boolean;
  balkon: string;
  roomType: string;
  costValidFrom: Date;
  costValidUntil: Date;
  reservedFrom: Date;
  reservedUntil: Date;
  originalPrice: number;
}
