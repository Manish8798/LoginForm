import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox'; // Import CheckBox from @react-native-community/checkbox
import {Picker} from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import {Formik} from 'formik';
import * as yup from 'yup';
import {FormContext} from '../context/FormProvider';

const validationSchema = yup.object().shape({
  countryCode: yup
    .string()
    .required('Country code is required')
    .matches(/^(?:\+91|\+1)$/, 'Invalid country code'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be a 10-digit numeric value'),
  acceptTermsAndCondition: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

const countryCodes = [
  {label: 'Select Country Code', value: ''},
  {label: 'India (+91)', value: '+91'},
  {label: 'America (+1)', value: '+1'},
];

const Form3 = props => {
  const {data, updateData} = useContext(FormContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const titles = [
    'Email ID',
    'Password',
    'First Name',
    'Last Name',
    'Address',
    'Country Code',
    'Phone Number',
  ];
  let values = Object.values(data);

  const toggleModal = () => {
    setModalVisible(state => !state);
  };

  const onSave = async values => {
    let res = await updateData({...data, ...values});
    // console.log('onSave', res);
    if (res) {
      // console.log('onSave', data);
      toggleModal();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            countryCode: data?.countryCode,
            phoneNumber: data?.phoneNumber,
            acceptTermsAndCondition: false,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            // Handle form submission here
            //   console.log(values);
            onSave(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue,
          }) => (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.inputHeader}>Country Code:</Text>

              <Picker
                style={[styles.input, {backgroundColor: '#d3d3d3'}]}
                selectedValue={values.countryCode}
                onValueChange={itemValue =>
                  setFieldValue('countryCode', itemValue)
                }>
                {countryCodes.map(code => (
                  <Picker.Item
                    key={code.value}
                    label={code.label}
                    value={code.value}
                  />
                ))}
              </Picker>
              {errors.countryCode && (
                <Text style={styles.error}>{errors.countryCode}</Text>
              )}
              <Text style={styles.inputHeader}>Phone Number:</Text>

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                keyboardType="number-pad"
              />
              {errors.phoneNumber && (
                <Text style={styles.error}>{errors.phoneNumber}</Text>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  style={styles.checkBox}
                  value={values.acceptTermsAndCondition}
                  onValueChange={value =>
                    setFieldValue('acceptTermsAndCondition', value)
                  }
                />
                <Text>I accept the terms and conditions</Text>
              </View>

              {errors.acceptTermsAndCondition && (
                <Text style={styles.error}>
                  {errors.acceptTermsAndCondition}
                </Text>
              )}

              <View style={styles.btnContainer}>
                <View style={{flex: 1, marginRight: 10}}>
                  <Button
                    title="Back"
                    onPress={() => props.navigation.goBack()}
                  />
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                  <Button title="Save" onPress={handleSubmit} />
                </View>
              </View>
            </View>
          )}
        </Formik>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
                {titles.map((val, index) => (
                  <View key={index} style={styles.hTextContainer}>
                    <Text style={styles.text}>{val}:</Text>
                    <Text style={[styles.text, {color: 'gray', flex: 2}]}>
                      {values[index] ? values[index] : 'Not Provided'}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View
                style={{
                  position: 'absolute',
                  bottom: 20,
                  start: 10,
                  end: 10,
                }}>
                <Button title="Submit" onPress={() => toggleModal()} />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 8,
    borderRadius: 2,
  },
  error: {
    color: 'red',
    marginHorizontal: 10,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    elevation: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    padding: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  },
  checkBox: {
    alignSelf: 'center',
    marginStart: 8,
  },
  inputHeader: {
    marginHorizontal: 10,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '100%',
    height: '60%',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  hTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    color: '#000',
    flex: 1,
  },
  scrollView: {
    paddingBottom: 40,
  },
});

export default Form3;
