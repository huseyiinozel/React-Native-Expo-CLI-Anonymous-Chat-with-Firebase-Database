import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import styles from "./Sign.style";
import { Formik } from "formik";
import firebase from 'firebase/app';
import 'firebase/auth';


import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";

function Sign({ navigation }) {
  const initialForm = {
    usermail: '',
    password: '',
    repassword: ''
  };
  const auth = getAuth();

  async function handleFormSubmit(formValues) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: "passwords are not the same",
        type: "danger"
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth,formValues.usermail + "@mail.com" ,formValues.password)
      showMessage({
        message: "User created",
        type: "success"
      });
      navigation.navigate("LoginPage")
    } catch (error) {
      showMessage({
        message: "Error",
        type: "danger"
      });
    }
  }

  function handleLogin() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo_container}>
        <Image style={styles.logo} source={require('../../assets/bir.png')} />
      </View>

      <Formik initialValues={initialForm} onSubmit={handleFormSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <>
            <Input value={values.usermail} onType={handleChange('usermail')} placeholder="Username" />
            <Input value={values.password} onType={handleChange('password')} placeholder="Password" />
            <Input value={values.repassword} onType={handleChange('repassword')} placeholder="Again Password" />
            <Button text="Sign in" theme="primary" onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <Button text="Back" theme="secondary" onPress={handleLogin} />
    </SafeAreaView>
  );
}

export default Sign;
