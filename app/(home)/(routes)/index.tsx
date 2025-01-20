import React, { } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Routes() {
    return (
        <View style={styles.container}>
            <Text>Routes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
    }
});
