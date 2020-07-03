import { pTd } from "../../../utils";
import { sreenHeight, sreenWidth, statusBarHeight, bottomBarHeigth } from "../../../utils/device";
import Gstyle from "../../../assets/theme/gstyle";
import { StyleSheet } from 'react-native';
import { Colors } from "../../../assets/theme";

export default StyleSheet.create({

  pswTip: {
    position: "absolute",
    color: "red",
    right: pTd(14), top: pTd(40)
  }
});