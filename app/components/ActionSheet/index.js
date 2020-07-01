// ActionSheet.js

'use strict';

import React from "react";
import OverlayModal from '../OverlayModal';
import { View, Text, StyleSheet } from "react-native";
import { bottomBarHeigth } from "../../utils/device";
import Touchable from "../Touchable";
import { Colors } from "../../assets/theme";
const show = (items, cancelItem) => {
  OverlayModal.show(
    <>
      <View style={styles.sheetBox}>
        {
          items && items.map((item, index) => {
            const { title, onPress } = item
            return (
              <Touchable
                key={index}
                style={styles.itemBox}
                onPress={() => {
                  OverlayModal.hide()
                  onPress && onPress(item)
                }} >
                <Text style={styles.itemText}>{title}</Text>
              </Touchable>
            )
          })
        }
      </View>
      {
        cancelItem &&
        <Touchable onPress={() => OverlayModal.hide()} style={styles.cancelBox}>
          <Text style={styles.concelText}>{cancelItem.title}</Text>
        </Touchable>
      }
    </>
    , {
      style: styles.bgStyle,
      containerStyle: styles.containerStyle
    }
  )
}

export default {
  show
}
const styles = StyleSheet.create({
  bgStyle: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'column-reverse',
  },
  containerStyle: {
    paddingHorizontal: 20,
    marginBottom: bottomBarHeigth + 50
  },
  sheetBox: {
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: 'white'
  },
  itemText: {
    color: Colors.primaryColor,
    fontSize: 16
  },
  itemBox: {
    width: '100%',
    paddingVertical: 20,
    overflow: 'hidden',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#e5e5e5'
  },
  concelText: {
    fontSize: 16
  },
  cancelBox: {
    width: '100%',
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  }
});
