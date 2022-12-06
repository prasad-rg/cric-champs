export const checkForAmorPm = time => {
  if (time?.split(' ')[1] == 'PM') {
    var convertedTime = +time?.split(' ')[0] + 12;
  } else {
    var convertedTime = +time?.split(' ')[0];
  }
  return convertedTime;
};
