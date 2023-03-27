import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import CustomError from '../utils/CustomError';
import { UNPROCESSABLE_ENTITY } from '../utils/httpStatus';

export default class CarService {
  private _motorcycleODM: MotorcyclesODM;

  constructor() {
    this._motorcycleODM = new MotorcyclesODM();
  }

  private _createDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  private _validateId(id: string) {
    if (!isValidObjectId(id)) {
      throw new CustomError('Invalid mongo id', UNPROCESSABLE_ENTITY);
    }
  }

  public async create(motorcycle: IMotorcycle) {
    const newMotorcycle = await this._motorcycleODM.create(motorcycle);
    // console.log(newCar);
    return this._createDomain(newMotorcycle);
  }

  // public async getAll() {
  //   const cars = await this._carODM.getAll();
  //   return cars.map((car: ICar) => this._createDomain(car));
  // }

  // public async getById(id: string) {
  //   this._validateId(id);
  //   const car = await this._carODM.getById(id);
  //   if (!car) {
  //     throw new CustomError('Car not found', NOT_FOUND);
  //   }
  //   return this._createDomain(car);
  // }

  // public async update(id: string, car: Partial<ICar>) {
  //   this._validateId(id);
  //   const updatedCar = await this._carODM.update(id, car);
  //   if (!updatedCar) {
  //     throw new CustomError('Car not found', NOT_FOUND);
  //   }
  //   return this._createDomain(updatedCar);
  // }
}