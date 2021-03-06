import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

import ExpandIcon from '../assets/expand.svg'
import NavPrevIcon from '../assets/nav_prev.svg'
import NavNextIcon from '../assets/nav_next.svg'

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
    margin-top: 10px;
    margin-bottom: 10px;
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
    margin-top: 10px;
`;
const FinishButtonText = styled.Text`
    color: #fff;
    font-size: 17px;
    font-weight: bold;
`;

const DateInfo = styled.View`
    flex-direction: row;
`;
const DatePrevArea = styled.TouchableOpacity`
    flex:1;
    justify-content: flex-end;
    align-items: flex-end;
`;
const DateTitleArea = styled.View`
    width: 140px;
    justify-content: center;
    align-items: center;
`;
const DateTitle = styled.Text`
    font-size: 17px;
    font-weight:bold;
    color: #000;
`;
const DateNextArea = styled.TouchableOpacity`
    flex:1;
    justify-content: flex-start;
    align-items: flex-start;
`;
const DateList = styled.ScrollView``;
const DateItem = styled.TouchableOpacity`
    width: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`;
const DateItemWeekday = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;
const DateItemNumber = styled.Text`
    font-size: 16px;
    font-weight: bold;
`;

const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

const days = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sab'
];

export default ({ show, setShow, user, service }) => {
    const navigation = useNavigation();

    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedHour, setSelectedHour] = useState(null);
    const [listDays, setListDays] = useState([]);
    const [listHours, setListHours] = useState([]);

    useEffect(() => {
        if (user.available) {
            let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
            let newListDays = [];

            for (let i = 1; i <= daysInMonth; i++) {
                let d = new Date(selectedYear, selectedMonth, i);
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let day = d.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                // let selDate = year + '-' + month + '-' + day;
                let selDate = `${year}-${month}-${day}`;

                let availability = user.available.filter(e => e.date === selDate);

                newListDays.push({
                    status: availability.length > 0 ? true : false,
                    weekDay: days[d.getDay()],
                    number: i
                })
            }
            setListDays(newListDays);
            setSelectedDay(1);
            setListHours([]);
            setSelectedHour(0);
        }
    }, [user, selectedMonth, selectedYear]);

    useEffect(() => {
        let today = new Date();

        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDay(today.getDate());
    }, []);

    const handleLeftDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() - 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(1);
    }

    const handleRightDateClick = () => {
        let mountDate = new Date(selectedYear, selectedMonth, 1);
        mountDate.setMonth(mountDate.getMonth() + 1);
        setSelectedYear(mountDate.getFullYear());
        setSelectedMonth(mountDate.getMonth());
        setSelectedDay(1);
    }

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
                        <ExpandIcon width="40" height="40" fill="#ffff" />
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

                    <ModalItem>
                        <DateInfo>
                            <DatePrevArea onPress={handleLeftDateClick}>
                                <NavPrevIcon width="35" height="35" fill="#000" />
                            </DatePrevArea>

                            <DateTitleArea>
                                <DateTitle>{months[selectedMonth]} {selectedYear}</DateTitle>
                            </DateTitleArea>

                            <DateNextArea onPress={handleRightDateClick}>
                                <NavNextIcon width="35" height="35" fill="#000" />
                            </DateNextArea>
                        </DateInfo>

                        <DateList horizontal={true} showsHorizontalScrollIndicator={false}>
                            {/* {listDays.map((item, key) => {
                                <DateItem
                                    key={key}
                                    onPress={() => { }}
                                >
                                    <DateItemWeekday>{item.weekday}</DateItemWeekday>
                                    <DateItemNumber>{item.number}</DateItemNumber>
                                </DateItem>
                            })} */}
                            <DateItem onPress={() => { }}>
                                <DateItemWeekday>{days[3]}</DateItemWeekday>
                                <DateItemNumber>1</DateItemNumber>
                            </DateItem>
                            <DateItem onPress={() => { }}>
                                <DateItemWeekday>{days[4]}</DateItemWeekday>
                                <DateItemNumber>2</DateItemNumber>
                            </DateItem>
                            <DateItem onPress={() => { }}>
                                <DateItemWeekday>{days[5]}</DateItemWeekday>
                                <DateItemNumber>3</DateItemNumber>
                            </DateItem>
                            <DateItem onPress={() => { }}>
                                <DateItemWeekday>{days[6]}</DateItemWeekday>
                                <DateItemNumber>4</DateItemNumber>
                            </DateItem>
                            <DateItem onPress={() => { }}>
                                <DateItemWeekday>{days[0]}</DateItemWeekday>
                                <DateItemNumber>5</DateItemNumber>
                            </DateItem>
                            <DateItem onPress={() => { }}>
                                <DateItemWeekday>{days[1]}</DateItemWeekday>
                                <DateItemNumber>6</DateItemNumber>
                            </DateItem>
                            <DateItem onPress={() => { }}>
                                <DateItemWeekday>{days[2]}</DateItemWeekday>
                                <DateItemNumber>7</DateItemNumber>
                            </DateItem>
                            <DateItem onPress={() => { }}>
                                <DateItemWeekday>{days[3]}</DateItemWeekday>
                                <DateItemNumber>8</DateItemNumber>
                            </DateItem>
                        </DateList>
                    </ModalItem>

                    <FinishButton onPress={handleFinishClick}>
                        <FinishButtonText>Finalizar Agendamento</FinishButtonText>
                    </FinishButton>

                </ModalBody>
            </ModalArea>
        </Modal>
    )
}
