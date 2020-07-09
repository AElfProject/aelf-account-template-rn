import {pTd} from '../../../utils';
import {statusBarHeight, bottomBarHeigth} from '../../../utils/device';
import {StyleSheet} from 'react-native';
import {Colors} from '../../../assets/theme';
const offset = pTd(500);
export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  headerStyle: {
    marginTop: offset,
  },
  bgStyle: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    marginTop: -offset,
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
    top: statusBarHeight + pTd(80) + offset,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  language: {
    marginTop: pTd(200),
    alignSelf: 'center',
    color: Colors.primaryColor,
  },
  hideLanguage: {
    color: 'white',
  },
  jLooking: {
    color: Colors.primaryColor,
  },
});
