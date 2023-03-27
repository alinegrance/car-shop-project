import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(iCar: ICar) {
    super(iCar);
    this.doorsQty = iCar.doorsQty;
    this.seatsQty = iCar.seatsQty;
  }
}