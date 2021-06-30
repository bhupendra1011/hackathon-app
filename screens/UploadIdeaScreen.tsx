import * as React from 'react';
import { StyleSheet } from 'react-native';
import TextBox from '../components/TextBox';


import { Text, View } from '../components/Themed';

export default function UploadIdeaScreen() {

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Project</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextBox style={styles.textBox} placeholder="Enter Project Title here ..." value={title} onChangeText={setTitle} />
      <TextBox style={styles.textBox} placeholder="Enter Project Desc here ..." value={description} onChangeText={setDescription} multiline={true} />

    </View>
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
  textBox: {
    marginVertical: 10
  }
});
