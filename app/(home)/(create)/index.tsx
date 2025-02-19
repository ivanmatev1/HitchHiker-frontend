import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from "react-native";
import MarkerInterface from '../../interfaces/marker.interface';
import CreateControl from '@/app/components/createControl';

export default function Create() {
    const [startMarker, setStartMarker] = useState<MarkerInterface | null>(null);
    const [endMarker, setEndMarker] = useState<MarkerInterface | null>(null);
    const [stopMarkers, setStopMarkers] = useState<MarkerInterface[]>([]);

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
