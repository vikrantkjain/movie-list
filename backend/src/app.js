/* eslint-disable class-methods-use-this */
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import methodOverride from 'method-override';
import helmet from 'helmet';
import express from 'express';
import routes from './routes';
import models from './models';

/**
 * Application startup class
 * @export
 * @class Bootstrap
 */
export default class Bootstrap {
  /**
   * Creates an instance of Bootstrap.
   * @param {object} app
   * @memberOf Bootstrap
   */
  constructor(app) {
    this.app = app;
    this.middleware();
    this.connectDb();
    this.routes();
    this.start();
  }

  /**
   * Load all middleware
   * @memberOf Bootstrap
   */
  middleware() {
    const { app } = this;

    app.use(cors());
    app.use(
      bodyParser.urlencoded({
        extended: false,
      }),
    );
    app.use(bodyParser.json({ limit: '2000mb' }));
    app.use(compression());
    app.use(methodOverride());
    app.use('/assets', express.static(`${__dirname}/uploads`));
    app.use('/images', express.static(`${__dirname}/images`));
    app.use('/public', express.static(`${__dirname}/../public`));
    app.use(
      helmet({
        contentSecurityPolicy: false,
        referrerPolicy: false,
        originAgentCluster: false,
      }),
    );
  }

  /**
   * Check database connection
   * @memberOf Bootstrap
   */
  connectDb() {
    const { sequelize } = models;
    sequelize
      .authenticate()
      .then(async () => {
        console.log('Database connected successfully');
        await sequelize
          .sync()
          .then(() => {
            console.log('Database sync successfully');
          })
          .catch((error) => {
            console.log(`Database syncing error ${error}`);
          });
      })
      .catch((error) => {
        console.log(`Database connection error ${error}`);
      });
  }

  /**
   * Load all routes
   * @memberOf Bootstrap
   */
  routes() {
    routes(this.app);
  }

  /**
   * Start express server
   * @memberOf Bootstrap
   */
  start() {
    const { app } = this;
    const port = app.get('port');
    // eslint-disable-next-line no-unused-vars
    const server = app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('Server has started on port %d', port);
    });
  }
}
