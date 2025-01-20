import React, { } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView from 'react-native-maps';

export default function Create() {
    return (
        <View style={styles.container}>
            <Text>Create</Text>
            <MapView style={styles.map} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
    },
    map: {
        width: "100%",
        height: 400,
    }
});
