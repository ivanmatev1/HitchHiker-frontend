import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text, StyleSheet } from "react-native";
import MarkerInterface from "../interfaces/marker.interface";
import { Link } from "expo-router";

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
        <Link href={{
            pathname: '/(home)/(routes)/[id]',
            params: { id: id},
        }}>
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
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxText}>DATE: {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', }).format(date)}</Text>
                        <Text style={styles.infoBoxText}>TIME: {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)}</Text>
                    </View>

                    <View style={{ width: 0.5, height: "100%", backgroundColor: "rgb(92, 87, 92)" }}>

                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxText}>Participants: 1/{passengers}</Text>
                        <Text style={styles.infoBoxText}>Creator: {creatorName}</Text>
                    </View>
                </View>
            </View>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 120,
        paddingHorizontal: 16,
        borderWidth: 0.5,
        borderRadius: 10,
        marginBottom: 8,
    },
    routeBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 8,
        borderBottomWidth: 0.5,
    },
    textRoute: {
        color: "rgb(92, 87, 92)", // "rgb(20, 5, 18)",
        fontSize: 18,
        fontWeight: 600,
        marginHorizontal: 8
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