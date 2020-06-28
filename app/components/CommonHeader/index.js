import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import navigationService from "../../utils/navigationService"
import { statusBarHeight, pixelSize } from '../../utils/device';
import Icon from 'react-native-vector-icons/AntDesign';
import { pTd } from "../../utils";
import { Colors } from "../../assets/theme";
const styles = StyleSheet.create({
    statusBarStyle: {
        paddingTop: statusBarHeight,
        backgroundColor: "#fff",
    },
    headerWrap: {
        height: pTd(88),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: pixelSize,
        borderColor: "#D8D8D8",
    },
    backWrapStyle: {
        width: pTd(100),
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: pTd(36),
        color: Colors.fontColor,
        fontWeight: "500"
    },
    leftBox: {
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center'
    }

});
const CommonHeader = props => {
    const {
        canBack, leftElement,
        titleElement, title,
        rightElement, headerStyle, titleStyle, statusBar
    } = props;
    return (
        <View style={[styles.statusBarStyle, { backgroundColor: headerStyle?.backgroundColor }]}>
            {
                statusBar && statusBar
            }
            <View style={[styles.headerWrap, headerStyle]}>
                <View style={styles.backWrapStyle}>
                    {
                        canBack ? (
                            <TouchableOpacity
                                style={styles.leftBox}
                                activeOpacity={0.75}
                                onPress={() => navigationService.goBack()}
                            >
                                <Icon name={"left"} size={24} color={Colors.fontColor} />
                            </TouchableOpacity>
                        ) : null
                    }
                    {
                        leftElement !== null ? leftElement : null
                    }
                </View>
                {
                    titleElement ? titleElement : (
                        <View style={{ alignItems: "center" }}>
                            <Text style={[styles.title, titleStyle]}>{title || "详情"}</Text>
                        </View>
                    )
                }

                <View style={styles.backWrapStyle}>
                    {rightElement !== null ? rightElement : null}
                </View>
            </View>
        </View>
    );
};

CommonHeader.defaultProps = {
    rightElement: null
};

export default CommonHeader;