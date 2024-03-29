import React, { useState, useRef } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { css } from '@emotion/native';
import firebase from 'firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import Logo from '../components/Logo/Logo';
import Button from '../components/Button/Button';
import TextInput from '../components/TextInput/TextInput';
import { theme } from '../core/theme';
import { phoneNumberValidator } from '../helpers/validator';
import { FirebaseApp, FirebaseAuth } from '../firebase/config';
import { InvalidOtpError, UserExistsError } from '../errors/errors';
import MenuBar from '../components/MenuBar/MenuBar';

const getErrText = (loginErr: Error): string => {
  if (!loginErr) {
    return '';
  }

  if (loginErr instanceof UserExistsError) {
    return 'User already exists. Please Login';
  }

  if (loginErr instanceof InvalidOtpError) {
    return 'Invalid OTP. Login again';
  }

  return 'Sorry we had a technical issue';
};

const Login = (props: any) => {
  const loginErr = props.route?.params?.error;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState({ value: '+91 ', error: '' });

  const onLoginPressed = async () => {
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);
    if (!phoneNumberError) {
      setPhoneNumber({ ...phoneNumber, error: 'Invalid phone number format' });
      return;
    }

    if (recaptchaVerifier.current === null) {
      setPhoneNumber({
        ...phoneNumber,
        error: 'Sorry we had a technical issue',
      });
      return;
    }

    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider(FirebaseAuth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber.value,
        recaptchaVerifier.current,
      );

      navigation.navigate('Otp', {
        page: 'Login',
        verificationId: verificationId,
      });
    } catch (err) {
      setPhoneNumber({
        ...phoneNumber,
        error: 'Sorry we had a technical issue',
      });
      return;
    }
  };

  return (
    <View style={LoginStyle.containerWrapper}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={FirebaseApp.options}
        attemptInvisibleVerification={false}
      />
      <MenuBar showBackButton={true} showOnlyBackButton={true} />
      <View style={LoginStyle.container}>
        {loginErr && (
          <Text style={LoginStyle.errorHeader}>{getErrText(loginErr)}</Text>
        )}
        <Logo />
        <Text style={LoginStyle.header}>Welcome Back</Text>
        <TextInput
          returnKeyType="next"
          value={phoneNumber.value}
          onChangeText={(text: string) =>
            setPhoneNumber({ value: text, error: '' })
          }
          error={!!phoneNumber.error}
          errorText={phoneNumber.error}
          autoCapitalize="none"
          placeholder="Phone Number"
        />
        <Button style={LoginStyle.button} onPress={onLoginPressed}>
          Get OTP
        </Button>
        <View style={LoginStyle.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace('Register', {})}>
            <Text style={LoginStyle.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const LoginStyle = {
  containerWrapper: css`
    width: 100%;
    flex: 1;
    background: #fdf6e4;
  `,
  container: css`
    margin-top: 50px;
    align-items: center;
    padding: 0 10px;
  `,
  header: css`
    width: 100%;
    text-align: center;
    font-family: 'Pacifico';
    font-size: 40px;
    margin-bottom: 20px;
    padding: 0 10px;
    color: #560cce;
  `,
  errorHeader: css`
    width: 100%;
    text-align: center;
    font-family: 'Pacifico';
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
  button: css`
    margin: 30px auto 20px auto;
    background: #560cce;
    border: none;
    width: 200px;
  `,
};

export default Login;
