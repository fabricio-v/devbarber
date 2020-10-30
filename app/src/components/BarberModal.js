import React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import ExpandIcon from '../assets/expand.svg'

const Modal = styled.Modal`

`;
const ModalArea = styled.View`
    flex:1;
    background-color: rgba(0,0,0,0.4);
    justify-content: flex-end;
`;
const AreaIcon = styled.View`
    background-color: #83D6E3;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    align-items: center;
    /* padding: 10px 20px 40px 20px ; */
`;
const ModalBody = styled.View`
    background-color: #83D6E3;
    max-height:50%;
    /* border-top-left-radius: 20px;
    border-top-right-radius: 20px; */
    padding: 10px 20px 40px 20px ;
`;
const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;
const ModalItem = styled.View`
    background-color: #fff;
    border-radius: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    padding: 10px;
`;

const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;
const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 20px;
    margin-right: 15px;
`;
const UserName = styled.Text`
    color: #000;
    font-size: 18px;
    font-weight: bold;
`;

const ServiceInfo = styled.View`
    flex-direction:row;
    justify-content:space-between;
`;
const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;
const ServicePrice = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const FinishButton = styled.TouchableOpacity`
    background-color: #268596;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;
const FinishButtonText = styled.Text`
    color: #fff;
    font-size: 17px;
    font-weight: bold;
`;

export default ({ show, setShow, user, service }) => {
    const navigation = useNavigation();

    const handlerCloseButton = () => {
        setShow(false)
    }
    const handleFinishClick = () => {

    }


    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
        >
            <ModalArea>
                <AreaIcon>
                    <CloseButton onPress={handlerCloseButton}>
                        <ExpandIcon width="40" height="40" fill="#000" />
                    </CloseButton>
                </AreaIcon>
                <ModalBody>
                    <ModalItem>
                        <UserInfo>
                            <UserAvatar source={{ uri: user.avatar }} />
                            <UserName>{user.name}</UserName>
                        </UserInfo>
                    </ModalItem>

                    {service != null &&
                        <ModalItem>
                            <ServiceInfo>
                                <ServiceName>{user.services[service].name}</ServiceName>
                                <ServicePrice>R$ {user.services[service].price.toFixed(2)}</ServicePrice>
                            </ServiceInfo>
                        </ModalItem>
                    }

                    <FinishButton onPress={handleFinishClick}>
                        <FinishButtonText>Finalizar Agendamento</FinishButtonText>
                    </FinishButton>

                </ModalBody>
            </ModalArea>
        </Modal>
    )
}
