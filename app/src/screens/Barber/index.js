import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Swiper from 'react-native-swiper'
import { Text } from 'react-native'

import Stars from '../../components/Stars'
import BarberModal from '../../components/BarberModal'

import FavoriteIcon from '../../assets/favorite.svg'
import FavoriteFullIcon from '../../assets/favorite_full.svg'
import BackIcon from '../../assets/back.svg'
import NavPrevIcon from '../../assets/nav_prev.svg'
import NavNextIcon from '../../assets/nav_next.svg'
import Api from '../../Api'

import {
    Container,
    Scroller,
    BackButton,
    LoadingIcon,

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,

    PageBody,

    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,


    ServiceArea,
    ServicesTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseButtonText,

    TestimonialArea,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody
} from './styles'



export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getBarberInfo = async () => {
            setLoading(true);
            const json = await Api.getBarber(userInfo.id);
            if (json.error == '') {
                setUserInfo(json.data);
                setFavorited(json.data.favorited);
            } else {
                alert("Error: " + json.error)
            }
            setLoading(false);
        }
        getBarberInfo();
    }, []);

    const handlerBackButton = () => {
        navigation.goBack();
    }

    const handleFavClick = async () => {
        setFavorited(!favorited);
        Api.setFavorite(userInfo.id);
    }

    const handleServiceChoose = (key) => {
        setSelectedService(key);
        setShowModal(true);
    }

    return (
        <Container>
            <Scroller>
                {/* {userInfo.photos && userInfo.photos.length > 0
                    ? <Swiper
                        style={{ height: 240 }}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                        autoplay={true}
                    >
                        {userInfo.photos.map((item, key) => {
                            <SwipeItem key={key}>
                                <SwipeImage source={{ uri: item.url }} resizeMode="cover" />
                            </SwipeItem>
                        })}
                    </Swiper>
                    : <FakeSwiper>

                    </FakeSwiper>
                } */}
                <FakeSwiper>

                </FakeSwiper>
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{ uri: userInfo.avatar }} />
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true} />
                        </UserInfo>
                        <UserFavButton onPress={handleFavClick}>
                            {favorited
                                ? <FavoriteFullIcon width="24" height="24" fill="#ff0000" />
                                : <FavoriteIcon width="24" height="24" fill="#ff0000" />
                            }
                        </UserFavButton>
                    </UserInfoArea>
                    {loading &&
                        <LoadingIcon size="large" color="#000" />
                    }
                    {/* {userInfo.services &&
                        <ServiceArea>
                            <ServicesTitle>Lista de serviços</ServicesTitle>
                            {userInfo.services.map((i, k) => {
                                <ServiceItem key={k}>
                                    <ServiceInfo>
                                        <ServiceName>{i.name}</ServiceName>
                                        <ServicePrice>R$ {i.price}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={()=>handleServiceChoose(k)}>
                                        <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            })}
                        </ServiceArea>
                    } */}
                    <ServiceArea>
                        <ServicesTitle>Lista de serviços</ServicesTitle>
                        <ServiceItem>
                            <ServiceInfo>
                                <ServiceName>Aparação de Unha</ServiceName>
                                <ServicePrice>R$ {92.8.toFixed(2)}</ServicePrice>
                            </ServiceInfo>
                            <ServiceChooseButton onPress={()=>handleServiceChoose(1)}>
                                <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                            </ServiceChooseButton>
                        </ServiceItem>
                    </ServiceArea>
                    {/* {userInfo.testimonials && userInfo.testimonials.size > 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{ height: 110 }}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000" />}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000" />}
                            >
                                {userInfo.testimonials.map((item, key) => {
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody />
                                    </TestimonialItem>
                                })}
                            </Swiper>
                        </TestimonialArea>
                    } */}
                    <TestimonialArea>
                        <Swiper
                            style={{ height: 110 }}
                            showsPagination={false}
                            showsButtons={true}
                            prevButton={<NavPrevIcon width="35" height="35" fill="#000" />}
                            nextButton={<NavNextIcon width="35" height="35" fill="#000" />}
                        >
                            <TestimonialItem>
                                <TestimonialInfo>
                                    <TestimonialName>Fabricio Ventura</TestimonialName>
                                    <Stars stars="4.2" showNumber={false} />
                                </TestimonialInfo>
                                <TestimonialBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae neque urna. Vestibulum viverra dictum.</TestimonialBody>
                            </TestimonialItem>
                            <TestimonialItem>
                                <TestimonialInfo>
                                    <TestimonialName>Alice Ventura</TestimonialName>
                                    <Stars stars="3.0" showNumber={false} />
                                </TestimonialInfo>
                                <TestimonialBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae neque urna. Vestibulum viverra dictum.</TestimonialBody>
                            </TestimonialItem>
                            <TestimonialItem>
                                <TestimonialInfo>
                                    <TestimonialName>Leonardo Crispim</TestimonialName>
                                    <Stars stars="5.0" showNumber={false} />
                                </TestimonialInfo>
                                <TestimonialBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae neque urna. Vestibulum viverra dictum.</TestimonialBody>
                            </TestimonialItem>
                        </Swiper>
                    </TestimonialArea>
                </PageBody>
            </Scroller>
            <BackButton onPress={handlerBackButton}>
                <BackIcon width="44" height="44" fill="#fff" />
            </BackButton>

            <BarberModal
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            />
        </Container>
    )
}
