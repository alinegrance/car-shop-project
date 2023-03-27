import IMotorcycle from '../Interfaces/IMotorcycle';
import CategoryTypes from '../utils/CategoryTypes';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: CategoryTypes;
  private engineCapacity: number;

  constructor(iMotorcycle: IMotorcycle) {
    super(iMotorcycle);
    this.category = iMotorcycle.category as CategoryTypes;
    this.engineCapacity = iMotorcycle.engineCapacity;
  }
}