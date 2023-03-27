import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import CustomError from '../utils/CustomError';
import { CREATED, OK } from '../utils/httpStatus';

export default class CarController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private _service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._service = new CarService();
  }

  public async create() {
    const car: ICar = this._req.body;
    const newCar = await this._service.create(car);
    this._res.status(CREATED).send(newCar);
  }

  public async getAll() {
    const cars = await this._service.getAll();
    this._res.status(OK).send(cars);
  }

  public async getById() {
    const { id } = this._req.params;
    try {
      const car = await this._service.getById(id);
      return this._res.status(OK).send(car);
    } catch (err) {
      return this._res
        .status((err as CustomError).status)
        .send({ message: (err as CustomError).message });
    }
  }
}
