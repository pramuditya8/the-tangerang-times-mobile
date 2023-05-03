import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const Post = ({ post, index, navigation }) => {
  return (
    <View
      style={{
        marginBottom: 20,
        backgroundColor: "white",
      }}
    >
      {index === 0 && (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          Latest News
        </Text>
      )}
      {index === 1 && (
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginHorizontal: 15,
            marginVertical: 10,
          }}
        >
          More News
        </Text>
      )}
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Detail", {
              id: post.id,
            })
          }
        >
          <Image
            source={{ uri: post.imgUrl }}
            style={{ width: "100%", height: 240, backgroundColor: "#e6e6e6" }}
          />
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("Detail", {
              id: post.id,
            })
          }
        >
          <View
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {post?.title.length > 100
                ? `${post?.title.substring(0, 100)}...`
                : post?.title}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#555555",
                marginVertical: 5,
              }}
            >
              {post?.Category?.name} | {post?.Tags[0]?.name}
            </Text>
            <Text style={{ fontWeight: 300 }}>
              {post?.content.length > 150
                ? `${post?.content.substring(0, 150)}...`
                : post?.content}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
