import React, { memo } from 'react'
import { CommonHeader } from '../../../components'
import i18n from 'i18n-js'
const Regist = () => {
    return (
        <CommonHeader title={i18n.t('login.regist')}canBack />
    )
}

export default memo(Regist)