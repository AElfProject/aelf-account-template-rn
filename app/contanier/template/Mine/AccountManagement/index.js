import React, {memo, useMemo, useState, useCallback} from 'react';
import {View, StyleSheet, LayoutAnimation} from 'react-native';
import {GStyle, Colors} from '../../../../assets/theme';
import {
  CommonHeader,
  ListItem,
  ActionSheet,
  VerifyPassword,
  CommonToast,
} from '../../../../components/template';
import navigationService from '../../../../utils/common/navigationService';
import i18n from 'i18n-js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {pTd} from '../../../../utils/common';
import userActions, {userSelectors} from '../../../../redux/userRedux';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
const AccountManagement = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const rightElement = useMemo(
    () => <FontAwesome name="check" size={20} color={Colors.fontColor} />,
    [],
  );
  const deleteUser = useCallback(
    address => dispatch(userActions.deleteUser(address)),
    [dispatch],
  );
  const onLoginSuccess = useCallback(
    data => dispatch(userActions.onLoginSuccess(data)),
    [dispatch],
  );
  const logOut = useCallback(address => dispatch(userActions.logOut(address)), [
    dispatch,
  ]);
  const userInfo = useSelector(userSelectors.getUserInfo, shallowEqual);
  const onDeletePress = useCallback(
    item => {
      const {address} = userInfo;
      const current = item.details === address;
      if (current) {
        ActionSheet.alert('请退出当前账号或切换账号', null, [{title: '确定'}]);
      } else {
        ActionSheet.alert(
          '删除当前账号',
          '删除账号将删除账号所有数据，请务必确保账号已备份，否则删除后无法找回账号',
          [
            {title: '取消', type: 'cancel'},
            {
              title: '删除',
              onPress: () => {
                VerifyPassword.passwordShow(item.keystore, value => {
                  if (value) {
                    deleteUser(item.address);
                  }
                });
              },
            },
          ],
        );
      }
    },
    [deleteUser, userInfo],
  );
  const dropOut = useCallback(() => {
    const {saveQRCode, address, keystore} = userInfo;
    if (saveQRCode) {
      ActionSheet.alert(
        '退出当前账号',
        '退出账号将删除账号所有数据，请务必确保账号已备份，否则退出后无法找回账号',
        [
          {title: '取消', type: 'cancel'},
          {
            title: '确定',
            onPress: () => {
              VerifyPassword.passwordShow(keystore, value => {
                if (value) {
                  logOut(address);
                }
              });
            },
          },
        ],
      );
    } else {
      ActionSheet.alert(
        '安全提醒',
        '您的二维码账号未备份，请务必备份。\n二维码账号和对应密码用于登录应用，需备份以防止应用删除、账号登出、手机丢失等情况导致资产损失。',
        [
          {title: '取消', type: 'cancel'},
          {
            title: '确定',
            onPress: () => {
              navigationService.navigate('MinePage');
              navigationService.navigate('PersonalCenter');
            },
          },
        ],
      );
    }
  }, [logOut, userInfo]);
  const onSwitchAccount = useCallback(
    item => {
      const {keystore, privateKey, address, userName} = item;
      VerifyPassword.passwordShow(keystore, async value => {
        if (value) {
          onLoginSuccess({
            address,
            keystore,
            userName,
            balance: 0,
            saveQRCode: true,
            privateKey,
          });
          CommonToast.success('切换成功');
          navigationService.reset('Tab');
        }
      });
    },
    [onLoginSuccess],
  );
  const AccountComponents = useMemo(() => {
    const {userList, address} = userInfo;
    const accountList = Array.isArray(userList)
      ? userList.map(item => ({
          ...item,
          title: item.userName,
          details: item.address,
        }))
      : [];
    return accountList.map((item, index) => {
      const current = item.details === address;
      return (
        <View
          key={index}
          style={[
            styles.accountBox,
            index === accountList.length - 1 && styles.bottomAccountBox,
          ]}>
          {edit && (
            <AntDesign
              onPress={() => onDeletePress(item)}
              name="minuscircle"
              size={20}
              color="red"
              style={styles.deleteStyle}
            />
          )}
          <ListItem
            disabled={current}
            onPress={() => onSwitchAccount(item)}
            style={styles.itemBox}
            detailsStyle={styles.detailsStyle}
            rightElement={current ? rightElement : null}
            {...item}
          />
        </View>
      );
    });
  }, [edit, onDeletePress, onSwitchAccount, rightElement, userInfo]);
  const Components = useMemo(() => {
    return (
      <View style={GStyle.secondContainer}>
        <CommonHeader
          title={i18n.t('mineModule.accountManagementT')}
          canBack
          rightTitle={edit ? '完成' : '编辑'}
          rightOnPress={() => {
            LayoutAnimation.easeInEaseOut();
            setEdit(!edit);
          }}>
          <View style={styles.container}>
            {AccountComponents}
            <ListItem
              onPress={() =>
                navigationService.navigate('Entrance', {addAccount: true})
              }
              title="添加账号"
            />
            <ListItem title="退出当前账号" onPress={dropOut} />
          </View>
        </CommonHeader>
      </View>
    );
  }, [AccountComponents, dropOut, edit]);
  return Components;
};

export default memo(AccountManagement);
const styles = StyleSheet.create({
  container: {
    marginTop: pTd(20),
  },
  itemBox: {
    flex: 1,
    borderBottomWidth: 0,
  },
  detailsStyle: {
    paddingRight: pTd(20),
  },
  accountBox: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  bottomAccountBox: {
    borderBottomWidth: 0,
    marginBottom: pTd(20),
  },
  deleteStyle: {
    marginLeft: pTd(20),
  },
});
