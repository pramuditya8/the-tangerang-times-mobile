import { FlatList, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/postQueries";
import { Post } from "../components/Post";

export const Home = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_POSTS);
  // console.log(data);
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
    <View style={{ backgroundColor: "#fff" }}>
      <FlatList
        data={data.posts}
        renderItem={({ item, index }) => (
          <Post post={item} index={index} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
