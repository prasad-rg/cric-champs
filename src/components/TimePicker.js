import * as React from 'react';
import {Button} from 'react-native-paper';
import {TimePickerModal, TimePicker} from 'react-native-paper-dates';

export default function TimePickerPage() {
  const [visible, setVisible] = React.useState(false);
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

//   const onConfirm = React.useCallback(d => {
//     console.log(d);
//   });

  const onConfirm = React.useCallback((params) => {
   setOpen(false);
   setDates(params.dates);
   console.log('[on-change-multi]', params);
 }, []);

  return (
    <>
      <TimePicker
        inputType="picker"
        onChange={(d)=>onConfirm(d)}
        locale="en"/>
    </>
  );
}
