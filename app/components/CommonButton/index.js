import React from 'react';
import {
    StyleSheet
} from "react-native"
import Touchable from '../Touchable';
import { TextL } from '../CommonText';
import { Colors } from '../../assets/theme';
import { pTd } from '../../utils';
import Spinner from 'react-native-spinkit';

// Touchable hooks

const CommonButton = (props) => {
    const { title, onPress, style, textStyle, disabled, loading } = props
    if (loading) {
        return (
            <Spinner
                style={{ alignSelf: 'center' }}
                type={'ChasingDots'}
                color={Colors.primaryColor}
                size={pTd(80)}
            />
        )
    }
    return (
        <Touchable
            highlight
            onPress={onPress}
            style={[styles.container, disabled && { backgroundColor: Colors.disabledColor }, style]}
            underlayColor={Colors.bottonPressColor}>
            <TextL style={[styles.textStyles, textStyle]}>{title || 'button'}</TextL>
        </Touchable>
    );
}

export default CommonButton
const styles = StyleSheet.create({
    container: {
        height: pTd(80),
        borderRadius: pTd(80),
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        alignSelf: 'center',
        backgroundColor: Colors.primaryColor
    },
    textStyles: {
        fontWeight: 'bold',
        color: 'white'
    }
});