import { Image, Text, View, ScrollView } from "react-native";

export const PostDetail = ({ data }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          marginHorizontal: 15,
          marginVertical: 10,
        }}
      >
        {data?.post?.title}
      </Text>
      <Image
        source={{ uri: data?.post?.imgUrl }}
        style={{ width: "100%", height: 240, backgroundColor: "#e6e6e6" }}
      />

      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#555555" }}>
          By {data?.post?.Author?.username},{" "}
          {data?.post.createdAt?.split("T")[0]}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#555555",
            borderBottomColor: "black",
            borderBottomWidth: 2,
            paddingBottom: 10,
          }}
        >
          {data?.post?.Category?.name} | {data?.post?.Tags[0]?.name}
        </Text>
        <Text style={{ paddingTop: 10, fontWeight: 300 }}>
          {data?.post?.content}
        </Text>
      </View>
    </View>
  );
};
