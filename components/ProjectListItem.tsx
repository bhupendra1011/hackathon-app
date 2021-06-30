import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import ProfilePicture from "../components/ProfilePicture";
import VotingBar from "../components/VotingBar";
import { Props } from "../constants/types";

const ProjectListItem = ({ data }: Props) => {
  const openDetailsPage = () => console.warn("open next ");

  return (

    <TouchableOpacity onPress={openDetailsPage}>
      {/* Project Image */}
      <Image
        style={styles.thumbnail}
        source={{
          uri: data.thumbnail,
        }}
      />
      {/* Project Details Row */}
      <View
        style={[
          styles.container,
          {
            flexDirection: "row",
            padding: 10,
          },
        ]}
      >
        <ProfilePicture
          imageUrl={data.User.image}
          size={35}
          margin={7}
        ></ProfilePicture>
        <View
          style={[
            styles.container,
            {
              flexDirection: "column",
            },
          ]}
        >
          <Text style={{ alignSelf: "flex-start" }}>{data.title}</Text>
          <View
            style={[
              styles.container,
              {
                flexDirection: "row",
              },
            ]}
          >
            <Text style={styles.fs13}>
              {data.User.name} | {data.createdAt}
            </Text>
            <VotingBar data={data} />
          </View>
        </View>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </TouchableOpacity>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 2,
    width: "100%",
  },
  fs13: {
    fontSize: 13,
  },
});

export default ProjectListItem;
