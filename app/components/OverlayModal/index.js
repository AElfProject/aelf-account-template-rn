import React from 'react'
import { Overlay } from "teaset";
import { View } from 'react-native';
import { sreenHeight, sreenWidth } from '../../utils/device';

let elements = [];

export default class OverlayModal extends React.Component {
    static show(component, overlayProps = {}) {
        let overlayView = (
            <Overlay.PopView
                modal={false}
                type='custom'
                ref={v => elements.push(v)}
                style={{ flex: 1, backgroundColor: 'white' }}
                customBounds={{ x: 0, y: sreenHeight, width: sreenWidth, height: 0 }}
                {...overlayProps}
            >
                <View style={{ height: '100%' }}>
                    {component}
                </View>
            </Overlay.PopView >
        );
        Overlay.show(overlayView);
    }

    static hide() {
        let key = elements.pop()
        key && key.close()
    }

    static destroy() {
        for (let item of elements) {
            item && item.close()
        }
        elements = []
    }

    componentWillUnmount() {        
        OverlayModal.destroy()
    }
}