import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native";
import MarkerInterface from "../interfaces/marker.interface";
import { Link } from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';

interface routeComponentInterface {
    startMarker: MarkerInterface | null
    endMarker: MarkerInterface | null
    stopMarkers: MarkerInterface[]
    date: Date
    passengers: string
    creatorName: string
    id: number
}


export default function RouteComponent({ startMarker, endMarker, stopMarkers, date, passengers, creatorName, id }: routeComponentInterface) {
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
        <Link style={styles.container} href={{
            pathname: '/(home)/(routes)/[id]',
            params: { id: id },
        }}>
            <View style={styles.routeBox}>
                <Text style={styles.textRoute} >
                    {truncateText(startMarker?.main_text, 10)}
                </Text>


                <View style={{ alignItems: "center", paddingVertical: 8, paddingTop: 32, marginHorizontal: 4 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ alignItems: "center" }}>
                            <View style={{
                                width: 60,
                                borderWidth: 1,
                                marginTop: stopMarkers.length <= 0 ? -6 : 0,
                            }}></View>
                            {stopMarkers.length > 0 ?
                                <Octicons name="dot-fill" size={16} color="black" style={{ marginTop: -9 }} />
                                : null}
                        </View>

                        <MaterialCommunityIcons name="car-side" size={20} color="black" style={{ marginLeft: 4, marginTop: -8 }} />
                    </View>
                    {stopMarkers.length <= 0 ?
                        <Text style={{ fontWeight: 500, marginTop: -4 }}>No stops</Text>
                        :
                        <Text style={{ fontWeight: 500, marginTop: -4 }}>{stopMarkers.length} stops</Text>
                    }
                </View>



                <Text style={styles.textRoute}>
                    {truncateText(endMarker?.main_text, 10)}
                </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxText}>
                        DATE: {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', }).format(date)}
                    </Text>
                    <Text style={styles.infoBoxText}>
                        TIME: {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)}
                    </Text>
                </View>

                <View style={{ width: 0.5, height: "100%", backgroundColor: "rgb(92, 87, 92)" }}>

                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxText}>Participants: 1/{passengers}</Text>
                    <Text style={styles.infoBoxText}>Creator: {creatorName}</Text>
                </View>

            </View>



        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom: 8,
        flexDirection: "row",
    },
    routeBox: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 8,
        borderBottomWidth: 0.5,
    },
    textRoute: {
        color: "rgb(20, 5, 18)",
        fontSize: 18,
        fontWeight: 600,
    },
    infoBox: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        textAlign: "center",
        paddingLeft: 8
    },
    infoBoxText: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
    }
});