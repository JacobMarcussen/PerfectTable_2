import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Search from "./screens/Search";
import Locations from "./screens/Locations";
import LocationDetails from "./screens/LocationDetails";

const Settings = () => {
  return <View />;
};

// Stack Navigator for Locations
const LocationsStack = createStackNavigator();

function LocationsStackScreen() {
  return (
    <LocationsStack.Navigator initialRouteName="Locations">
      <LocationsStack.Screen
        name="Locations"
        component={Locations}
        options={{ headerShown: false }}
      />
      <LocationsStack.Screen
        name="LocationDetails"
        component={LocationDetails}
        options={{ headerShown: false }}
      />
    </LocationsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#242424",
            borderTopColor: "#EAEAEA",
            paddingBottom: 25,
            paddingTop: 10,
          },
          tabBarActiveTintColor: "#00BFFF",
          tabBarInactiveTintColor: "#B0B0B0",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Udforsk") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Søg") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 0,
          },
        })}
      >
        <Tab.Screen
          name="Udforsk"
          component={LocationsStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Søg" component={Search} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
