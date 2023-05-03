import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Post } from "./src/components/Post";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/config/apolloClient";
import Home from "./src/screen/Home";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigation } from "./src/navigation/MainStackNavigation";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </ApolloProvider>
  );
}
