import { useQuery } from "@apollo/client";
import React from "react";
import { Text, View, ScrollView } from "react-native";
import { GET_POST } from "../queries/postQueries";
import { PostDetail } from "../components/PostDetail";

export const Detail = ({ route }) => {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId: id },
  });
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Something went wrong.</Text>
      </View>
    );

  return (
    <ScrollView>
      <PostDetail data={data} />
    </ScrollView>
  );
};
