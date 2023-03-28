import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Test MotorcycleService', function () {
  it('Should create new Motorcycle', async function () {
    const motorcycleMockInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    const motorcycleMockOutput: IMotorcycle = { 
      id: '6348513f34c397abcad040b2',
      ...motorcycleMockInput, 
    };

    sinon.stub(Model, 'create').resolves(motorcycleMockOutput);

    const service = new MotorcycleService();
    const result = await service.create(motorcycleMockInput);

    expect(result).to.be.deep.equal(motorcycleMockOutput);
  });

  // afterEach(function () {
  //   sinon.restore();
  // });
});