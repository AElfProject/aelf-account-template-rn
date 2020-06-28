import React from "react";
import { Text } from "react-native";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Touchable } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from 'teaset/components/Toast/Toast'
const Home = () => {

    const ReduxStore = useSelector(state => state.user, shallowEqual);
    console.log(ReduxStore, '=====ReduxStore');

    const dispatch = useDispatch();
    return (
        <>
            <Text>HOME</Text>
            <TouchableOpacity onPress={() => {
                Toast.success('登录成功');
                dispatch({ type: 'SET_TEST', test: 'hhhhhhh' })
            }} style={{ backgroundColor: 'red', height: 100, width: 100 }}></TouchableOpacity>
        </>
    );
}
export default Home;