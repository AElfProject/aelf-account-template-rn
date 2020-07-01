import React from "react";
import CommonHeader from "../../components/CommonHeader";
import i18n from 'i18n-js'
const Mine = () => {
    return (
        <CommonHeader title={i18n.t('hello')} />
    );
}
export default Mine;