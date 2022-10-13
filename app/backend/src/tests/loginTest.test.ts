import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as Sinon from 'sinon';
import { app } from '../app';
import UsersModel from '../database/models/usersModel';
  

chai.use(chaiHttp);

const dumpLogin = {
  userName: 'test@test.com',
  password: '123456'
}

describe('/login', () => {
  describe('POST', () => {

    before(() => {
      Sinon.stub(UsersModel, 'create').resolves({ } as UsersModel)
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve cadastrar um usuário com sucesso', async () => {
      const response = await (await chai.request(app).post('/login').send(dumpLogin)).header({'token': 'asdfkajsdhfkl'});
      chai.expect(response.status).to.equal(201);
      chai.expect(response.body).to.deep.equal({ id: 1, ...dumpLogin });
    });

    it('Não deve ser possível cadastrar um usuário sem nome', async () => {
      const response = await chai.request(app).post('/login').send({ ...dumpLogin, userName: '', })
      chai.expect(response.status).to.equal(400);
    });
  });
});