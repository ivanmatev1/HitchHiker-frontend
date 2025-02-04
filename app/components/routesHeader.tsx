import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RoutesHeader() {

    return (
        <View style={styles.header}>
            <Link href={'/(home)/(routes)/(browse)/'} style={styles.button}>
                <Text style={styles.title}>Browse</Text>
            </Link>
            <Link href={'/(home)/(routes)/(personal)/'} style={styles.button}>
                <Text style={styles.title}>Personal</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderRadius: 10,
    },
    title: {
        color: "rgb(20, 5, 18)",
        fontSize: 20,
        fontWeight: 500,
    },
    button: {
        height: "100%",
        flex: 1,
        backgroundColor: "white",
        textAlign: "center",
        textAlignVertical: "center",
    }
});

