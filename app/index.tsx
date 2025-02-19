import React, { } from 'react';
import { Text, View, StyleSheet } from "react-native";
export default function Index() {
    return (
        <View style={styles.container}>
            <Text>INDEX</Text>
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
