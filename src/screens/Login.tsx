import React, { useState, useRef } from "react";
import { TouchableOpacity, View, Text } from "react-native";
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
import { phoneNumberValidator } from "../helpers/validator";
import { FirebaseApp, FirebaseAuth } from "../firebase/config";
import { InvalidOtpError, UserExistsError } from "../errors/errors";

const getErrText = (loginErr: Error): string => {
  if (!loginErr) {
    return "";
  }

  if (loginErr instanceof UserExistsError) {
    return "User already exists. Please Login";
  }

  if (loginErr instanceof InvalidOtpError) {
    return "Invalid OTP. Login again";
  }

  return "Sorry we had a technical issue";
};

const Login = (props: any) => {
  const loginErr = props.route?.params?.error;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState({ value: "+91 ", error: "" });

  const onLoginPressed = async () => {
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    if (phoneNumberError) {
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
        page: "Login",
        verificationId: verificationId,
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
    <View style={LoginStyle.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FirebaseApp.options}
        attemptInvisibleVerification={true}
      />
      <BackButton />
      {loginErr && (
        <Text style={LoginStyle.errorHeader}>{getErrText(loginErr)}</Text>
      )}
      <Logo />
      <GradientText style={LoginStyle.header}>Welcome Back</GradientText>
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
      <Button mode="contained" onPress={onLoginPressed}>
        Get OTP
      </Button>
      <View style={LoginStyle.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("Register", {})}>
          <Text style={LoginStyle.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LoginStyle = {
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
  forgotPassword: css`
    width: 100%;
    align-items: flex-end;
    margin-bottom: 10px;
  `,
  row: css`
    flex-direction: row;
    margin-top: 20px;
  `,
  forgot: css`
    font-size: 13px;
    color: ${theme.colors.secondary};
  `,
  link: css`
    font-weight: bold;
    color: ${theme.colors.primary};
  `,
};

export default Login;
