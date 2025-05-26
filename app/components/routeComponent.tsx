import { Image } from 'expo-image';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import MarkerInterface from "../interfaces/marker.interface";
import { Link } from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import { LinearGradient } from 'expo-linear-gradient';

interface routeComponentInterface {
    startMarker: MarkerInterface | null
    endMarker: MarkerInterface | null
    stopMarkers: MarkerInterface[]
    date: Date
    passengers: string
    creatorPhoto: string | null
    creatorName: string
    currentPassengers: number
    id: number
}


export default function RouteComponent({ startMarker, endMarker, stopMarkers, date, passengers, creatorPhoto, id, creatorName, currentPassengers }: routeComponentInterface) {


    const truncateText = (text: string | undefined, maxLength: number) => {
        if (!text) {
            return "";
        }
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        } else {
            return text;
        }
    };

    return (
        <Link href={{
            pathname: '/(home)/(routes)/[id]',
            params: { id: id },
        }}
            asChild
        >
            <TouchableOpacity style={styles.container} >

                <View style={styles.creatorBar}>
                    <LinearGradient
                        colors={["rgb(20, 5, 18)", 'rgb(80,4,108)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    >
                        <Image
                            source={creatorPhoto ? { uri: creatorPhoto } : require("../../assets/images/defaultUser.jpg")}
                            style={styles.image}
                        />
                        <Text style={{ color: "white", fontWeight: 700, marginLeft: 8 }}>
                            {creatorName}
                        </Text>
                    </LinearGradient>

                </View>

                <View style={styles.routeBox}>
                    <Text style={styles.textRoute} >
                        {truncateText(startMarker?.main_text, 10)}
                    </Text>

                    <View style={{ alignItems: "center", borderRadius: 8, height: "100%", paddingTop: 27 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ alignItems: "center" }}>
                                <View style={{
                                    width: 60,
                                    borderWidth: 1,
                                    marginTop: stopMarkers.length === 0 ? 0 : 0,
                                }}></View>
                                {stopMarkers.length > 0 ?
                                    <Octicons name="dot-fill" size={16} color="black" style={{ marginTop: -9, zIndex: 2 }} />
                                    : null}
                            </View>

                            {/*  <MaterialCommunityIcons name="car-side" size={20} color="black" style={{ marginLeft: 4, marginTop: -8 }} /> */}
                        </View>
                        {stopMarkers.length === 0 ?
                            <Text style={{ fontWeight: 500 }}>No stops</Text>
                            :
                            <Text style={{ fontWeight: 500, marginTop: - 4 }}>{stopMarkers.length} stops</Text>
                        }
                    </View>

                    <Text style={styles.textRoute}>
                        {truncateText(endMarker?.main_text, 10)}
                    </Text>
                </View>


                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxText}>
                            {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', }).format(date)}
                        </Text>
                        <Text style={styles.infoBoxText}>
                            {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)}
                        </Text>
                    </View>


                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxText}>Participants: {currentPassengers}/{passengers}</Text>
                    </View>

                </View>
            </TouchableOpacity>



        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 0.5,
        borderRadius: 12,
    },
    routeBox: {
        width: "100%",
        height: 56,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 16,
        borderBottomWidth: 1,
    },
    textRoute: {
        color: "rgb(20, 5, 18)",
        fontSize: 18,
        fontWeight: 600,
    },
    infoBox: {
        flex: 1,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
    },
    infoBoxText: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
    },
    creatorBar: {
        width: "100%",
        height: 30,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: "center",
    },
    image: {
        width: 20,
        height: 20,
        borderRadius: 12,
        marginLeft: 12,
        zIndex: 10,
    },
    gradient: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        zIndex: 1,
        alignItems: "center",
        flexDirection: "row",
    }
});