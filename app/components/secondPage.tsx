import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, Platform, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import MarkerInterface from '@/app/interfaces/marker.interface';
import RouteComponent from '@/app/components/routeComponent';
import { getUser, patchRoute, postRoute } from '@/app/components/requestHandler';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

interface secondPageInteface {
  startMarker: MarkerInterface | null
  endMarker: MarkerInterface | null
  stopMarker: MarkerInterface | null
  stopMarkers: MarkerInterface[]
  coordinates: { latitude: number, longitude: number }[]
  setStartMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
  setEndMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
  setStopMarker: Dispatch<SetStateAction<MarkerInterface | null>>;
  setStopMarkers: Dispatch<SetStateAction<MarkerInterface[]>>;
  setCoordinates: Dispatch<SetStateAction<{ latitude: number, longitude: number }[]>>;
  setFirstPageBool: Dispatch<SetStateAction<boolean>>;
  mode: string;
  id: string;
}

export default function SecondPage({
  startMarker,
  endMarker,
  stopMarker,
  stopMarkers,
  coordinates,
  setStartMarker,
  setEndMarker,
  setStopMarker,
  setStopMarkers,
  setCoordinates,
  setFirstPageBool,
  mode,
  id
}: secondPageInteface
) {

  const [date, setDate] = useState(new Date());
  const [passengers, setNumberOfPassengers] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [creatorName, setCreatorName] = useState('');


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setCreatorName(user.first_name + " " + user.last_name);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  function handleDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  function handleTimeChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowTimePicker(false);
  };

  function handleNumber(text: string) {
    const parsedNumber = parseInt(text, 10);
    if (!isNaN(parsedNumber) && parsedNumber >= 1) {
      setNumberOfPassengers(text);
    } else if (text === "") {
      setNumberOfPassengers("");
    }
  };

  async function handleCreateRoute() {
    if (!passengers || +passengers < 1) {
      Toast.show({
        type: 'error',
        text1: 'Passangers must be at least 1',
      });
      return;
    }
    try {
      const newRoute = {
        start_location: startMarker,
        end_location: endMarker,
        stops: stopMarkers,
        date: date,
        passangers: +passengers,
        completed: false
      }
      if (mode === "Update") {
        await patchRoute(newRoute, id);
      }
      if(mode === "Create"){
        await postRoute(newRoute);
      }
      setStartMarker(null);
      setEndMarker(null);
      setStopMarker(null);
      setStopMarkers([]);
      setCoordinates([]);
      setFirstPageBool(true);
      router.replace("/(home)/(routes)");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.text}>Select a date</Text>
        <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.pickerButtonText}>
            {new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', }).format(date)}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.doubleContainer}>

        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Select an hour</Text>
          <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTimePicker(true)} >
            <Text style={styles.pickerButtonText}>
              {new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(date)}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Passangers</Text>
          <TextInput
            style={styles.passangersInput}
            value={passengers}
            keyboardType="numeric"
            onChangeText={handleNumber}
            placeholder="e.g. 5"
          />
        </View>

      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateRoute}>
        <Text style={styles.createButtonText}>{mode}</Text>
      </TouchableOpacity>

      <View style={{ width: "90%", margin: 20 }}>
        <Text style={{ color: "rgb(20, 5, 18)", fontSize: 16, marginBottom: 10, }}>This is how your route will appear to other users:</Text>
        <RouteComponent startMarker={startMarker} endMarker={endMarker} stopMarkers={stopMarkers} date={date} passengers={passengers} creatorName={creatorName} id={-1} />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          minimumDate={new Date()}
          display={'default'}
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display={'default'}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  text: {
    color: "rgb(20, 5, 18)",
    fontSize: 18,
    marginBottom: 5,
  },
  pickerContainer: {
    width: "90%",
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
    fontSize: 20,
  },
  createButton: {
    backgroundColor: "rgb(20, 5, 18)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: 60,
    marginTop: 15
  },
  createButtonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold"
  },
  doubleContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    gap: 10,
  },
  passangersInput: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "rgb(20, 5, 18)",
    borderRadius: 10,
    marginBottom: 8,
    width: "100%",
    height: 45,
    textAlign: "center",
    color: "rgb(20, 5, 18)",
    fontSize: 20,
  }
});
