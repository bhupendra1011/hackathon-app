import * as React from 'react';
import { StyleSheet } from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';


import { Text, View } from '../components/Themed';

export default function UploadIdeaScreen() {

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const uploadProject = () => { console.warn("You submitted !") }

  const pickVideo = () => { console.warn("Pick Video from Library !") }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Project</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextBox style={styles.textBox} placeholder="Enter Project Title here ..." value={title} onChangeText={setTitle} />
      <TextBox style={styles.textBox} placeholder="Enter Project Desc here ..." value={description} onChangeText={setDescription} multiline={true} />

      <Button title="Pick a video from camera roll" style={styles.videoSel} onPress={pickVideo} />

      <Button title="Submit Your Idea" style={styles.btnSubmit} onPress={uploadProject} />
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
  },
  btnSubmit: {
    marginTop: 25,
  },
  videoSel: {
    marginTop: 15,
    width: '80%'
  }
});
