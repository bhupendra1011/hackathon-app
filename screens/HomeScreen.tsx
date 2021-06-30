import * as React from "react";
import { StyleSheet, FlatList } from "react-native";

import projects from "../assets/data/projects.json";
import ProjectListItem from "../components/ProjectListItem";

export default function HomeScreen() {
  return (

    <FlatList data={projects}
      renderItem={({ item }) => <ProjectListItem data={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
