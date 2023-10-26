import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {FormContext} from '../context/FormProvider';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(
      /^[a-zA-Z]{2,50}$/,
      'First name must be 2-50 alphabetic characters',
    ),
  lastName: yup
    .string()
    .matches(
      /^[a-zA-Z]*$/,
      'Last name must only contain alphabetic characters',
    ),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters'),
});

const Form2 = props => {
  const {data, updateData} = useContext(FormContext);
  //   console.log('Form2', data);

  const onSave = async values => {
    let res = await updateData({...data, ...values});
    // console.log('onSave', res);
    if (res) {
      props.navigation.navigate('Form3');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          firstName: data?.firstName,
          lastName: data?.lastName,
          address: data?.address,
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          // Handle form submission here
          //   console.log(values);
          onSave(values);
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
            />
            {errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Last Name (optional)"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
            />
            {errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            {errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}
            <View style={styles.btnContainer}>
              <View style={{flex: 1, marginRight: 10}}>
                <Button
                  title="Back"
                  onPress={() => props.navigation.goBack()}
                />
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <Button title="Save and Next" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 16,
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
});

export default Form2;
