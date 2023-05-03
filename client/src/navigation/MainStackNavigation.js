import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screen/Home";
import { Detail } from "../screen/Detail";
import { Logo } from "../components/Logo";

export const MainStackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: (props) => <Logo {...props} /> }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{ headerTitle: (props) => <Logo {...props} /> }}
      />
    </Stack.Navigator>
  );
};
