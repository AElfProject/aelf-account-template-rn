import {Dimensions, Platform, PixelRatio} from 'react-native';
import Constants from 'expo-constants';
const X_WIDTH = 375;
const X_HEIGHT = 812;

const isIos = Platform.OS === 'ios';
const sreenWidth = Dimensions.get('screen').width;
const sreenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

const pixelSize = (function() {
  let pixelRatio = PixelRatio.get();
  let size = 1;
  if (pixelRatio >= 3) {
    size = 0.333;
  } else if (pixelRatio >= 2) {
    size = 0.5;
  }
  return size;
})();

const isIphoneX = (function() {
  return (
    Platform.OS === 'ios' &&
    ((sreenHeight >= X_HEIGHT && sreenWidth >= X_WIDTH) ||
      (sreenHeight >= X_WIDTH && sreenWidth >= X_HEIGHT))
  );
})();

const statusBarHeight = Constants.statusBarHeight;

const bottomBarHeigth = (function() {
  let Height = 0;
  if (isIos && isIphoneX) {
    Height = 34;
  }
  return Height;
})();
export {
  isIos,
  sreenWidth,
  sreenHeight,
  pixelSize,
  isIphoneX,
  windowHeight,
  statusBarHeight,
  bottomBarHeigth,
};
