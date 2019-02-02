export class  Room {

  constructor( costPerNight: number, capacity: number, floor: number, hasBalcony: boolean, roomType: string) {

    this.costPerNight = costPerNight;
    this.capacity = capacity;
    this.floor = floor;
    this.hasBalcony = hasBalcony;
    this.roomType = roomType;
  }

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
}
