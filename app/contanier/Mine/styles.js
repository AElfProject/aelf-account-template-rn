import {StyleSheet} from 'react-native';
import {Colors} from '../../assets/theme';
import {pTd} from '../../utils';
import {statusBarHeight} from '../../utils/device';

export default StyleSheet.create({
  topBGStyles: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    height: statusBarHeight + pTd(300),
    backgroundColor: Colors.primaryColor,
    paddingBottom: pTd(30),
  },
  textTitle: {
    color: 'white',
  },
  balanceBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: pTd(80),
    backgroundColor: '#ab7ee6',
  },
  toolBox: {
    backgroundColor: 'white',
    paddingVertical: pTd(30),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: pTd(20),
  },
  toolItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
