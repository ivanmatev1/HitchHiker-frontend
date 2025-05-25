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

                <View style={{ flexDirection: "row", gap: 4}}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={firstPageBool ? styles.activeStep : styles.inactiveStep}>
                            <Text style={{  color: firstPageBool ?  "white" : "rgb(20, 5, 18)", fontSize: 18, fontWeight: "700" }}>1</Text>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: "500" }}>Location</Text>
                    </View>


                    <View style={styles.dottedLine} />

                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <View style={firstPageBool ? styles.inactiveStep : styles.activeStep}>
                            <Text style={{ color: firstPageBool ? "rgb(20, 5, 18)" : "white", fontSize: 18, fontWeight: "700" }}>2</Text>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: "500" }}>Details</Text>
                    </View>

                </View>


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
                    <SecondPage {...{ startMarker, endMarker, stopMarker, stopMarkers, coordinates, setStartMarker, setEndMarker, setStopMarker, setStopMarkers, setCoordinates, setFirstPageBool, mode, id }} />
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
        justifyContent: "space-between",
        width: "100%",
        paddingVertical: 4,
    },
    inactiveStep: {
        height: 48,
        width: 48,
        borderColor: "rgb(20, 5, 18)",
        borderWidth: 2,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    activeStep: {
        height: 48,
        width: 48,
        borderColor: "rgb(20, 5, 18)",
        backgroundColor: "rgb(20, 5, 18)",
        color: "white",
        borderWidth: 1,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    dottedLine: {
        borderBottomWidth: 2,
        width: 24,
        borderColor: "rgb(20, 5, 18)",
        borderStyle: 'dotted',
        marginTop: 24,
        marginBottom: "auto",
    },
});
