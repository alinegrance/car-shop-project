import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarsODM';

export default class CarService {
  private _carODM: CarODM;

  constructor() {
    this._carODM = new CarODM();
  }

  private _createDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const newCar = await this._carODM.create(car);
    // console.log(newCar);
    return this._createDomain(newCar);
  }
}