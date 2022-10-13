import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/usersModel';
import TeamsModel from '../database/models/teamsModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const validUser = {
    email: 'borabill@gmail.com',
    password: bcrypt.hashSync('borafilhodobill')
}

const emptyUser = {
  email: '',
  password: bcrypt.hashSync('borafilhodobill')
}

describe('testa rota login', () => {
  describe('/POST', () => {
    describe('login com usuário válido', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(UsersModel, 'findOne').resolves(validUser as UsersModel)
      })

      after(() => {
        (UsersModel.findOne as sinon.SinonStub).restore();
      })

      it('retorna um status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'borabill@gmail.com',
            password: 'borafilhodobill'
          })

        expect(chaiHttpResponse.status).to.be.eq(200);
      });

      it('o body tem um token', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'borabill@gmail.com',
            password: 'borafilhodobill'
          })

        expect(chaiHttpResponse.body).to.have.property('token');
      });

    })
    describe('login com usuário ou senhas inválidos', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(UsersModel, 'findOne').resolves(emptyUser as UsersModel)
      })

      after(() => {
        (UsersModel.findOne as sinon.SinonStub).restore();
      })

      it('retorna um status 400', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: '',
            password: 'borafilhodobill'
          })

        expect(chaiHttpResponse.status).to.be.eq(400);
      });

      it('o body tem uma mensagem de erro', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: '',
            password: 'borafilhodobill'
          })

        expect(chaiHttpResponse.body).to.have.property('message');
      });
    })
  });
})

const mockTeams = [
  {
    id: 8,
    teamName: 'time do bill'
  },
  {
    id: 9,
    teamName: 'time do filho do bill'
  },
  {
    id: 10,
    teamName: 'time da esposa do bill'
  },
];

const mockTeam = {
  id: 3,
  teamName: 'time do bill'
}

describe('testa rota /teams', () => {
  describe('/GET', () => {
    describe('retorna todos os times', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(TeamsModel , 'findAll').resolves(mockTeams as TeamsModel[]);
      })

      after(() => {
        (TeamsModel.findAll as sinon.SinonStub).restore();
      })

      it('retorna um status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams');

        expect(chaiHttpResponse.status).to.be.eq(200);
      });

      it('o retorno é um array de times', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

      expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams);
      expect(chaiHttpResponse.body).to.be.an('array');
      });
    })
  })
  describe('/GET /:id', () => {
    describe('retorna um time pelo id', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(TeamsModel, 'findByPk').resolves(mockTeam as TeamsModel);
      })

      after(() => {
        (TeamsModel.findByPk as sinon.SinonStub).restore();
      })

      it('retorna um status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams/3');

        expect(chaiHttpResponse.status).to.be.eq(200);
      });

      it('o retorno é um objeto com o time', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/teams/3');

        expect(chaiHttpResponse.body).to.be.deep.equal(mockTeam);
        expect(chaiHttpResponse.body).to.be.an('object');
      })
    })
  })
})