import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Link, router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { getPersonalRoutes, getUser, getUsers } from '../../components/requestHandler';
import * as SecureStore from 'expo-secure-store';
import WhiteHitchhiker from '@/assets/images/white HitchHiker.svg';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import RouteComponent from '@/app/components/routeComponent';

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [routes, setRoutes] = useState<any>([]);

    async function fetchRoutes() {
        try {
            const routes = await getPersonalRoutes();
            routes.data.forEach((element: any) => {
            });
            setRoutes(routes);
        } catch (error) {
            console.error('Failed to fetch routes:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRoutes();
        }, [])
    );

    async function signOut() {
        try {
            await GoogleSignin.signOut();
            await SecureStore.deleteItemAsync("JWT_TOKEN");
            router.replace("/(login)");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await getUser();
                setUser(user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>

                <ImageBackground
                    source={require('@/assets/images/purpleBackground3.png')}
                    resizeMode="cover"
                    style={{ width: "100%", height: 140 }}
                >
                    <WhiteHitchhiker width={72} height={72} style={{ margin: 16 }} />
                </ImageBackground>


                <Image
                    source={user?.photo ? { uri: user?.photo } : require("../../../assets/images/defaultUser.jpg")}
                    style={styles.image}
                />
                <Text style={{ fontSize: 24, fontWeight: "500" }}>{user?.first_name} {user?.last_name}</Text>

                <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                    <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 4 }}>Sign Out</Text>
                    <FontAwesome name="sign-out" size={20} color='rgb(20, 5, 18)' />
                </TouchableOpacity>

                <View style={{ height: 1, backgroundColor: 'rgb(20, 5, 18)', width: "90%" }} />

                <View style={styles.InfoContainer}>
                    <Text style={{ fontSize: 24, fontWeight: "500" }}>Information</Text>

                    <View style={styles.InfoElement}>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <Feather name="mail" size={20} color="rgb(20, 5, 18)" />
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Email:</Text>
                        </View>

                        <TouchableOpacity style={{ flexDirection: "row", gap: 8, alignItems: "center", }}>
                            <Text style={{ fontSize: 16, fontWeight: "400" }}>{user?.email}</Text>
                            <FontAwesome5 name="edit" size={16} color="rgb(20, 5, 18)" />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.InfoElement}>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <Feather name="phone" size={20} color="rgb(20, 5, 18)" />
                            <Text style={{ fontSize: 16, fontWeight: "500" }}>Phone:</Text>
                        </View>

                        <TouchableOpacity style={{ flexDirection: "row", gap: 8, alignItems: "center", }}>
                            <Text style={{ fontSize: 16, fontWeight: "400" }}>{user?.phone ? user?.phone : "None"}</Text>
                            <FontAwesome5 name="edit" size={16} color="rgb(20, 5, 18)" />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View style={styles.routesContainer}>
                <Text style={{ fontSize: 24, fontWeight: "500", marginBottom: 4 }}>Active Routes</Text>

                {(routes.length === 0 || routes.data.length === 0) ?
                    <Text style={{ textAlign: "center" }}>
                        No routes found
                    </Text>
                    :
                    <FlatList
                        style={{ width: "100%" }}
                        data={routes.data}
                        renderItem={({ item }) =>
                            <View style={{ width: "100%", marginVertical: 8 }}>
                                <RouteComponent
                                    startMarker={item.start_location}
                                    endMarker={item.end_location}
                                    stopMarkers={item.stops}
                                    date={new Date(item.date)}
                                    passengers={item.passangers}
                                    creatorPhoto={item.creator.photo}
                                    id={item.id}
                                    creatorName={item.creator.first_name + " " + item.creator.last_name}
                                    currentPassengers={item.participants.length}
                                />
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
        backgroundColor: "rgb(245, 245, 245)",
    },
    profileContainer: {
        width: "100%",
        backgroundColor: "white",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        alignItems: "center",
    },
    routesContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: 16,
        paddingHorizontal: 32,
        paddingVertical: 16
    },
    profileBar: {
        width: "100%",
        height: 140,
        backgroundColor: "rgb(20, 5, 18)",
        zIndex: 1,
    },
    logo: {
        margin: 16,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "rgb(20, 5, 18)",
        zIndex: 2,
        marginTop: -60,
    },
    signOutButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    InfoContainer: {
        width: "90%",
        padding: 16,
    },
    InfoElement: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: 8,
    },
    EditButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        backgroundColor: "rgb(20, 5, 18)",
        height: 40,
        paddingHorizontal: 8,
        borderRadius: 10,
        width: 80,
    }
});