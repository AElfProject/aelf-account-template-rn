import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { OverlayModal, CommonHeader, Touchable, CommonButton, Loading, BounceSpinner, CommonToast } from '../../components';
import { TextL } from "../../components/CommonText";

const Home = () => {
    const { test } = useSelector(state => state.user, shallowEqual);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    return (
        <>
            <CommonHeader title='Home' />
            <CommonButton title='Examples' disabled />
            <CommonButton title='Modal' onPress={() => {
                OverlayModal.show(
                    (
                        <Touchable onPress={() => {
                            OverlayModal.hide()
                        }} style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                            <Touchable onPress={() => {
                                OverlayModal.hide()
                            }} style={{ height: 100, width: 100, backgroundColor: 'white' }}></Touchable>
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
            <TextL>{test}</TextL>
            <CommonButton title='Modify Redux' onPress={() => {
                dispatch({ type: 'SET_TEST', test: test + 'biu ' })
            }} />
        </>
    );
}
export default Home;