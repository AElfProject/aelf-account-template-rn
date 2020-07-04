import i18n from 'i18n-js';
import React, {useState, useCallback, memo} from 'react';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {
  OverlayModal,
  CommonHeader,
  Touchable,
  CommonButton,
  Loading,
  CommonToast,
  ActionSheet,
} from '../../components';
import {TextL} from '../../components/CommonText';
import {localLanguage} from '../../i18n/config';
import {createSelector} from 'reselect';
import {ScrollView} from 'react-native';
import settingsActions, {settingsSelectors} from '../../redux/settingsRedux';
import usersActions, {userSelectors} from '../../redux/userRedux';
import {connect} from 'react-redux';
const selector = createSelector(
  [state => state.user, state => state.settings],
  (user, settings) => ({
    language: settings.language,
    test: user.test,
  }),
);
const Home = props => {
  console.log(props, '=======props');

  //示例，我们可以像下面这样使用redux
  const dispatch = useDispatch();

  const setTest = useCallback(test => dispatch(usersActions.setTest(test)), [
    dispatch,
  ]);

  const changeLanguage = useCallback(
    language => dispatch(settingsActions.changeLanguage(language)),
    [dispatch],
  );
  const {test} = useSelector(selector, shallowEqual);

  const [loading, setLoading] = useState(false);
  const items = localLanguage.map(item => ({
    ...item,
    onPress: value => {
      props.changeLanguage(value.language);
    },
  }));
  return (
    <>
      <CommonHeader title={i18n.t('home')} />
      <ScrollView>
        <CommonButton title="Examples" disabled />
        <CommonButton
          title="Modal"
          onPress={() => {
            OverlayModal.show(
              <Touchable
                onPress={() => {
                  OverlayModal.hide();
                }}
                //示例文件会删除
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flex: 1,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CommonButton
                  title={'alert'}
                  onPress={() => {
                    ActionSheet.alert(
                      i18n.t('safetyReminder'),
                      i18n.t('alert.locationTips'),
                      [{title: i18n.t('determine')}],
                    );
                  }}
                />
                <CommonButton
                  title="Loading"
                  onPress={() => {
                    Loading.show();
                    setTimeout(() => {
                      Loading.hide();
                    }, 5000);
                  }}
                />
                <CommonButton
                  title={'Hide Modal'}
                  onPress={() => {
                    OverlayModal.hide();
                  }}
                />
              </Touchable>,
            );
          }}
        />
        <CommonButton
          title="Loading"
          onPress={() => {
            Loading.show();
            setTimeout(() => {
              Loading.hide();
            }, 5000);
          }}
        />
        <CommonButton
          title="buttonLoading"
          loading={loading}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 5000);
          }}
        />
        <CommonButton
          title="ToastSuccess"
          onPress={() => {
            CommonToast.success('Success');
          }}
        />
        <CommonButton
          title="ToastFail"
          onPress={() => {
            CommonToast.fail('Fail');
          }}
        />
        <CommonButton
          title="Toast"
          onPress={() => {
            CommonToast.text('Toast');
          }}
        />
        <TextL>持久化存储:{test}</TextL>
        <CommonButton
          title="Modify Redux"
          onPress={() => setTest(test + 'biu ')}
        />
        <CommonButton title="Clear Redux" onPress={() => setTest('')} />
        <CommonButton
          title={i18n.t('switchLanguage')}
          onPress={() => {
            ActionSheet.show(items, {title: i18n.t('cancel')});
          }}
        />
        <CommonButton
          title={'alert'}
          onPress={() => {
            ActionSheet.alert(
              i18n.t('safetyReminder'),
              i18n.t('alert.locationTips'),
              [{title: i18n.t('determine')}],
            );
          }}
        />
      </ScrollView>
    </>
  );
};

//示例，我们也可以像这样使用redux
const mapStateToProps = state => {
  return {
    language: settingsSelectors.getLanguage(state),
    test: userSelectors.getTest(state),
  };
};
const mapDispatchToProps = {
  changeLanguage: settingsActions.changeLanguage,
  setTest: usersActions.setTest,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(Home));
