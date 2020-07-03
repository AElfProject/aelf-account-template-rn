import {
	Dimensions, Platform, StatusBar, PixelRatio
} from 'react-native'
const X_WIDTH = 375;
const X_HEIGHT = 812;

const isIos = Platform.OS === 'ios';
const sreenWidth = Dimensions.get('screen').width;
const sreenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;

const pixelSize = (function () {
	let pixelRatio = PixelRatio.get();
	if (pixelRatio >= 3) return 0.333;
	else if (pixelRatio >= 2) return 0.5;
	else return 1;
})();

const isIphoneX = (function () {
	return (
		Platform.OS === 'ios' &&
		((sreenHeight >= X_HEIGHT && sreenWidth >= X_WIDTH) ||
			(sreenHeight >= X_WIDTH && sreenWidth >= X_HEIGHT))
	)
})();

const statusBarHeight = (function () {
	let BarHeight = StatusBar.currentHeight
	if (isIos) {
		if (isIphoneX) {
			BarHeight = 44
		} else {
			BarHeight = 20
		}
	}
	return BarHeight
})();

const bottomBarHeigth = (function () {
	let Height = 0
	if (isIos && isIphoneX) Height = 34
	return Height
})()
export {
	isIos,
	sreenWidth,
	sreenHeight,
	pixelSize,
	isIphoneX,
	windowHeight,
	statusBarHeight,
	bottomBarHeigth
}