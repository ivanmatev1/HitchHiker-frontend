import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { handleAcceptRequest, handleDenyRequest } from '@/app/hooks/useRoute';
import { Dispatch, SetStateAction } from 'react';

export default function requestView(item: any, setRoute: Dispatch<SetStateAction<any>>, setRole: Dispatch<SetStateAction<string>>, routeId: any) {
        return (
            <View style={styles.userView}>
                <Text style={styles.userText} numberOfLines={1} ellipsizeMode="tail">
                    {item.sender.first_name} {item.sender.last_name}
                </Text>
                <TouchableOpacity onPress={() => handleDenyRequest(routeId, item.id, setRoute, setRole)}>
                    <AntDesign
                        name="close"
                        size={26}
                        color="rgb(20, 5, 18)"
                        style={{ marginRight: 16, marginVertical: 8 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAcceptRequest(routeId, item.id, setRoute, setRole)}>
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

    export const styles = StyleSheet.create({
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