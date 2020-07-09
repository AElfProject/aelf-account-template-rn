'use strict';
import React, {memo} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {aelfBlue} from '../../assets/images';
import {sreenWidth} from '../../utils/device';
const MyQRCode = props => {
  const {value} = props;
  return (
    <QRCode
      logo={aelfBlue}
      logoSize={38}
      logoMargin={4}
      logoBackgroundColor={'#fff'}
      size={sreenWidth * 0.55}
      {...props}
      value={value}
    />
  );
};
MyQRCode.defaultProps = {
  value: '1',
};
export default memo(MyQRCode);
