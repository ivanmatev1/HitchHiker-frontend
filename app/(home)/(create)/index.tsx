import React, { useState } from 'react';
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
