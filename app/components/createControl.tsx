import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from "react-native";
import { router } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import MarkerInterface from '../interfaces/marker.interface';
import FirstPage from './firstPage';
import SecondPage from './secondPage';

interface createControlInterface {
    startMarker: MarkerInterface | null
    endMarker: MarkerInterface | null
    stopMarkers: MarkerInterface[]
    setStartMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
    setEndMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
    setStopMarkers: Dispatch<SetStateAction<MarkerInterface[]>>;
    mode: string; // "Create" | "Update"
    id: string;
}

export default function CreateControl(
    { startMarker, endMarker, stopMarkers, setStartMarker, setEndMarker, setStopMarkers, mode, id }: createControlInterface
) {
    const [stopMarker, setStopMarker] = useState<MarkerInterface | null>(null);
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
        <View style={styles.container}>
            <View style={styles.header}>
                {firstPageBool ?
                    <TouchableOpacity onPress={handleCloseButtonPress}>
                        <AntDesign
                            name="close"
                            size={28}
                            color="rgb(20, 5, 18)"
                            style={{ marginHorizontal: 16, marginVertical: 8 }}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => setFirstPageBool(true)}>
                        <AntDesign
                            name="left"
                            size={28}
                            color="rgb(20, 5, 18)"
                            style={{ marginHorizontal: 16, marginVertical: 8 }}
                        />
                    </TouchableOpacity>
                }

                <Text style={styles.title}>{mode} a Route</Text>

                {firstPageBool ?
                    <TouchableOpacity onPress={handleNextButtonPress}>
                        <AntDesign
                            name="right"
                            size={28}
                            color="rgb(20, 5, 18)"
                            style={{ marginHorizontal: 16, marginVertical: 8 }}
                        />
                    </TouchableOpacity> : <View style={{ width: 50 }}></View>}

            </View>
            {firstPageBool ?
                <FirstPage {...{ startMarker, endMarker, stopMarker, stopMarkers, coordinates, setStartMarker, setEndMarker, setStopMarker, setStopMarkers, setCoordinates }} />
                :
                <View style={{ width: "100%", height: "100%" }}>
                    <SecondPage {...{ startMarker, endMarker, stopMarker, stopMarkers, coordinates, setStartMarker, setEndMarker, setStopMarker, setStopMarkers, setCoordinates, setFirstPageBool, mode, id }}/>
                </View>
                }
            <Toast />
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
