import FilterModal from '@/app/components/filterModal';
import { filterRoutes } from '@/app/components/requestHandler';
import RouteComponent from '@/app/components/routeComponent';
import MarkerInterface from '@/app/interfaces/marker.interface';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function BrowseRoutes() {
    const [routes, setRoutes] = useState<any>([]);

    const [filterBool, setFilterBool] = useState(false);
    const [filter, setFilter] = useState(false);
    const [startMarker, setStartMarker] = useState<MarkerInterface | null>(null);
    const [endMarker, setEndMarker] = useState<MarkerInterface | null>(null);
    const [date, setDate] = useState<Date | null>(new Date());

    async function fetchRoutes() {
        try {
            const routes = await filterRoutes(
                startMarker?.latitude ?? null,  // if marker exists we take the lat and lng, if not we take null, ?? replaces null and undefined
                startMarker?.longitude ?? null,
                endMarker?.latitude ?? null,
                endMarker?.longitude ?? null,
                date);
            setRoutes(routes);
        } catch (error) {
            console.error('Failed to fetch chats:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRoutes();
        }, [])
    );

    useEffect(() => {
        if (filter) {
            fetchRoutes();
            setFilter(false);
        }
    }, [filter]);

    const toggleFilterModal = () => {
        setFilterBool(!filterBool);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.filterButtonView}>
                    <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
                        <Text style={styles.filterButtonText}>Filter </Text>
                        <AntDesign name={filterBool ? "up" : "down"} size={16} color="rgb(20, 5, 18)" />
                    </TouchableOpacity>

                    {filterBool ?
                        <FilterModal
                            startMarker={startMarker}
                            endMarker={endMarker}
                            date={date}
                            setStartMarker={setStartMarker}
                            setEndMarker={setEndMarker}
                            setDate={setDate}
                            setFilter={setFilter}
                            setFilterBool={setFilterBool}
                        /> : null}
                </View>

                {(routes.length === 0 || routes.data.length === 0) ?
                    <Text style={{ textAlign: "center" }}>
                        No routes found
                    </Text>
                    :
                    <FlatList
                        data={routes.data}
                        renderItem={({ item }) => <RouteComponent
                            startMarker={item.start_location}
                            endMarker={item.end_location}
                            stopMarkers={item.stops}
                            date={new Date(item.date)}
                            passengers={item.passangers}
                            creatorName={item.creator.first_name + " " + item.creator.last_name}
                            id={item.id}
                        />}
                        keyExtractor={item => item.id}
                    />
                }

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        color: "rgb(20, 5, 18)",
    },
    filterButtonView: {
        width: "100%",
        paddingHorizontal: 16,
        borderBottomWidth: 1
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 0.5,
        width: 100,
        borderRadius: 10,
        marginVertical: 8
    },
    filterButtonText: {
        color: "rgb(20, 5, 18)",
        fontSize: 18,
    }
});
