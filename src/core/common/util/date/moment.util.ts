import * as moment from 'moment';

const DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss';

function getCurrentMomentDate(): string {

  return moment().local().format(DATE_FORMAT);
}

function fromDateToMomentString(date: Date): string {
  return moment(date).local().format(DATE_FORMAT);
}

export {
  getCurrentMomentDate,
  fromDateToMomentString
};
