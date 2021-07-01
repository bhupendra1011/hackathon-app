import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { Entypo, Feather, FontAwesome, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "./Themed";
import { Props } from "../constants/types";


const VoteIcon = ({ type, status, size = 20, setVote }: { type: string, status: boolean, size?: number }) => {

  //update count of parent component


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

const VotingBar = ({ data, isEnabled, size = 20, style = {} }: Props) => {



  const [techVotesCount, setTechVotesCount] = React.useState(() => data.techVotes)
  const [creativeVotesCount, setCreativeVotesCount] = React.useState(() => data.techVotes)
  const [valueVotesCount, setValueVotesCount] = React.useState(() => data.techVotes)

  //TODO: This is will be based on current user's vote status.
  const [voteStatus, setVoteStatus] = useState({
    creative: false,
    technical: false,
    value: false
  })

  const pushVote = (type: string) => {
    setVoteStatus({ ...voteStatus, [type]: !voteStatus[type] })
  };

  return (
    <View style={{ ...style, flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity disabled={!isEnabled} onPress={() => pushVote('creative')} style={styles.vote_icon}>
        <VoteIcon type='creative' status={voteStatus.creative} size={size} setVote={setCreativeVotesCount} />
        <Text style={{ fontSize: size - 5, marginLeft: 5 }}>{creativeVotesCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!isEnabled} onPress={() => pushVote('technical')} style={styles.vote_icon}>
        <VoteIcon type='technical' status={voteStatus.technical} size={size} setVote={setTechVotesCount} />
        <Text style={{ fontSize: size - 5, marginLeft: 5 }}>{techVotesCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity disabled={!isEnabled} onPress={() => pushVote('value')} style={styles.vote_icon}>

        <VoteIcon type='value' status={voteStatus.value} size={size} setVote={setValueVotesCount} />
        <Text style={{ fontSize: size - 5, marginLeft: 5 }}>{valueVotesCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    alignItems: "center",
    flexDirection: 'row',

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
