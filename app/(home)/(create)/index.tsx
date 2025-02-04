import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from "react-native";
import MarkerInterface from '../../interfaces/marker.interface';
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FirstPage from '../../components/firstPage';
import Toast from 'react-native-toast-message';
import SecondPage from '../../components/secondPage';
import CreateControl from '@/app/components/createControl';

export default function Create() {
    const [startMarker, setStartMarker] = useState<MarkerInterface | null>(null);
    const [endMarker, setEndMarker] = useState<MarkerInterface | null>(null);
    const [stopMarker, setStopMarker] = useState<MarkerInterface | null>(null);
    const [stopMarkers, setStopMarkers] = useState<MarkerInterface[]>([]);
    const [coordinates, setCoordinates] = useState<{ latitude: number, longitude: number }[]>([]);
    const [firstPageBool, setFirstPageBool] = useState(true);

    function handleNextButtonPress() {
        if (!startMarker || !endMarker) {
            Toast.show({
                type: 'error',
                text1: 'Start and End destinations are required',
            });
        } else {
            setFirstPageBool(false);
        }
    }

    function handleCloseButtonPress() {
        setEndMarker(null);
        setStartMarker(null);
        setStopMarker(null);
        setStopMarkers([]);
        router.back();
    }

    return (
        <CreateControl
            startMarker={startMarker}
            endMarker={endMarker}
            stopMarkers={stopMarkers}
            setStartMarker={setStartMarker}
            setEndMarker={setEndMarker}
            setStopMarkers={setStopMarkers}
            mode="Create"
            id="" // wont be used in the create mode
        />
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
