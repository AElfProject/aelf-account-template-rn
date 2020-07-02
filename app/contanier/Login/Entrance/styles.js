import { pTd } from "../../../utils";
import { sreenHeight, sreenWidth, statusBarHeight } from "../../../utils/device";
import Gstyle from "../../../assets/theme/gstyle";
import { StyleSheet } from 'react-native'
import { Colors } from "../../../assets/theme";

export default StyleSheet.create({
    container: {
        flexDirection: 'column-reverse',
        ...Gstyle.container,
    },
    bgStyle: {
        position: 'absolute',
        top: pTd(-200),
        height: sreenHeight,
        width: sreenWidth,
    },
    loginButton: {
        marginBottom: pTd(50)
    },
    BottomBox: {
        marginBottom: pTd(300)
    },
    premium: {
        alignSelf: 'center',
        marginTop: pTd(50),
        color: Colors.primaryColor
    },
    topTool:{
        paddingHorizontal:pTd(50),
        position: 'absolute',
        zIndex:999,
        top: statusBarHeight + pTd(80),
        left: 0,
        right:0,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    jLooking: {
        color: Colors.primaryColor
    }
});