import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { kickParticipant } from "@/app/hooks/useRoute";

export default function participantView(item: any, route: any, role: string, id: any, setRoute: Dispatch<SetStateAction<any>>, setRole: Dispatch<SetStateAction<string>>) {
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
                        "Confirmation",
                        "Are you sure you want to kick this participant?",
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            {
                                text: "Yes",
                                onPress: () => kickParticipant(item.id, id, setRoute, setRole),
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

const styles = StyleSheet.create({
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
