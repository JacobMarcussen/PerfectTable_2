import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const LocationDetails = ({ route }) => {
  const navigation = useNavigation();
  const { name, cuisine, address, postalcode, city, type, priceclass, image } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      {/* restaurant detaljer */}
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.info}>
        {type} • {cuisine}
      </Text>
      <Text style={styles.info}>
        Address: {address}, {postalcode} {city}
      </Text>
      <Text style={styles.info}>Price Class: {priceclass}</Text>
      <TouchableOpacity style={styles.bookButton} onPress={() => alert("Booking table...")}>
        <Text style={styles.bookButtonText}>Book bord</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bookButton: {
    backgroundColor: "#00BFFF",
    padding: 18,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 130,
    backgroundColor: "#242424",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#313131",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fff",
  },
});

export default LocationDetails;
