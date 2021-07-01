import * as React from "react";
import { StyleSheet, FlatList } from "react-native";

// import projects from "../assets/data/projects.json";
import ProjectListItem from "../components/ProjectListItem";

import { Project } from "../src/models";
import { DataStore } from "aws-amplify"

export default function HomeScreen() {


  const [projects, setProjects] = React.useState<Project[]>()

  React.useEffect(() => {
    // fetch query
    DataStore.query(Project).then(setProjects)
  }, [])

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
