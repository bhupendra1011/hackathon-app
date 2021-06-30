import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import {  View } from "../components/Themed";
import projects from "../assets/data/projects.json";
import ProjectListItem from "../components/ProjectListItem";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        {projects.map((project) => (
          <ProjectListItem data={project} key={project.id}/>
        ))}
      </View>
    </ScrollView>
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
