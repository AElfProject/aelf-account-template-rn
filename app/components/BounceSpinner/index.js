import React, {memo} from 'react';
import Spinner from 'react-native-spinkit';
import {Colors} from '../../assets/theme';

const BounceSpinner = props => {
  const {spinnerProps} = props;
  return (
    <Spinner
      type={'Bounce'}
      color={Colors.primaryColor}
      size={45}
      {...spinnerProps}
    />
  );
};
BounceSpinner.defaultProps = {
  spinnerProps: {},
};
export default memo(BounceSpinner);
