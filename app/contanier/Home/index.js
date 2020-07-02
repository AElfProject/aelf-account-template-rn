import i18n from 'i18n-js';
import React, { useState, useCallback, memo } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
    OverlayModal, CommonHeader, Touchable, CommonButton,
    Loading, CommonToast, ActionSheet
} from '../../components';
import { TextL } from "../../components/CommonText";
import { localLanguage } from '../../I18n/config';
import { createSelector } from "reselect";
import { ScrollView } from 'react-native';
const selector = createSelector(
    [
        state => state.user,
        state => state.settings,
    ],
    (user, settings) => ({
        language: settings.language,
        test: user.test
    })
)
const Home = () => {
    const dispatch = useDispatch();
    const { test } = useSelector(selector, shallowEqual);

    const setTest = useCallback((test) => dispatch({ type: 'SET_TEST', test }), [dispatch]);
    const changeLanguage = useCallback((language) => dispatch({ type: 'CHANGE_LANGUAGE', language }), [dispatch]);
    const [loading, setLoading] = useState(false);
    const items = localLanguage.map((item) => ({
        ...item, onPress: (item) => {
            changeLanguage(item.language)
        }
    }))
    return (
        <>
            <CommonHeader title={i18n.t('home')} />
            <ScrollView>
                <CommonButton title='Examples' disabled />
                <CommonButton title='Modal' onPress={() => {
                    OverlayModal.show(
                        (
                            <Touchable onPress={() => {
                                OverlayModal.hide()
                            }} style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                                <CommonButton title={'APP通用提醒框'} onPress={() => {
                                    ActionSheet.alert('安全提醒', '您当前所在位置没有通过权限认证，无法正常使用应用；该应用仅支持非中国大陆地区用户使用。', [{ title: '确定' }])
                                }} />
                                <CommonButton title='Loading' onPress={() => {
                                    Loading.show()
                                    setTimeout(() => {
                                        Loading.hide()
                                    }, 5000);
                                }} />
                                <CommonButton title={'Hide Modal'} onPress={() => {
                                    OverlayModal.hide();
                                }} />
                            </Touchable>
                        )
                    )
                }} />
                <CommonButton title='Loading' onPress={() => {
                    Loading.show()
                    setTimeout(() => {
                        Loading.hide()
                    }, 5000);
                }} />
                <CommonButton title='buttonLoading' loading={loading}
                    onPress={() => {
                        setLoading(true)
                        setTimeout(() => {
                            setLoading(false)
                        }, 5000);
                    }} />
                <CommonButton title='ToastSuccess' onPress={() => {
                    CommonToast.success('Success');
                }} />
                <CommonButton title='ToastFail' onPress={() => {
                    CommonToast.fail('Fail');
                }} />
                <CommonButton title='Toast' onPress={() => {
                    CommonToast.text('Toast')
                }} />
                <TextL>持久化存储:{test}</TextL>
                <CommonButton title='Modify Redux' onPress={() => setTest(test + 'biu ')} />
                <CommonButton title='Clear Redux' onPress={() => setTest('')} />
                <CommonButton title={i18n.t('switchLanguage')} onPress={() => {
                    ActionSheet.show(items, { title: i18n.t('cancel') })
                }} />
                <CommonButton title={'APP通用提醒框'} onPress={() => {
                    ActionSheet.alert('安全提醒', '您当前所在位置没有通过权限认证，无法正常使用应用；该应用仅支持非中国大陆地区用户使用。', [{ title: '确定' }])
                    // Alert.alert('alert', 'message', [{ title: '确定' }, { title: '取消' }])

                }} />
            </ScrollView>
        </>
    );
}
export default memo(Home);
