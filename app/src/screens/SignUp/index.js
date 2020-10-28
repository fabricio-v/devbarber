import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import { UserContext } from '../../contexts/UserContext'

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles'

import Api from '../../Api'

import SignInput from '../../components/SignInput'

import BarberLogo from '../../assets/barber.svg'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");
    const [nameField, setNameField] = useState("");

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    }

    const handleSignClick = async () => {
        if (emailField != '' && passwordField != '' && nameField != '') {
            let json = await Api.signUp(nameField, emailField, passwordField,);

            if (json.token) {
                await AsyncStorage.setItem('token', json.token); //estou salvando o token no asyncstorage

                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                });
            } else {
                alert("erro: " + json.error);
            }


        } else {
            alert("Preencha os campos")
        }
    }

    return (
        <Container>
            <BarberLogo widht="100%" height="160" />
            <InputArea>
                <SignInput
                    IconSvg={PersonIcon}
                    placeHolder="Digite seu nome"
                    value={nameField}
                    onChangeText={t => setNameField(t)}

                />
                <SignInput
                    IconSvg={EmailIcon}
                    placeHolder="Digite seu email"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}

                />
                <SignInput
                    IconSvg={LockIcon}
                    placeHolder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta? </SignMessageButtonText>
                <SignMessageButtonTextBold>Faça o login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}
