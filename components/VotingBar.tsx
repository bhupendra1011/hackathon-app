import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "./Themed";
import { Props } from "../constants/types";

const VotingBar = ({ data }: Props) => {
  const creativeColor = useThemeColor({}, "creativeIcon");
  const technicalColor = useThemeColor({}, "technicalIcon");
  const valueColor = useThemeColor({}, "valueIcon");
  const onClick = () => {};
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.container}>
          <Entypo name="light-bulb" size={20} color={creativeColor} />
          <Text>{data.creativeVotes}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.container}>
          <Feather name="tool" size={20} color={technicalColor} />
          <Text>{data.techVotes}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.container}>
          <FontAwesome name="dollar" size={20} color={valueColor} />
          <Text>{data.valueVotes}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default VotingBar;
