import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarsODM';
import CustomError from '../utils/CustomError';
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from '../utils/httpStatus';

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

  private _validateId(id: string) {
    if (!isValidObjectId(id)) {
      throw new CustomError('Invalid mongo id', UNPROCESSABLE_ENTITY);
    }
  }

  public async create(car: ICar) {
    const newCar = await this._carODM.create(car);
    // console.log(newCar);
    return this._createDomain(newCar);
  }

  public async getAll() {
    const cars = await this._carODM.getAll();
    return cars.map((car: ICar) => this._createDomain(car));
  }

  public async getById(id: string) {
    this._validateId(id);
    const car = await this._carODM.getById(id);
    if (!car) {
      throw new CustomError('Car not found', NOT_FOUND);
    }
    return this._createDomain(car);
  }

  public async update(id: string, car: Partial<ICar>) {
    this._validateId(id);
    const updatedCar = await this._carODM.update(id, car);
    if (!updatedCar) {
      throw new CustomError('Car not found', NOT_FOUND);
    }
    return this._createDomain(updatedCar);
  }
}