import MapComponent from '@/app/components/mapComponent';
import MarkerInterface from '@/app/interfaces/marker.interface';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import { fetchRoute, handleCompleteRoute, handleRequestToJoin } from '@/app/hooks/useRoute';
import participantView from '@/app/components/participantView';
import requestView from '@/app/components/requestView';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import MoreRouteInfo from '@/app/components/moreRouteInfo';


export default function RouteIdPage() {
    const { id } = useLocalSearchParams();
    const [route, setRoute] = useState<any>(null);
    const [coordinates, setCoordinates] = useState<{ latitude: number, longitude: number }[]>([]);
    const [role, setRole] = useState<string>("viewer"); // view | participant | creator
    const [moreInfo, setMoreInfo] = useState<boolean>(false);

    useEffect(() => {
        fetchRoute(id, setRoute, setRole);
    }, [id]);

    useEffect(() => {
        const newCoordinates: { latitude: number, longitude: number }[] = [];
        if (route) {
            if (route.start_location) {
                newCoordinates.push({
                    latitude: route.start_location.latitude!,
                    longitude: route.start_location.longitude!,
                });
            }

            route.stops.forEach((marker: MarkerInterface) => {
                newCoordinates.push({
                    latitude: marker.latitude!,
                    longitude: marker.longitude!,
                });
            });

            if (route.end_location) {
                newCoordinates.push({
                    latitude: route.end_location.latitude!,
                    longitude: route.end_location.longitude!,
                });
            }
        }
        setCoordinates(newCoordinates);
    }, [route]);

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <TouchableOpacity onPress={() => router.back()}>
                    <AntDesign
                        name="left"
                        size={28}
                        color="rgb(20, 5, 18)"
                        style={{ marginHorizontal: 16, marginVertical: 8 }}
                    />
                </TouchableOpacity>
            </View>

            {route ?

                <View style={styles.contentContainer}>
                    <View style={styles.mapContainer}>
                        <MapComponent startMarker={route.start_location} endMarker={route.end_location} stopMarkers={route.stops} coordinates={coordinates} />
                    </View>

                    <View style={styles.infoContainer}>

                        <TouchableOpacity
                            style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
                            onPress={() => setMoreInfo(!moreInfo)
                            }>
                            <AntDesign
                                name="up"
                                size={28}
                                color="rgb(20, 5, 18)"
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>{route.start_location.name}</Text>
                        {route.date ?
                            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
                                <Text style={styles.text}>
                                    {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(route.date))}
                                </Text>
                                <Text style={styles.text}>
                                    {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(route.date))}
                                </Text>
                            </View>
                            :
                            <Text style={styles.text}>Date not available</Text>
                        }
                        <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
                            <Image
                                source={route.creator.photo ? { uri: route.creator.photo } : require("../../../assets/images/defaultUser.jpg")}
                                style={styles.image}
                            />
                            <Text style={styles.text}>
                                {route.creator.first_name + " " + route.creator.last_name}
                            </Text>
                        </View>




                        {moreInfo ? <MoreRouteInfo route={route} role={role} id={id} setRoute={setRoute} setRole={setRole} /> : null}


                        <View style={{ width: "100%", alignItems: "flex-end" }}>
                            {role === "creator" ? (
                                <View style={{ flexDirection: "row", gap: 8 }}>
                                    <Link
                                        href={{
                                            pathname: '/(home)/(routes)/update',
                                            params: { id: id },
                                        }}
                                        style={{ backgroundColor: "rgb(20, 5, 18)", padding: 10, borderRadius: 10, marginBottom: 10 }}
                                    >
                                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Update</Text>
                                    </Link>

                                    {route.completed ? (
                                        <View style={{ borderWidth: 1, borderColor: "rgb(20, 5, 18)", padding: 10, borderRadius: 10, marginBottom: 10 }}>
                                            <Text style={{ color: "rgb(20, 5, 18)", fontSize: 20, fontWeight: "bold" }}>Completed</Text>
                                        </View>
                                    ) : (
                                        <TouchableOpacity
                                            style={{ backgroundColor: "rgb(20, 5, 18)", padding: 10, borderRadius: 10, marginBottom: 10 }}
                                            onPress={() =>
                                                Alert.alert(
                                                    "Confirmation",
                                                    "Are you sure you want to complete this route?",
                                                    [
                                                        {
                                                            text: "Cancel",
                                                            style: "cancel"
                                                        },
                                                        {
                                                            text: "Yes",
                                                            onPress: () => handleCompleteRoute(id, setRoute, setRole),
                                                        }
                                                    ]
                                                )
                                            }
                                        >
                                            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Complete</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ) : null}


                            {role === "viewer" ?
                                <TouchableOpacity
                                    style={{ backgroundColor: "rgb(20, 5, 18)", padding: 10, borderRadius: 10 }}
                                    onPress={() => handleRequestToJoin(id)}
                                >
                                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Request</Text>
                                </TouchableOpacity>
                                : null}

                            {role === "participant" ?
                                <TouchableOpacity
                                    style={{ backgroundColor: "rgb(20, 5, 18)", padding: 10, borderRadius: 10 }}
                                    onPress={() => handleRequestToJoin(id)}
                                >
                                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Leave</Text>
                                </TouchableOpacity>
                                : null}
                        </View>
                    </View>
                </View>

                :
                <ActivityIndicator size="large" color="rgb(20, 5, 18)" />
            }
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
    },
    mapContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -1,
        overflow: "hidden",
    },
    title: {
        color: "rgb(20, 5, 18)",
        fontSize: 24,
        fontWeight: "500",
    },
    text: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
        fontWeight: "400",
    },
    navBar: {
        width: "100%",
        height: 56,
        backgroundColor: "white",
        justifyContent: "center",
    },
    contentContainer: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    infoContainer: {
        width: "100%",
        minHeight: 100,
        backgroundColor: "white",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        paddingVertical: 8,
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 12,
    },
});