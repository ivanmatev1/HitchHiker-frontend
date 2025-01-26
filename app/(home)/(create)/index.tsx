import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from "react-native";
import MarkerInterface from '../../interfaces/marker.interface';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FirstPage from './firstPage';

export default function Create() {
    const [startMarker, setStartMarker] = useState<MarkerInterface | null>(null);
    const [endMarker, setEndMarker] = useState<MarkerInterface | null>(null);
    const [stopMarker, setStopMarker] = useState<MarkerInterface | null>(null);
    const [stopMarkers, setStopMarkers] = useState<MarkerInterface[]>([]);
    const [coordinates, setCoordinates] = useState<{ latitude: number, longitude: number }[]>([]);

    function handleNextButtonPress() {
        console.log(stopMarkers);
    }

    function handleCloseButtonPress() {
        setEndMarker(null);
        setStartMarker(null);
        setStopMarker(null);
        setStopMarkers([]);
        router.back();
    }

    function deleteStopMarker(item: MarkerInterface) {
        setStopMarkers((prev) => prev.filter((marker) => marker.name !== item.name));
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCloseButtonPress}>
                    <AntDesign
                        name="close"
                        size={28}
                        color="rgb(20, 5, 18)"
                        style={{ marginHorizontal: 16, marginVertical: 8 }}
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Create a Route</Text>

                <TouchableOpacity onPress={handleNextButtonPress}>
                    <AntDesign
                        name="right"
                        size={28}
                        color="rgb(20, 5, 18)"
                        style={{ marginHorizontal: 16, marginVertical: 8 }}
                    />
                </TouchableOpacity>

            </View>

            <FirstPage {...{ startMarker, endMarker, stopMarker, stopMarkers, coordinates, setStartMarker, setEndMarker, setStopMarker, setStopMarkers, setCoordinates }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingHorizontal: 0,
    },
    title: {
        color: "rgb(20, 5, 18)",
        fontSize: 24,
        fontWeight: "500",
        flex: 1,
        textAlign: "center"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10
    }
});
