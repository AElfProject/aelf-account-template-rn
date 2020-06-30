import React from 'react'
import Overlay from "teaset/components/Overlay/Overlay";
import { View, StyleSheet } from 'react-native';
import { TextTitle } from '../CommonText';
import BounceSpinner from '../BounceSpinner'
import { Colors } from '../../assets/theme';
let elements = [];
export default class Loading extends React.Component {
    static show(text, overlayProps = {}) {
        let overlayView = (
            <Overlay.PopView
                modal={true}
                type='zoomIn'
                ref={v => elements.push(v)}
                style={styles.container}
                {...overlayProps}
            >
                <View style={styles.loadingBox}>
                    <BounceSpinner />
                    <TextTitle style={styles.textStyles}>{text || 'Loading'}</TextTitle>
                </View>
            </Overlay.PopView >
        );
        Overlay.show(overlayView);
    }

    static hide() {
        let key = elements.pop()
        key && key.close && key.close()
    }

    static destroy() {
        for (let item of elements) {
            item && item.close && item.close()
        }
        elements = []
    }

    componentWillUnmount() {
        OverlayModal.destroy()
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    loadingBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyles: {
        color: Colors.primaryColor,
        marginTop: 20
    }
});