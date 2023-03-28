import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Test CarService', function () {
  it('Should create new Car', async function () {
    const carMockInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carMockOutput: ICar = { 
      id: '6348513f34c397abcad040b2',
      ...carMockInput, 
    };

    sinon.stub(Model, 'create').resolves(carMockOutput);

    const service = new CarService();
    const result = await service.create(carMockInput);

    expect(result).to.be.deep.equal(carMockOutput);
  });

  it('Should return all cars', async function () {
    const cars = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: false,
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];

    sinon.stub(Model, 'find').resolves(cars);
    const service = new CarService();
    const result = await service.getAll();

    expect(result).to.be.deep.equal(cars);
  });

  it('Should return car by id', async function () {
    const carId = '634852326b35b59438fbea2f';
    const carMock = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findById').resolves(carMock);
    const service = new CarService();
    const result = await service.getById(carId);

    expect(result).to.be.deep.equal(carMock);
  });

  it('Should return updated car', async function () {
    const carId = '634852326b35b59438fbea2f';
    const carUpdateInput = {
      model: 'Marea-NOVO',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carUpdateOutput = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea-NOVO',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findOneAndUpdate').resolves(carUpdateOutput);
    const service = new CarService();

    const result = await service.update(carId, carUpdateInput);

    expect(result).to.be.deep.equal(carUpdateOutput);
  });

  afterEach(function () {
    sinon.restore();
  });
});