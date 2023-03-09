import moment from 'moment-timezone';

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
}
