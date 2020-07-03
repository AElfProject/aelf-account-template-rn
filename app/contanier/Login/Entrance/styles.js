import {pTd} from '../../../utils';
import {
  sreenHeight,
  sreenWidth,
  statusBarHeight,
  bottomBarHeigth,
} from '../../../utils/device';
import GStyle from '../../../assets/theme/gstyle';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../assets/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    ...GStyle.container,
  },
  bgStyle: {
    position: 'absolute',
    top: pTd(-300),
    height: sreenHeight,
    width: sreenWidth,
  },
  loginButton: {
    marginBottom: pTd(50),
  },
  BottomBox: {
    marginBottom: bottomBarHeigth + pTd(100),
  },
  premium: {
    alignSelf: 'center',
    marginTop: pTd(50),
    color: Colors.primaryColor,
  },
  topTool: {
    paddingHorizontal: pTd(50),
    position: 'absolute',
    zIndex: 999,
    top: statusBarHeight + pTd(80),
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  language: {
    marginTop: pTd(200),
    alignSelf: 'center',
    color: Colors.primaryColor,
  },
  jLooking: {
    color: Colors.primaryColor,
  },
});
