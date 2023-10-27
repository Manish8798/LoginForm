import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {FormContext} from '../context/FormProvider';

const validationSchema = yup.object().shape({
  emailId: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=(.*\d){2,})(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*[@#$%^&*!]){2,}).*$/,
      'Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters',
    ),
});

const Form1 = props => {
  const {data, updateData} = useContext(FormContext);
  //   console.log('Form1', data);

  const onSave = async values => {
    let res = await updateData({...data, ...values});
    // console.log('onSave', res);
    if (res) {
      props.navigation.navigate('Form2');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{emailId: data?.emailId, password: data?.password}}
          validationSchema={validationSchema}
          onSubmit={values => {
            // Handle form submission here
            console.log(values);
            onSave(values);
          }}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={styles.inputHeader}>Email ID:</Text>
              <TextInput
                style={styles.input}
                placeholder="Email ID"
                onChangeText={handleChange('emailId')}
                onBlur={handleBlur('emailId')}
                value={values.emailId}
              />
              {errors.emailId && (
                <Text style={styles.error}>{errors.emailId}</Text>
              )}
              <Text style={styles.inputHeader}>Password:</Text>

              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
              <View style={styles.btnContainer}>
                <Button title="Save" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
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
  },
  inputHeader: {
    marginHorizontal: 10,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default Form1;
