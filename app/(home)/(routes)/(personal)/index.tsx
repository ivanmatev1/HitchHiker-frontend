import React, { } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function PersonalRoutes() {
    return (
        <View style={styles.container}>
            <Text>Personal</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
        backgroundColor: "white"
    }
});
