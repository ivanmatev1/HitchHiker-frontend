import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import MarkerInterface from "../interfaces/marker.interface";
import { useEffect, useState } from "react";

interface mapsComponentsInterface {
    startMarker: MarkerInterface | null
    endMarker: MarkerInterface | null
    stopMarkers: MarkerInterface[]
    coordinates: { latitude: number, longitude: number }[]
}


export default function MapComponent({ startMarker, endMarker, stopMarkers, coordinates }: mapsComponentsInterface) {
    const [region, setRegion] = useState({ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });

    useEffect(() => {
        if (startMarker && endMarker) {
            const latitudeDelta = Math.abs(Math.abs(endMarker.latitude!) - Math.abs(startMarker.latitude!)) * 2;
            const longitudeDelta = Math.abs(Math.abs(endMarker.longitude!) - Math.abs(startMarker.longitude!)) * 2;
            setRegion({
                latitude: startMarker.latitude!,
                longitude: startMarker.longitude!,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta
            });
        }

        if (startMarker && !endMarker) {
            setRegion({
                latitude: startMarker.latitude!,
                longitude: startMarker.longitude!,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            });
        }

        if (!startMarker && endMarker) {
            setRegion({
                latitude: endMarker.latitude!,
                longitude: endMarker.longitude!,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
            });
        }
    }, [startMarker, endMarker]);

    return (
        <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}
            region={region}
        >

            {startMarker ?
                <Marker
                    coordinate={{ latitude: startMarker.latitude!, longitude: startMarker.longitude! }}
                    title={startMarker.main_text}
                    description="Start destination"
                    pinColor="green"
                />
                : null
            }
            {endMarker ?
                <Marker
                    coordinate={{ latitude: endMarker.latitude!, longitude: endMarker.longitude! }}
                    title={endMarker.name}
                    description="End destination"
                    pinColor="red"
                />
                : null
            }

            {stopMarkers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={{ latitude: marker.latitude!, longitude: marker.longitude! }}
                    title={marker.name}
                    description="Stop destination"
                    pinColor="tan"
                />
            ))}

            <Polyline
                coordinates={coordinates}
                strokeColor="grey"
                strokeWidth={4}
                lineDashPattern={[5, 5]}
            />
        </MapView>
    );
}