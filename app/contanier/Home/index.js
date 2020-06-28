import React from "react";
import { Text } from "react-native";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from 'teaset/components/Toast/Toast'
import CommonHeader from "../../components/CommonHeader";
const Home = () => {
    const ReduxStore = useSelector(state => state.user, shallowEqual);

    const dispatch = useDispatch();
    return (
        <>
            <CommonHeader title='Home' />
            <TouchableOpacity onPress={() => {
                Toast.success('登录成功');
                dispatch({ type: 'SET_TEST', test: 'hhhhhhh' })
            }} style={{ backgroundColor: 'red', height: 100, width: 100 }}></TouchableOpacity>
        </>
    );
}
export default Home;