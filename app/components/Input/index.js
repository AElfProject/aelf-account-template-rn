import React, { memo } from 'react';
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
	const { placeholderTextColor, disabled, style, pointerEvents, opacity } = props;
	return (
		<TextInput
			placeholderTextColor={placeholderTextColor ? placeholderTextColor : "#999"}
			pointerEvents={disabled ? 'none' : pointerEvents}
			opacity={disabled ? 0.6 : opacity}
			{...props}
			style={[styles.input, style]}
		/>
	);
};
export default memo(Input);
const styles = StyleSheet.create({
	input: {
		fontSize:16,
		height: 50,
		borderBottomWidth:1,
		borderBottomColor:'#999',
		paddingHorizontal:5
	},
});