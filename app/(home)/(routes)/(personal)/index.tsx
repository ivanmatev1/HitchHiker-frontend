import { getPersonalRoutes } from '@/app/components/requestHandler';
import RouteComponent from '@/app/components/routeComponent';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

export default function PersonalRoutes() {
    const [routes, setRoutes] = useState<any>([]);

    async function fetchRoutes() {
        try {
            const routes = await getPersonalRoutes();
            setRoutes(routes);
        } catch (error) {
            console.error('Failed to fetch routes:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchRoutes();
        }, [])
    );

    return (
        <View style={styles.container}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(20, 5, 18)",
        backgroundColor: "white"
    }
});
