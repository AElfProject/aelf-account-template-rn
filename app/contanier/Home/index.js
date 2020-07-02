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
                                <CommonButton title={'alert'} onPress={() => {
                                    ActionSheet.alert(
                                        i18n.t('safetyReminder'),
                                        i18n.t('alert.locationTips'),
                                        [{ title: i18n.t('determine') }]
                                    )
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
                <CommonButton title={'alert'} onPress={() => {
                    ActionSheet.alert(
                        i18n.t('safetyReminder'),
                        i18n.t('alert.locationTips'),
                        [{ title: i18n.t('determine') }]
                    )
                }} />
            </ScrollView>
        </>
    );
}
export default memo(Home);
