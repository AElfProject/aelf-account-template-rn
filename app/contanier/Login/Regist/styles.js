import {pTd} from '../../../utils';
import GStyle from '../../../assets/theme/gstyle';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../assets/theme';

export default StyleSheet.create({
  pswTip: {
    marginTop: 3,
    color: 'red',
  },
  container: {
    marginTop: pTd(200),
    paddingHorizontal: pTd(50),
    justifyContent: 'center',
  },
  leftTitleBox: {
    paddingTop: 15,
    height: 65,
  },
  buttonStyles: {
    marginTop: pTd(100),
  },
});
