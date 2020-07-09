import React, {memo, useMemo, useState, useCallback} from 'react';
import {View, StyleSheet, LayoutAnimation} from 'react-native';
import {GStyle, Colors} from '../../../assets/theme';
import {CommonHeader, ListItem, ActionSheet} from '../../../components';
import navigationService from '../../../utils/navigationService';
import i18n from 'i18n-js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {pTd} from '../../../utils';
const AccountManagement = () => {
  const [edit, setEdit] = useState(false);
  const rightElement = useMemo(
    () => <FontAwesome name="check" size={20} color={Colors.fontColor} />,
    [],
  );
  const onDeletePress = useCallback(item => {
    ActionSheet.alert(
      '删除当前账号',
      '删除账号将删除账号所有数据，请务必确保账号已备份，否则删除后无法找回账号',
      [{title: '取消', type: 'cancel'}, {title: '确定'}],
    );
  }, []);
  const logOut = () => {
    ActionSheet.alert(
      '退出当前账号',
      '退出账号将删除账号所有数据，请务必确保账号已备份，否则退出后无法找回账号',
      [
        {title: '取消', type: 'cancel'},
        {title: '确定', onPress: () => navigationService.reset('Entrance')},
      ],
    );
  };
  const AccountComponents = useMemo(() => {
    const accountList = [
      {
        title: 'User Name 1',
        details: 'ELF_CnVL7BcRcaYGVovoiz4eiv4ZZFyJR7vjBmqgcZqgmicVXKKpx_AELF',
      },
      {
        title: 'User Name 2',
        details: 'ELF_CnVL7BcRcaYGVovoiz4eiv4ZZFyJR7vjBmqgcZqgmicVXKKpx_AELF',
      },
    ];
    return accountList.map((item, index) => {
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
              color={'red'}
              style={styles.deleteStyle}
            />
          )}
          <ListItem
            style={styles.itemBox}
            detailsStyle={styles.detailsStyle}
            rightElement={rightElement}
            {...item}
          />
        </View>
      );
    });
  }, [edit, onDeletePress, rightElement]);
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
          }}
        />
        <View style={styles.container}>
          {AccountComponents}
          <ListItem
            onPress={() =>
              navigationService.navigate('Entrance', {addAccount: true})
            }
            title="添加账号"
          />
          <ListItem title="退出当前账号" onPress={logOut} />
        </View>
      </View>
    );
  }, [AccountComponents, edit]);
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
