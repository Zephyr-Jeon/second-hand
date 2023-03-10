import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
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
}
