import * as React from "react";
import { StyleSheet, FlatList } from "react-native";

// import projects from "../assets/data/projects.json";
import ProjectListItem from "../components/ProjectListItem";

import { Project } from "../src/models";
import { DataStore } from "aws-amplify"

export default function HomeScreen() {


  const [projects, setProjects] = React.useState<Project[]>()
  const [loading, setLoading] = React.useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const projects = await DataStore.query(Project);
      setProjects(projects)

    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    // fetch query   
    fetchProjects();

  }, [])

  return (

    <FlatList
      data={projects}
      refreshing={loading}
      onRefresh={fetchProjects}
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
