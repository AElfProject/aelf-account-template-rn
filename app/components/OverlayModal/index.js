import React from 'react'
import Overlay from "teaset/components/Overlay/Overlay";
import { View } from 'react-native';
import { sreenHeight, sreenWidth } from '../../utils/device';
import Touchable from '../Touchable';

let elements = [];
const customBounds = {
    x: 0,
    y: sreenHeight,
    width: sreenWidth,
    height: 0
}
export default class OverlayModal extends React.Component {
    static show(component, overlayProps = {}) {
        let overlayView = (
            <Overlay.PopView
                modal={false}
                type='custom'
                ref={v => elements.push(v)}
                style={{ backgroundColor: 'white' }}
                containerStyle={{ flex: 1 }}
                customBounds={customBounds}
                {...overlayProps}
            >
                {component}
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