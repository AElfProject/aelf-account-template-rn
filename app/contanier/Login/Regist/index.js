import React, { memo } from 'react';
import { CommonHeader, Touchable, Input } from '../../../components';
import i18n from 'i18n-js';
import { useSetState } from '../../util/hooks';
import { View, Keyboard } from 'react-native';
import Gstyle from '../../../assets/theme/gstyle';
import styles from './styles';
import { TextM } from '../../../components/CommonText';
const Regist = () => {
	const [state, setState] = useSetState({
		userNameRule: true
	})
	const { userNameRule } = state
	return (
		<View style={Gstyle.container}>
			<CommonHeader title={i18n.t('login.regist')} canBack />
			<Touchable
				style={{ flex: 1 }}
				activeOpacity={1}
				onPress={() => Keyboard.dismiss()}>
				<View>
					<Input
						onBlur={() => { }}
						onChangeText={(text) => { }}
						placeholder='Nick Name'
						placeholderTextColor="#999"
					/>
					{userNameRule && <TextM style={styles.pswTip}>Nickname format error</TextM>}
				</View>
			</Touchable>
		</View>
	)
}

export default memo(Regist);