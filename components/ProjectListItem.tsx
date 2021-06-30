import React from "react";
import {
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { Text, View } from "./Themed";
import ProfilePicture from "../components/ProfilePicture";
import VotingBar from "../components/VotingBar";
import { Props } from "../constants/types";

const ProjectListItem = ({ data }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img_container}
        source={{
          uri: data.thumbnail,
        }}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img_container: {
    height: 180,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  fs13: {
    fontSize: 13,
  },
});

export default ProjectListItem;
