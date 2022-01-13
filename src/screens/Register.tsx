import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { css } from "@emotion/native";
import { PhoneAuthProvider } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import Logo from "../components/Logo/Logo";
import Button from "../components/Button/Button";
import TextInput from "../components/TextInput/TextInput";
import BackButton from "../components/BackButton/BackButton";
import GradientText from "../components/GradientText/GradientText";
import { theme } from "../core/theme";
import { phoneNumberValidator, nameValidator } from "../helpers/validator";
import { FirebaseApp, FirebaseAuth } from "../firebase/config";
import { InvalidOtpError, UserNotExistsError } from "../errors/errors";

const getErrText = (registerErr: Error): string => {
  if (!registerErr) {
    return "";
  }

  if (registerErr instanceof UserNotExistsError) {
    return "User does not exists. Please register";
  }

  if (registerErr instanceof InvalidOtpError) {
    return "Invalid OTP. Register again";
  }

  return "Sorry we had a technical issue";
};

const Register = (props: any) => {
  const registerErr = props.route?.params?.error;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const recaptchaVerifier = useRef(null);
  const [name, setName] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "+91 ", error: "" });

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    if (nameError || phoneNumberError) {
      setName({ ...name, error: nameError });
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      return;
    }

    if (recaptchaVerifier.current === null) {
      setPhoneNumber({
        ...phoneNumber,
        error: "Sorry we had a technical issue",
      });
      return;
    }

    try {
      const phoneProvider = new PhoneAuthProvider(FirebaseAuth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber.value,
        recaptchaVerifier.current
      );
      navigation.navigate("Otp", {
        page: "Register",
        verificationId: verificationId,
        name: name.value,
        phoneNumber: phoneNumber.value,
      });
    } catch (err) {
      setPhoneNumber({
        ...phoneNumber,
        error: "Sorry we had a technical issue",
      });
      return;
    }
  };

  return (
    <View style={RegisterStyle.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FirebaseApp.options}
        attemptInvisibleVerification={true}
      />
      <BackButton />
      {registerErr && (
        <Text style={RegisterStyle.errorHeader}>{getErrText(registerErr)}</Text>
      )}
      <Logo />
      <GradientText style={RegisterStyle.header}>Create Account</GradientText>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: string) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phoneNumber.value}
        onChangeText={(text: string) =>
          setPhoneNumber({ value: text, error: "" })
        }
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
        autoCapitalize="none"
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={RegisterStyle.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Login", {})}>
          <Text style={RegisterStyle.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RegisterStyle = {
  container: css`
    height: 100%;
    display: flex;
    align-items: center;
    background: white;
    padding: 150px 30px 0 30px;
  `,
  header: css`
    width: 100%;
    text-align: center;
    font-family: "Pacifico";
    font-size: 40px;
    margin-bottom: 20px;
    padding: 0 10px;
  `,
  errorHeader: css`
    width: 100%;
    text-align: center;
    font-family: "Pacifico";
    font-size: 22px;
    margin-bottom: 20px;
    color: #e74c3c;
    line-height: 34px;
  `,
  row: css`
    flex-direction: row;
    margin-top: 20px;
  `,
  link: css`
    font-weight: bold;
    color: ${theme.colors.primary};
  `,
};

export default Register;
