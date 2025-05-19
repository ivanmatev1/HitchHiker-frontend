import MapComponent from "@/app/components/mapComponent";
import SearchPlacesComponent from "@/app/components/searchPlacesComponent";
import MarkerInterface from "@/app/interfaces/marker.interface";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dispatch, SetStateAction, useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, FlatList, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface firstPageInteface {
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
}: firstPageInteface) {

    useEffect(() => {
        if (stopMarker) {
            setStopMarkers([...stopMarkers, stopMarker]);
            setStopMarker(null);
        }
    }, [stopMarker]);

    useEffect(() => {
        const newCoordinates: { latitude: number, longitude: number }[] = [];

        if (startMarker) {
            newCoordinates.push({
                latitude: startMarker.latitude!,
                longitude: startMarker.longitude!,
            });
        }

        stopMarkers.forEach(marker => {
            newCoordinates.push({
                latitude: marker.latitude!,
                longitude: marker.longitude!,
            });
        });

        if (endMarker) {
            newCoordinates.push({
                latitude: endMarker.latitude!,
                longitude: endMarker.longitude!,
            });
        }

        setCoordinates(newCoordinates);
    }, [startMarker, endMarker, stopMarkers]);

    function deleteStopMarker(item: MarkerInterface) {
        setStopMarkers((prev) => prev.filter((marker) => marker.name !== item.name));
    }

    function stopView(item: MarkerInterface) {
        return (
            <View style={styles.stopView}>
                <Text style={styles.stopText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>

                <TouchableOpacity onPress={() => deleteStopMarker(item)}>
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
        <SafeAreaProvider style={{ flex: 1, paddingHorizontal: 0 }}>
            <SafeAreaView style={styles.container}>
                {/* Everything goes to 90% if the the first element is not to a 100%*/}
                <View style={{ width: "100%" }}>
                    <Text style={{ fontSize: 1 }}></Text>
                </View >

                <View style={{ width: "90%" }}>
                    <Text style={styles.text}>Starting Point</Text>
                    <View style={styles.inputView}>
                        <SearchPlacesComponent
                            marker={startMarker}
                            setMarker={setStartMarker}
                            placeholder="Search for your starting point..."
                            stops={false} />
                    </View>
                </View >

                <View style={{ width: "90%" }}>
                    <Text style={styles.text}>End Point</Text>
                    <View style={styles.inputView}>
                        <SearchPlacesComponent marker={endMarker} setMarker={setEndMarker} placeholder="Search for your end point..." stops={false} />
                    </View>
                </View>

                <View style={{ flex: 1, width: "90%" }}>
                    <Text style={styles.text}>Stops</Text>
                    <View style={styles.inputView}>
                        <SearchPlacesComponent marker={stopMarker} setMarker={setStopMarker} placeholder="Search for your stops..." stops={true} />
                    </View>
                    <FlatList
                        data={stopMarkers}
                        renderItem={({ item }) => stopView(item)}
                        keyExtractor={item => item.name} // za sega 
                        contentContainerStyle={{ paddingVertical: 10 }}
                        style={styles.stopsList}
                    />
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
        width:400,
        backgroundColor: "white",
        alignItems: "center",
    },
    map: {
        width: "90%",
        borderRadius: 20,
        marginVertical: 10,
        height: 320,
        zIndex: 0,
        borderWidth: 0.5,
        overflow: "hidden",
    },
    text: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
        marginBottom: 5,
        marginTop: 12
    },
    inputView: {
        width: "100%",
        height: 45,
    },
    stopsList: {
        flex: 1,
        borderWidth: 0.5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    stopView: {
        paddingHorizontal: 10,
        width: "100%",
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        flexDirection: "row",
    },
    stopText: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
        paddingVertical: 10,
        flex: 1
    }
});
