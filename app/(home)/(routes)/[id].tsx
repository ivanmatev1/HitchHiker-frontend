import MapComponent from '@/app/components/mapComponent';
import { acceptRequest, denyRequest, getRoute, getUser, postRouteRequest, removeUser } from '@/app/components/requestHandler';
import MarkerInterface from '@/app/interfaces/marker.interface';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';


export default function RouteIdPage() {
    const { id } = useLocalSearchParams();
    const [route, setRoute] = useState<any>(null);
    const [coordinates, setCoordinates] = useState<{ latitude: number, longitude: number }[]>([]);
    const [role, setRole] = useState<string>("viewer"); // view | participant | creator
    const [requestBool, setRequestBool] = useState<boolean>(false);

    async function fetchRoute() {
        try {
            if (typeof id === 'string') {
                const route = await getRoute(id);
                setRoute(route);

                const user = await getUser();
                if (route.creator.id === user.id) {
                    setRole("creator");
                } else if (route.participants.some((participant: { id: string }) => participant.id === user.id)) {
                    setRole("participant");
                } else {
                    setRole("viewer");
                }

            }
        } catch (error) {
            console.error('Failed to fetch route:', error);
        }

    };

    useEffect(() => {
        fetchRoute();
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

    async function handleRequestToJoin() {
        try {
            await postRouteRequest(+id);
            Toast.show({
                type: 'success',
                text1: 'Request sent successfully',
            });
        } catch (error) {
            console.error('Failed to post request:', error);
        }
    }

    function participantView(item: any) {
        return (
            <View style={styles.userView}>
                {item.id === route.creator.id ?
                    <MaterialCommunityIcons
                        name="crown-outline"
                        size={24} color="rgb(20, 5, 18)"
                        style={{ marginRight: 16, marginVertical: 8 }} />
                    :
                    <AntDesign
                        name="user"
                        size={24}
                        color="rgb(20, 5, 18)"
                        style={{ marginRight: 16, marginVertical: 8 }}
                    />
                }

                <Text style={styles.userText} numberOfLines={1} ellipsizeMode="tail">{item.first_name} {item.last_name}</Text>

                {role === "creator" && item.id !== route.creator.id ?
                    <TouchableOpacity onPress={() => 
                        Alert.alert(
                            "Confirmation", // Title
                            "Are you sure you want to proceed?", // Message
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                {
                                    text: "OK",
                                    onPress: () => kickParticipant(item.id)
                                }
                            ]
                        )
                    }>
                        <AntDesign
                            name="close"
                            size={24}
                            color="rgb(20, 5, 18)"
                            style={{ marginRight: 16, marginVertical: 8 }}
                        />
                    </TouchableOpacity>
                    : null
                }
            </View>
        )
    }

    async function handleAcceptRequest(id: number) {
        try {
            await acceptRequest(id.toString());
            fetchRoute();
        } catch (error) {
            console.error('Failed to accept request:', error);
        }
    }

    async function handleDenyRequest(id: number) {
        console.log(route.id)
        try {
            await denyRequest(id.toString());
            fetchRoute();
        } catch (error) {
            console.error('Failed to deny request:', error);
        }
    }

    async function kickParticipant(userId: number) {
        try {
            await removeUser(userId, +id);
            fetchRoute();
        } catch (error) {
            console.error('Failed to deny request:', error);
        }
    }

    function requestView(item: any) {
        return (
            <View style={styles.userView}>
                <Text style={styles.userText} numberOfLines={1} ellipsizeMode="tail">{item.sender.first_name} {item.sender.last_name}</Text>
                <TouchableOpacity onPress={() => handleDenyRequest(item.id)}>
                    <AntDesign
                        name="close"
                        size={26}
                        color="rgb(20, 5, 18)"
                        style={{ marginRight: 16, marginVertical: 8 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAcceptRequest(item.id)}>
                    <AntDesign
                        name="check"
                        size={26}
                        color="rgb(20, 5, 18)"
                        style={{ marginRight: 8, marginVertical: 8 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.doubleContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Date:</Text>
                    <View style={styles.pickerButton}>
                        <Text style={styles.pickerButtonText}>
                            {route && route.date ?
                                new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(route.date))
                                : "Date not available"
                            }
                        </Text>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Time:</Text>
                    <View style={styles.pickerButton}>
                        <Text style={styles.pickerButtonText}>
                            {route && route.date ?
                                new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(route.date))
                                : "Date not available"
                            }
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.participantsNav}>
                <TouchableOpacity style={styles.title} onPress={() => setRequestBool(false)}>
                    <Text style={styles.pickerButtonText}>Participants</Text>
                </TouchableOpacity>

                {role === "creator" ?
                    <TouchableOpacity style={styles.title} onPress={() => setRequestBool(true)}>
                        <Text style={styles.pickerButtonText}>Requests</Text>
                    </TouchableOpacity>
                    : null}
            </View>
            {route && !requestBool ?
                <FlatList
                    data={route.participants}
                    renderItem={({ item }) => participantView(item)}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    style={styles.list}
                />
                : null}

            {route && requestBool ?
                <FlatList
                    data={route.requests}
                    renderItem={({ item }) => requestView(item)}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    style={styles.list}
                />
                : null}

            {route ?
                <View style={styles.mapContiainer}>
                    <MapComponent startMarker={route.start_location} endMarker={route.end_location} stopMarkers={route.stops} coordinates={coordinates} />
                </View>
                : null}

            <View style={{ width: "90%", alignItems: "flex-end", paddingBottom: 8 }}>
                {role === "creator" ?
                    <Link
                        href={{
                            pathname: '/(home)/(routes)/update',
                            params: { id: id },
                        }}
                        style={{ backgroundColor: "rgb(20, 5, 18)", padding: 10, borderRadius: 10 }}
                    >
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Update</Text>
                    </Link>
                    : null}
                {role === "viewer" ?
                    <TouchableOpacity
                        style={{ backgroundColor: "rgb(20, 5, 18)", padding: 10, borderRadius: 10 }}
                        onPress={handleRequestToJoin}
                    >
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Request to Join</Text>
                    </TouchableOpacity>
                    : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        color: "rgb(20, 5, 18)",
        backgroundColor: "white",
        paddingTop: 4,
    },
    pickerButton: {
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgb(20, 5, 18)",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
        width: "100%",
        height: 45,
        flexDirection: "row",
    },
    pickerButtonText: {
        color: "rgb(20, 5, 18)",
        fontSize: 20,
    },
    doubleContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        gap: 10,
    },
    mapContiainer: {
        width: "90%",
        borderRadius: 20,
        marginVertical: 10,
        height: 350,
        zIndex: 0,
        borderWidth: 0.5,
        overflow: "hidden",
    },
    list: {
        flex: 1,
        width: "90%",
        borderWidth: 0.5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    title: {
        color: "rgb(20, 5, 18)",
        fontSize: 20,
        width: "50%",
        textAlign: "center",
        borderWidth: 0.5,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    participantsNav: {
        width: "90%",
        flexDirection: "row",
    },
    userText: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
        paddingVertical: 10,
        flex: 1,
    },
    userView: {
        width: "100%",
        borderBottomWidth: 0.5,
        borderRadius: 10,
        flexDirection: "row",
        paddingLeft: 16
    },
});
