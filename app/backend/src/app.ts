import * as express from 'express';
import LoginController from './controllers/loginController';
import MatchesController from './controllers/matchesController';
import TeamsController from './controllers/teamsController';
import LoginValidation from './middlewares/loginValidation';

const loginController = new LoginController();
const loginValidation = new LoginValidation();
const teamsController = new TeamsController();
const matchesController = new MatchesController();

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', loginValidation.validation, loginController.login);
    this.app.get('/login/validate', loginController.loginValidation);
    this.app.get('/teams', teamsController.getAll);
    this.app.get('/teams/:id', teamsController.getById);
    this.app.get('/matches', matchesController.getAll);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
