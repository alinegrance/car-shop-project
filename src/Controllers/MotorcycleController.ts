import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';
import CustomError from '../utils/CustomError';
// import CustomError from '../utils/CustomError';
import { CREATED, OK } from '../utils/httpStatus';

export default class CarController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private _service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = this._req.body;
    const newMotorcycle = await this._service.create(motorcycle);
    this._res.status(CREATED).send(newMotorcycle);
  }

  public async getAll() {
    const motorcycles = await this._service.getAll();
    this._res.status(OK).send(motorcycles);
  }

  public async getById() {
    const { id } = this._req.params;
    try {
      const motorcycle = await this._service.getById(id);
      return this._res.status(OK).send(motorcycle);
    } catch (err) {
      return this._res
        .status((err as CustomError).status)
        .send({ message: (err as CustomError).message });
    }
  }

  public async update() {
    const { id } = this._req.params;
    const updateBody: IMotorcycle = this._req.body;
    try {
      const updatedMotorcycle = await this._service.update(id, updateBody);
      return this._res.status(OK).send(updatedMotorcycle);
    } catch (err) {
      return this._res
        .status((err as CustomError).status)
        .send({ message: (err as CustomError).message });
    }
  }
}
