import MapComponent from "@/app/components/mapComponent";
import SearchPlacesComponent from "@/app/components/searchPlacesComponent";
import MarkerInterface from "@/app/interfaces/marker.interface";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, TouchableOpacity, SafeAreaView, FlatList, Text, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface firstPageInterface {
    startMarker: MarkerInterface | null
    endMarker: MarkerInterface | null
    stopMarker: MarkerInterface | null
    stopMarkers: MarkerInterface[]
    coordinates: { latitude: number, longitude: number }[]
    setStartMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
    setEndMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
    setStopMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
    setStopMarkers: Dispatch<SetStateAction<MarkerInterface[]>>;
    setCoordinates: Dispatch<SetStateAction<{ latitude: number, longitude: number }[]>>
}

export default function FirstPage({
    startMarker,
    endMarker,
    stopMarker,
    stopMarkers,
    coordinates,
    setStartMarker,
    setEndMarker,
    setStopMarker,
    setStopMarkers,
    setCoordinates
}: firstPageInterface) {
    const [marker, setMarker] = useState<MarkerInterface | null>(null);
    const [markers, setMarkers] = useState<MarkerInterface[]>([]);

    useEffect(() => {
        if (stopMarker) {
            setStopMarkers([...stopMarkers, stopMarker]);
            setStopMarker(null);
        }
    }, [stopMarker]);

    useEffect(() => {
        const newCoordinates: { latitude: number, longitude: number }[] = [];
        const newMarkers: MarkerInterface[] = [];

        if (startMarker) {
            newCoordinates.push({
                latitude: startMarker.latitude!,
                longitude: startMarker.longitude!,
            });
            newMarkers.push(startMarker);
        }

        stopMarkers.forEach(marker => {
            newCoordinates.push({
                latitude: marker.latitude!,
                longitude: marker.longitude!,
            });
            newMarkers.push(marker);
        });

        if (endMarker) {
            newCoordinates.push({
                latitude: endMarker.latitude!,
                longitude: endMarker.longitude!,
            });
            newMarkers.push(endMarker);
        }

        setCoordinates(newCoordinates);
    }, [startMarker, endMarker, stopMarkers]);



    useEffect(() => {
        if (startMarker) {
            setMarkers([startMarker]);
        }
        if (stopMarkers.length > 0) {
            setMarkers((prev) => [...prev, ...stopMarkers]);
        }
        if (endMarker) {
            setMarkers((prev) => [...prev, endMarker]);
        }
    }, []);

    useEffect(() => {
        if (markers.length === 0) {
            setStartMarker(null);
            setEndMarker(null);
            setStopMarkers([]);
        } else if (markers.length === 1) {
            setStartMarker(markers[0]);
            setEndMarker(null);
            setStopMarkers([]);
        } else if (markers.length === 2) {
            setStartMarker(markers[0]);
            setEndMarker(markers[1]);
            setStopMarkers([]);
        } else {
            setStartMarker(markers[0]);
            setEndMarker(markers[markers.length - 1]);
            setStopMarkers(markers.slice(1, -1));
        }
    }, [markers]);

    useEffect(() => {
        if (marker) {
            setMarkers([...markers, marker]);
            setMarker(null);
        }
    }, [marker]);


    function deleteMarker(item: MarkerInterface) {
        setMarkers((prev) => prev.filter((marker) => marker.name !== item.name));
    }

    function stopView(item: MarkerInterface) {
        return (
            <View style={styles.stopView}>
                <Text style={styles.stopText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>

                <TouchableOpacity onPress={() => deleteMarker(item)}>
                    <AntDesign
                        name="close"
                        size={24}
                        color="rgb(20, 5, 18)"
                        style={{ marginHorizontal: 16, marginVertical: 8 }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaProvider style={{ width: "100%", height: "100%", paddingHorizontal: 0 }}>
            <SafeAreaView style={styles.container}>
                
                <View style={styles.inputContainer}>
                    <View style={styles.inputView}>
                        <SearchPlacesComponent marker={marker} setMarker={setMarker} placeholder="Search for your stops..." stops={true} />
                    </View>
                    {markers.length <= 0 ?
                        <Text style={styles.text}>No stops yet.</Text>
                        :
                        <FlatList
                            data={markers}
                            renderItem={({ item }) => stopView(item)}
                            keyExtractor={item => item.name} // za sega 
                            contentContainerStyle={{ paddingVertical: 10 }}
                            style={styles.stopsList}
                        />
                    }


                </View>

                <View style={styles.map}>
                    <MapComponent
                        startMarker={startMarker}
                        endMarker={endMarker}
                        stopMarkers={stopMarkers}
                        coordinates={coordinates}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(245, 245, 245)",
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: 420,
        zIndex: 0,
        borderWidth: 4,
        borderColor: "white",
        overflow: "hidden",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: 8,
    },
    text: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
        marginBottom: 5,
        marginTop: 12
    },
    inputView: {
        width: "90%",
        height: 45,
    },
    stopsList: {
        flex: 1,
        width: "90%"
    },
    stopView: {
        paddingHorizontal: 10,
        width: "100%",
        borderWidth: 1,
        marginBottom: 8,
        borderRadius: 16,
        flexDirection: "row",
    },
    stopText: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
        paddingVertical: 10,
        flex: 1
    },
    inputContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 16,
        alignItems: "center",
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
});