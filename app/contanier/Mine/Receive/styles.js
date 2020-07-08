import {StyleSheet} from 'react-native';
import {pTd} from '../../../utils';
import {Colors} from '../../../assets/theme';

export default StyleSheet.create({
  box: {
    marginTop: pTd(20),
  },
  topBox: {
    backgroundColor: 'white',
    padding: pTd(50),
    paddingTop: pTd(30),
    alignItems: 'center',
  },
  userNameStyle: {
    fontSize: 18,
    marginBottom: pTd(40),
  },
  shotView: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonStyle: {
    marginTop: pTd(80),
    width: '70%',
  },
  addressBox: {
    borderTopColor: Colors.borderColor,
    borderTopWidth: 1,
    paddingHorizontal: pTd(50),
    width: '100%',
  },
  addressStyles: {
    marginTop: pTd(30),
  },
});
