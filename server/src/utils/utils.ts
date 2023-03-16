import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import * as jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import { promisify } from 'util';

export class ServerCommonUtils {
  getMoment(momentInput?: moment.MomentInput): moment.Moment {
    return moment(momentInput);
  }

  getNowDate() {
    return this.getMoment().toDate();
  }

  getNowDateToken() {
    return this.getMoment().format('YYYY-MM-DD');
  }

  async genSaltedHashPassword(password: string) {
    // modify callback based implementaion of "scrypt" into promise based implementaion
    const scryptAsync = promisify(scrypt);
    const salt = randomBytes(16).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  async comparePassword(storedPassword: string, suppliedPassword: string) {
    const scryptAsync = promisify(scrypt);
    const [saltedHashpassword, salt] = storedPassword.split('.');
    const storedPasswordBuffer = Buffer.from(saltedHashpassword, 'hex');
    const suppliedPasswordBuffer = (await scryptAsync(
      suppliedPassword,
      salt,
      64
    )) as Buffer;

    return timingSafeEqual(storedPasswordBuffer, suppliedPasswordBuffer);
  }

  async signJWT(
    payload: string | Buffer | object,
    secret: jwt.Secret,
    options: jwt.SignOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (token) {
          resolve(token);
        } else {
          reject(err || 'Unknown JWT sign error');
        }
      });
    });
  }

  async verifyJWT(token: string, secret: jwt.Secret) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, payload) => {
        if (payload) {
          resolve(payload);
        } else {
          reject(err || 'Unknown JWT verify error');
        }
      });
    });
  }
}
