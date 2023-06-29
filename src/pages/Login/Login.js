import React from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import styles from "./Login.style";
import { Formik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";

const initialForm = {
  usermail: '',
  password: ''
};

function Login({ navigation }) {
  const auth = getAuth();

  async function handleFormSubmit(formValues) {
    
    try {
      await signInWithEmailAndPassword(auth, formValues.usermail + "@mail.com", formValues.password);
      navigation.navigate("MainPage");
    } catch (error) {
      showMessage({
        message: "Error",
        type: "danger"
      });
    }
  }

  function handleSign() {
    navigation.navigate("SignPage");
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
            <Button text="Login" theme="primary" onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <Button text="Sign in" theme="secondary" onPress={handleSign} />
    </SafeAreaView>
  );
}

export default Login;
