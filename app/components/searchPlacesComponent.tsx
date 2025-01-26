import React, { useState, useRef, SetStateAction, Dispatch } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AntDesign from '@expo/vector-icons/AntDesign';
import MarkerInterface  from '../interfaces/marker.interface';

interface SearchPlacesComponentProps {
    marker: MarkerInterface | null;
    setMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
    placeholder: string;
    stops: boolean;
}

export default function SearchPlacesComponent({marker, setMarker, placeholder, stops}: SearchPlacesComponentProps) {
    const startRef = useRef<any>();

    return (
        <GooglePlacesAutocomplete
                ref={startRef}
                placeholder={placeholder}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    if (!details?.geometry.location.lat || !details?.geometry.location.lng) {
                        startRef.current?.clear();
                    } else {
                        setMarker({
                            latitude: details?.geometry.location.lat,
                            longitude: details?.geometry.location.lng,
                            name: data.description,
                            main_text: data.structured_formatting.main_text
                        });
                        console.log(stops)
                        if(stops){
                            console.log(startRef.current?.getAddressText());
                            startRef.current?.clear();
                            console.log(startRef.current?.getAddressText());
                        }
                    }
                }}
                query={{
                    key: 'AIzaSyCHnCpw0VR8g2FqgCTOSKN7D8molHzDWl8',
                    language: 'en',
                }}
                styles={{
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                    container: styles.textContainer,
                    listView: styles.realListView,
                }}
                
                renderRightButton={() => (
                    <TouchableOpacity onPress={() => {
                        startRef.current?.clear();
                        startRef.current?.blur();
                        setMarker(null);
                    }} style={{ padding: 8 }}>
                        <AntDesign
                            name="close"
                            size={24}
                            color="rgb(20, 5, 18)"
                            style={{ marginRight: 16 }}
                        />
                    </TouchableOpacity>
                )}
            />
    );
}

const styles = StyleSheet.create({
    textContainer: {
        width: '100%',
        maxHeight: 40,
    },
    textInput: {
        width: '100%',
        height: "100%",
        paddingLeft: 10,
        maxHeight: 43
    },
    textInputContainer : {
        width: '100%',
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        
        shadowColor: 'black',
    },
    realListView: {
        position: 'absolute',
        left: 0,
        top: 40,
        zIndex: 102,
        width: '100%'
    }   
});

