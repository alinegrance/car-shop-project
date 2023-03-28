import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import CustomError from '../utils/CustomError';
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from '../utils/httpStatus';

export default class MotorcycleService {
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

  public async getAll() {
    const motorcycles = await this._motorcycleODM.getAll();
    return motorcycles.map((motorcycle: IMotorcycle) => this._createDomain(motorcycle));
  }

  public async getById(id: string) {
    this._validateId(id);
    const motorcycle = await this._motorcycleODM.getById(id);
    if (!motorcycle) {
      throw new CustomError('Motorcycle not found', NOT_FOUND);
    }
    return this._createDomain(motorcycle);
  }

  public async update(id: string, motorcycle: Partial<IMotorcycle>) {
    this._validateId(id);
    const updatedMotorcycle = await this._motorcycleODM.update(id, motorcycle);
    if (!updatedMotorcycle) {
      throw new CustomError('Motorcycle not found', NOT_FOUND);
    }
    return this._createDomain(updatedMotorcycle);
  }
}