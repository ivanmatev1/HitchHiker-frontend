import React from 'react';
import { Image } from 'expo-image';
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';

type ChatBoxProps = {
    image: string | null;
    creator: any;
    startDestination: string;
    endDestination: string;
    id: number;
    stops: object[];
};

export default function ChatBox({ image, creator, startDestination, endDestination, id, stops }: ChatBoxProps) {
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
            pathname: '/(home)/(chats)/[id]',
            params: { id: id, creatorName: `${creator.first_name} ${creator.last_name}` },
        }}>
            <View style={styles.container}>
                <Image
                    source={image ? { uri: image } : require("../../assets/images/defaultUser.jpg")}
                    style={styles.image}
                />
                <View style={styles.infoBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>{creator.first_name} {creator.last_name}'s chat</Text>
                    </View>
                    <View style={styles.routeBox}>
                        <MaterialCommunityIcons name="car-side" size={24} color="rgb(92, 87, 92)" />
                        <Text style={styles.textRoute} >
                            {truncateText(startDestination, 6)}
                        </Text>

                        {stops.length > 0 ?
                            <View style={{ flexDirection: "row", alignItems: "center", }}>
                                <FontAwesome name="long-arrow-right" size={24} color="rgb(92, 87, 92)" />
                                <Text style={styles.textRoute}>({stops.length})</Text>
                            </View>
                            : null
                        }

                        <FontAwesome name="long-arrow-right" size={24} color="rgb(92, 87, 92)" />
                        <Text style={styles.textRoute}>
                            {truncateText(endDestination, 6)}
                        </Text>
                    </View>


                </View>
                <AntDesign name="right" size={28} color="rgb(20, 5, 18)" />
            </View>
        </Link>

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
