import React, {createContext, useState} from 'react';

const FormContext = createContext();

const FormProvider = ({children}) => {
  const initialState = {
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
  };
  const [state, setState] = useState(initialState);

  const updateData = async newData => {
    console.log('FormProvider', newData);
    try {
      setState(newData);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  return (
    <FormContext.Provider value={{data: state, updateData}}>
      {children}
    </FormContext.Provider>
  );
};

export {FormProvider, FormContext};
