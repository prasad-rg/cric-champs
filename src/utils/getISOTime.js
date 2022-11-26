import moment from 'moment';

export const getISOTime = time => {
  let [hours, minutes] = time.split(':');
  let currentDate = moment().format('YYYY-MM-DD');
  let modifiedDate;
  if (Number(hours) < 10) {
    modifiedDate = `${currentDate}T0${hours}:00:00`;
  } else {
    modifiedDate = `${currentDate}T${hours}:00:00`;
  }
  // console.warn(modifiedDate)
  let newTime = moment.utc(modifiedDate);
  return newTime.format();

  //   var input = '2019-01-01T00:00:00';
  //   var m = moment.utc(modifiedDate);
  //   var output = m.format();
  //   console.warn(output);
};
