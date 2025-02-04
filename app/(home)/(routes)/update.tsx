import CreateControl from "@/app/components/createControl";
import { getRoute } from "@/app/components/requestHandler";
import MarkerInterface from "@/app/interfaces/marker.interface";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function Update() {
    const { id } = useLocalSearchParams();

    const [startMarker, setStartMarker] = useState<MarkerInterface | null>(null);
    const [endMarker, setEndMarker] = useState<MarkerInterface | null>(null);
    const [stopMarkers, setStopMarkers] = useState<MarkerInterface[]>([]);

    async function fetchRoute() {
        try {
            if (typeof id === 'string') {
                const route = await getRoute(id);
                setStartMarker(route.start_location);
                setEndMarker(route.end_location);
                setStopMarkers(route.stops);
            }
        } catch (error) {
            console.error('Failed to fetch route:', error);
        }

    };

    useEffect(() => {
        fetchRoute();
    }, [id]);

    return (
        <CreateControl
            startMarker={startMarker}
            endMarker={endMarker}
            stopMarkers={stopMarkers}
            setStartMarker={setStartMarker}
            setEndMarker={setEndMarker}
            setStopMarkers={setStopMarkers}
            mode="Update"
            id={Array.isArray(id) ? id[0] : id}  // typescript...
        />
    );
}