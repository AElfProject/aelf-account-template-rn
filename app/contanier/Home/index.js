import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Toast from 'teaset/components/Toast/Toast'
import CommonHeader from "../../components/CommonHeader";
import OverlayModal from "../../components/OverlayModal";
const Home = () => {
    const ReduxStore = useSelector(state => state.user, shallowEqual);

    const dispatch = useDispatch();
    return (
        <>
            <CommonHeader title='Home' />
            <TouchableOpacity onPress={() => {
                OverlayModal.show(
                    (
                        <TouchableOpacity onPress={() => {
                            OverlayModal.hide()
                        }} style={{ flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                Toast.success('登录成功');
                            }} style={{ height: 100, width: 100, backgroundColor: 'white' }}></TouchableOpacity>
                        </TouchableOpacity>
                    )
                )
                dispatch({ type: 'SET_TEST', test: 'hhhhhhh' })
            }} style={{ backgroundColor: 'red', height: 100, width: 100 }}></TouchableOpacity>
        </>
    );
}
export default Home;