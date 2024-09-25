import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, Text, ScrollView, TouchableOpacity } from "react-native";
import RestaurantCard from "../components/RestaurantCard";
import { set, ref, get, child } from "firebase/database";
import { database } from "../firebase";
import { useNavigation } from "@react-navigation/native";

// function addTestLocation() {
//   set(ref(database, "locations/1"), {
//     name: "Firebase test restaurant",
//     address: "Bredgade 1",
//     postalcode: "1260",
//     city: "København K",
//     type: "Restaurant",
//     cuisine: "Dansk",
//     priceclass: "Mellem",
//     waitlist: true,
//   })
//     .then(() => {
//       console.log("Test data added successfully!");
//     })
//     .catch((error) => {
//       console.error("Error adding test data: ", error);
//     });
// }

// addTestLocation();

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const navigation = useNavigation();

  // Fetching locations from Firebase
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
          console.error("Error fetching data: ", error);
        });
    };

    fetchLocations();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headline}>
          Anbefalede <Text style={{ color: "#00BFFF" }}>lokationer</Text>
        </Text>
        <View style={styles.cardContainer}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              onPress={() =>
                navigation.navigate("LocationDetails", {
                  name: location.name,
                  cuisine: location.cuisine,
                  address: location.address,
                  postalcode: location.postalcode,
                  city: location.city,
                  type: location.type,
                  priceclass: location.priceclass,
                  image: "https://picsum.photos/500/500", // Placeholder image
                })
              }
              style={styles.cardWrapper}
            >
              <RestaurantCard
                name={location.name}
                cuisine={location.cuisine}
                image="https://picsum.photos/500/500" // Placeholder image
                rating="5"
                address={location.address}
                postalcode={location.postalcode}
                city={location.city}
                type={location.type}
                priceclass={location.priceclass}
                waitlist={location.waitlist}
              />
            </TouchableOpacity>
          ))}
        </View>
        <StatusBar style="auto" />
      </View>

      <View style={styles.containerWaitlist}>
        <Text style={styles.headline}>
          Mulighed for <Text style={{ color: "#00BFFF" }}>venteliste</Text>
        </Text>
        {locations
          .filter((location) => location.waitlist)
          .map((location) => (
            <TouchableOpacity
              key={location.id}
              onPress={() =>
                navigation.navigate("LocationDetails", {
                  name: location.name,
                  cuisine: location.cuisine,
                  address: location.address,
                  postalcode: location.postalcode,
                  city: location.city,
                  type: location.type,
                  priceclass: location.priceclass,
                  image: "https://picsum.photos/500/500",
                })
              }
              style={styles.cardWrapper}
            >
              <RestaurantCard
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
            </TouchableOpacity>
          ))}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    paddingTop: 85,
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
    backgroundColor: "#242424",
  },
  cardWrapper: {
    width: "50%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },
  headline: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "start",
    width: "93%",
    marginBottom: 15,
    color: "#fff",
  },
  containerWaitlist: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#242424",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
  },
});

export default Locations;
