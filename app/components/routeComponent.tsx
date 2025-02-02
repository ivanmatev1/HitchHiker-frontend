import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native";
import MarkerInterface from "../interfaces/marker.interface";

interface routeComponentInterface {
    startMarker: MarkerInterface | null
    endMarker: MarkerInterface | null
    stopMarkers: MarkerInterface[]
    coordinates: { latitude: number, longitude: number }[]
    date: Date
    passengers: string
}


export default function RouteComponent({ startMarker, endMarker, stopMarkers, coordinates, date, passengers }: routeComponentInterface) {
    const truncateText = (text: string | undefined, maxLength: number) => {
        console.log(text);
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
        <View style={styles.container}>
            <View style={styles.routeBox}>
                <MaterialCommunityIcons name="car-side" size={24} color="rgb(92, 87, 92)" />
                <Text style={styles.textRoute} >
                    {truncateText(startMarker?.main_text, 10)}
                </Text>

                {stopMarkers.length > 0 ?
                    <View style={{ flexDirection: "row", alignItems: "center", }}>
                        <FontAwesome name="long-arrow-right" size={24} color="rgb(92, 87, 92)" />
                        <Text style={styles.textRoute}>({stopMarkers.length})</Text>
                    </View>
                    : null
                }

                <FontAwesome name="long-arrow-right" size={24} color="rgb(92, 87, 92)" />
                <Text style={styles.textRoute}>
                    {truncateText(endMarker?.main_text, 10)}
                </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                    <Text>DATE: {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', }).format(date)}</Text>
                    <Text>TIME: {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)}</Text>
                </View>

                <View style={{ width: 0.5, height: "100%", backgroundColor: "rgb(92, 87, 92)" }}>
                
                </View>
                <View style={{ flex: 1 }}>
                    <Text>Participants: 1/{passengers}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 120,
        borderRadius: 15,
        padding: 15,
        borderWidth: 0.5,
    },
    routeBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    textRoute: {
        color: "rgb(92, 87, 92)", // "rgb(20, 5, 18)",
        fontSize: 18,
        fontWeight: 600,
        marginHorizontal: 8
    },
});