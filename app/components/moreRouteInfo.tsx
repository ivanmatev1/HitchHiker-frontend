import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import requestView from "./requestView";
import participantView from "./participantView";

interface moreInfoInterface {
    route: any;
    role: string;
    id: any;
    setRoute: Dispatch<SetStateAction<any>>;
    setRole: Dispatch<SetStateAction<string>>;

}

export default function MoreRouteInfo({ route, role, id, setRoute, setRole }: moreInfoInterface) {
    const [requestBool, setRequestBool] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <View style={styles.participantsNav}>
                <TouchableOpacity style={requestBool ? styles.inactiveButton : styles.activeButton} onPress={() => setRequestBool(false)}>
                    <Text style={styles.ButtonText}>Participants</Text>
                </TouchableOpacity>

                {role === "creator" ?
                    <TouchableOpacity style={requestBool ? styles.activeButton : styles.inactiveButton} onPress={() => setRequestBool(true)}>
                        <Text style={styles.ButtonText}>Requests</Text>
                    </TouchableOpacity>
                    : null}
            </View>


            {requestBool ? (
                route.requests.length === 0 ? (
                    <Text style={styles.text}>No requests yet.</Text>
                ) : (
                    <FlatList
                        data={route.requests}
                        renderItem={({ item }) => requestView(item, setRoute, setRole, id)}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingVertical: 10 }}
                        style={styles.list}
                    />
                )
            ) : (
                <FlatList
                    data={route.participants}
                    renderItem={({ item }) => participantView(item, route, role, id, setRoute, setRole)}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    style={styles.list}
                />
            )}

        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 220,
        alignItems: "center",
        color: "rgb(20, 5, 18)",
        marginBottom: 8,
    },
    participantsNav: {
        width: "100%",
        flexDirection: "row",
        gap: 16,
    },
    activeButton: {
        padding: 4,
        borderBottomWidth: 1,
    },
    inactiveButton: {
        padding: 4,
    },
    ButtonText: {
        color: "rgb(20, 5, 18)",
        fontSize: 24,
        fontWeight: "500",
    },
    list: {
        flex: 1,
        width: "100%",
        borderTopWidth: 0.5,
    },
    title: {
        color: "rgb(20, 5, 18)",
        fontSize: 24,
        fontWeight: "700",
    },
    text: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
        fontWeight: "400",
    },

});