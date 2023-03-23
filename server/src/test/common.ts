import { randomBytes } from 'crypto';
import request from 'supertest';
import { AppServer } from '../app';
import { IServerConfigs } from '../config/config.interface';
import { getAppConfigs } from '../config/getAppConfigs';
import { User } from '../modules/user/user.entity';
import { QUERIES } from './queries';

export let testServer: TestServer;

export const ba = async () => {
  testServer = new TestServer(getAppConfigs());
  await testServer.startServer();
};

export const aa = async () => {
  await testServer.stop();
};

export const be = async () => {};

export const ae = async () => {
  await testServer.clearDB();
};

class TestServer extends AppServer {
  constructor(private _configs: IServerConfigs) {
    super(_configs);
  }

  // create random user that can request with token set in the header
  async createUser() {
    const email = `${randomBytes(8).toString('hex')}@test.com`;
    const password = '12345678';

    const res = await this.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email, password } },
    });

    return new TestUser(
      this,
      [...res.header['set-cookie']],
      res.body.data.signup
    );
  }

  //  request without token set in the header
  get request() {
    return request(this._configs.SERVER_URL).post('/');
  }

  getErrorCodes(res: request.Response) {
    return res.body.errors.map((err: any) => err?.extensions?.code);
  }

  async clearDB() {
    // this.db.dropDatabase();
    // this.db.synchronize();

    this.db.entityMetadatas.forEach(async (entity) => {
      const repo = await this.db.getRepository(entity.name);

      // RESTART IDENTITY reset all identity columns when truncating a table
      await repo.query(
        `TRUNCATE "${entity.name.toLowerCase()}" RESTART IDENTITY CASCADE;`
      );
    });
  }

  // TODO: Create and drop a new schema for each test to run test concurrently
  override async startServer() {
    await super.startServer();

    // this.db.query('CREATE SCHEMA test');

    // this.db = new TypeORM.DataSource({
    //   type: this._configs.TYPEORM_TYPE,
    //   host: this._configs.TYPEORM_HOST,
    //   port: this._configs.TYPEORM_PORT,
    //   username: this._configs.TYPEORM_USERNAME,
    //   password: this._configs.TYPEORM_PASSWORD,
    //   database: this._configs.TYPEORM_DATABASE,
    //   dropSchema: this._configs.TYPEORM_DROP_SCHEMA,
    //   synchronize: this._configs.TYPEORM_SYNCHRONIZE,
    //   entities: this._configs.TYPEORM_ENTITIES,
    //   schema: 'test',
    // });

    // this.db.initialize();
  }
}

class TestUser {
  constructor(
    private server: TestServer,
    private cookie: any[],
    private user: User
  ) {}

  get request() {
    return this.server.request.set('Cookie', this.cookie);
  }

  get data() {
    return this.user;
  }
}
