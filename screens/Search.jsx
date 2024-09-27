import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Text, ScrollView, TouchableOpacity } from "react-native";
import RestaurantCard from "../components/RestaurantCard";
import { set, ref, get, child } from "firebase/database";
import { database } from "../firebase";

// const addSampleLocations = () => {
//   const locationData = [
//     {
//       id: "4",
//       name: "Flammen",
//       address: "H.C. Andersen Alle 1",
//       postalcode: "1201",
//       city: "København K",
//       type: "Restaurant",
//       cuisine: "Steakhouse",
//       priceclass: "Mellem",
//       waitlist: true,
//     },
//   ];

//   locationData.forEach((location) => {
//     set(ref(database, `locations/${location.id}`), location)
//       .then(() => console.log("Location added successfully!"))
//       .catch((error) => console.error("Error adding location:", error));
//   });
// };

// // Call this function to insert the sample data into the database
// addSampleLocations();

const Search = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [waitlistFilter, setWaitlistFilter] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = () => {
      const dbRef = ref(database);
      get(child(dbRef, "locations"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const locationsArray = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setLocations(locationsArray);
          } else {
            console.log("No locations data available");
          }
        })
        .catch((error) => {
          console.error("Error fetching locations:", error);
        });
    };

    fetchLocations();
  }, []);

  // Filter function based on city and waitlist
  const filterResults = () => {
    let filteredResults = locations;

    if (selectedCity) {
      filteredResults = filteredResults.filter((location) =>
        location.city.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    if (waitlistFilter) {
      filteredResults = filteredResults.filter((location) => location.waitlist);
    }

    return filteredResults;
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headline}>
          Vælg en <Text style={{ color: "#00BFFF" }}>by</Text>
        </Text>

        {/* City Filter Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.cityButton, selectedCity === "København" && styles.activeCityButton]}
            onPress={() => setSelectedCity("København")}
          >
            <Text style={styles.buttonText}>København</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cityButton, selectedCity === "Aarhus" && styles.activeCityButton]}
            onPress={() => setSelectedCity("Aarhus")}
          >
            <Text style={styles.buttonText}>Aarhus</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cityButton, selectedCity === "Odense" && styles.activeCityButton]}
            onPress={() => setSelectedCity("Odense")}
          >
            <Text style={styles.buttonText}>Odense</Text>
          </TouchableOpacity>
        </View>

        {/* Waitlist Filter Toggle */}
        <TouchableOpacity
          style={[styles.button, waitlistFilter ? styles.activeButton : null]}
          onPress={() => setWaitlistFilter(!waitlistFilter)}
        >
          <Text style={styles.buttonText}>
            {waitlistFilter ? "Venteliste: Aktiv" : "Venteliste: Inaktiv"}
          </Text>
        </TouchableOpacity>

        <View style={styles.cardContainer}>
          {/* Filtered Results */}
          {filterResults().map((location) => (
            <RestaurantCard
              key={location.id}
              name={location.name}
              cuisine={location.cuisine}
              image="https://picsum.photos/500/500"
              rating="5"
              address={location.address}
              postalcode={location.postalcode}
              city={location.city}
              type={location.type}
              priceclass={location.priceclass}
              waitlist={location.waitlist}
            />
          ))}
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 200,
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
    marginLeft: 15,
  },
  wrapper: {
    backgroundColor: "#242424",
  },
  container: {
    flex: 1,
    paddingTop: 85,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headline: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    width: "93%",
    marginBottom: 15,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  cityButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  activeCityButton: {
    backgroundColor: "#00BFFF",
  },
  button: {
    width: "90%",
    padding: 15,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#00BFFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Search;
