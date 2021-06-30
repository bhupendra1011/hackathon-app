import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { Entypo, Feather, FontAwesome, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "./Themed";
import { Props } from "../constants/types";


const VoteIcon = ({ type, status, size = 20 }: { type: string, status: boolean, size?: number }) => {


  switch (type) {
    case 'creative':
      const creativeColor = useThemeColor({}, "creativeIcon");
      return (status ? <Ionicons name="ios-bulb" size={size} color={creativeColor} /> : <Ionicons name="ios-bulb-outline" size={size} color={creativeColor} />);
      break;
    case 'technical':
      const technicalColor = useThemeColor({}, "technicalIcon");
      return (status ? <MaterialCommunityIcons name="wrench" size={size} color={technicalColor} /> : <MaterialCommunityIcons name="wrench-outline" size={size} color={technicalColor} />)
      break;
    case 'value':
      const valueColor = useThemeColor({}, "valueIcon");
      return (status ? <MaterialCommunityIcons name="currency-usd-circle" size={size} color={valueColor} /> : <MaterialCommunityIcons name="currency-usd-circle-outline" size={size} color={valueColor} />)
      break;
    default:
      return null;
  }
}

const VotingBar = ({ data, isEnabled, size = 20 }: Props) => {
  const [voteStatus, setVoteStatus] = useState({
    creative: true,
    technical: false,
    value: false
  })

  const pushVote = (type: string) => {
    setVoteStatus({ ...voteStatus, [type]: !voteStatus[type] })
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={!isEnabled} onPress={() => pushVote('creative')} style={styles.vote_icon}>
        <VoteIcon type='creative' status={voteStatus.creative} size={size} />
        <Text style={{ fontSize: size - 5 }}>{data.creativeVotes}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!isEnabled} onPress={() => pushVote('technical')} style={styles.vote_icon}>
        <VoteIcon type='technical' status={voteStatus.technical} size={size} />
        <Text style={{ fontSize: size - 5 }}>{data.techVotes}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!isEnabled} onPress={() => pushVote('value')} style={styles.vote_icon}>

        <VoteIcon type='value' status={voteStatus.value} size={size} />
        <Text style={{ fontSize: size - 5 }}>{data.valueVotes}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: '100%', flexDirection: 'row',

  },
  vote_icon: {
    flex: 1,

    justifyContent: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default VotingBar;
