import React from 'react';
import { Image } from 'expo-image';
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Octicons from '@expo/vector-icons/Octicons';

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
        }}
            asChild>
            <TouchableOpacity style={styles.container}>
                <View style={styles.creatorBar}>
                    <LinearGradient
                        colors={["rgb(20, 5, 18)", 'rgb(80,4,108)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    >
                        <Image
                            source={image ? { uri: image } : require("../../assets/images/defaultUser.jpg")}
                            style={styles.image}
                        />
                        <Text style={{ color: "white", fontWeight: 700, marginLeft: 8 }}>
                            {creator.first_name} {creator.last_name}
                        </Text>
                    </LinearGradient>
                </View>

                <View style={{ flexDirection: "row", width: "100%", alignItems: "center"}}>
                    <View style={styles.routeBox}>
                        <Text style={styles.textRoute} >
                            {truncateText(startDestination, 10)}
                        </Text>

                        <View style={{ alignItems: "center", borderRadius: 8, height: "100%", paddingTop: 27 }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <View style={{ alignItems: "center" }}>
                                    <View style={{
                                        width: 60,
                                        borderWidth: 1,
                                    }}></View>
                                    {stops.length > 0 ?
                                        <Octicons name="dot-fill" size={16} color="black" style={{ marginTop: -9, zIndex: 2 }} />
                                        : null}
                                </View>

                            </View>
                            {stops.length === 0 ?
                                <Text style={{ fontWeight: 500 }}>No stops</Text>
                                :
                                <Text style={{ fontWeight: 500, marginTop: - 4 }}>{stops.length} stops</Text>
                            }
                        </View>

                        <Text style={styles.textRoute}>
                            {truncateText(endDestination, 10)}
                        </Text>


                    </View>
                    <AntDesign name="right" size={28} color="rgb(20, 5, 18)" style={{ marginRight: 12 }} />
                </View>

            </TouchableOpacity>
        </Link>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 92,
        borderWidth: 1,
        borderColor: "rgb(20, 5, 18)",
        alignItems: "center",
        borderRadius: 16,
    },
    creatorBar: {
        width: "100%",
        height: 30,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
    },
    routeBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",

    },
    textRoute: {
        color: "rgb(20, 5, 18)",
        fontSize: 18,
        fontWeight: 600,
    },
});
