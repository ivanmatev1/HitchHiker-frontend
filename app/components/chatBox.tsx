import React from 'react';
import { Image } from 'expo-image';
import { Text, StyleSheet, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

type ChatBoxProps = {
    image: string | null;
    creator: string;
    startDestination: string;
    endDestination: string;
    id: number
};

export default function ChatBox({image, creator, startDestination, endDestination, id}: ChatBoxProps) {
    return (
        <View style={styles.container}>
            <Image
                source={image ? { uri: image } : require("../../assets/images/defaultUser.jpg")}
                style={styles.image}
            />
            <View style={styles.infoBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{creator}'s chat</Text>
                </View>
                <View style={styles.routeBox}>
                    <MaterialCommunityIcons name="car-side" size={24} color="rgb(92, 87, 92)" />
                    <Text style={styles.textRoute} >{startDestination}</Text>
                    <FontAwesome name="long-arrow-right" size={24} color="rgb(92, 87, 92)" />
                    <Text style={styles.textRoute}>{endDestination}</Text>
                </View>
            </View>
            <AntDesign name="right" size={28} color="rgb(20, 5, 18)" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 90,
        borderBottomWidth: 1,
        borderColor: "rgb(92, 87, 92)",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 16,
        backgroundColor: "white",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        marginRight: 16,
    },
    infoBox: {
        flex: 1,
        justifyContent: "center",
    },
    routeBox: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    titleBox: {
        //backgroundColor: "rgb(244, 132, 229)",
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    textRoute: {
        color: "rgb(92, 87, 92)",
        fontSize: 18,
        fontWeight: 600,
        marginHorizontal: 8
    },
    title: {
        color: "rgb(20, 5, 18)",
        fontSize: 18,
    }
});
