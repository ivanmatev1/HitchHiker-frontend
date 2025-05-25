import 'react-native-get-random-values';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchPlacesComponent from "./searchPlacesComponent";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import MarkerInterface from "../interfaces/marker.interface";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";

interface firstPageInterface {
    startMarker: MarkerInterface | null
    endMarker: MarkerInterface | null
    date: Date | null
    setStartMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
    setEndMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
    setDate: Dispatch<SetStateAction<Date | null>>
    setFilter: Dispatch<SetStateAction<boolean>>
    setFilterBool: Dispatch<SetStateAction<boolean>>
}

export default function FilterModal({
    startMarker,
    endMarker,
    date,
    setStartMarker,
    setEndMarker,
    setDate,
    setFilter,
    setFilterBool
}: firstPageInterface) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    function handleDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
        if (selectedDate) {
            setDate(selectedDate);
        }
        setShowDatePicker(false);
    };

    function handleSearch() {
        setFilter(true);
        setFilterBool(false);
    }

    return (
        <View style={styles.container}>
            <View style={{ width: "100%" }}>
                <Text style={styles.text}>Starting Point</Text>
                <View style={styles.inputView}>
                    <SearchPlacesComponent marker={startMarker} setMarker={setStartMarker} placeholder="Search for your starting point..." stops={false} />
                </View>
            </View >

            <View style={{ width: "100%" }}>
                <Text style={styles.text}>End Point</Text>
                <View style={styles.inputView}>
                    <SearchPlacesComponent marker={endMarker} setMarker={setEndMarker} placeholder="Search for your end point..." stops={false} />
                </View>
            </View >

            <View style={{ width: "100%" }}>
                <Text style={styles.text}>Select a date</Text>
                <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.pickerButtonText}>
                        {date
                            ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
                            : "Select a date"
                        }
                    </Text>
                    <TouchableOpacity onPress={() => { setDate(null); }} style={{ padding: 8 }}>
                        <AntDesign
                            name="close"
                            size={24}
                            color="rgb(20, 5, 18)"
                            style={{ marginRight: 16 }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <View style={{ width: "100%", alignItems: "flex-end"}}>
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                    <AntDesign
                        name="search1"
                        size={20}
                        color="white"
                        style={{ marginLeft: 8 }}
                    />
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={date ?? new Date()}
                    mode="date"
                    is24Hour={true}
                    minimumDate={new Date()}
                    display={'default'}
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        padding: 8,
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
    pickerButton: {
        backgroundColor: "white",
        borderWidth: 0.5,
        borderColor: "rgb(20, 5, 18)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
        width: "100%",
        height: 45,
        flexDirection: "row",
    },
    pickerButtonText: {
        color: "rgb(20, 5, 18)",
        fontSize: 16,
        flex: 1,
        paddingLeft: 16
    },
    searchButton: {
        backgroundColor: "rgb(20, 5, 18)",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        height: 50,
        marginTop: 15,
        flexDirection: "row"
    },
    searchButtonText: {
        color: "white",
        fontSize: 20,
    },
});