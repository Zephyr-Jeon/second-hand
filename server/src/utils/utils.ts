import moment from 'moment';

class ServerCommonUtils {
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

export const Utils = new ServerCommonUtils();
