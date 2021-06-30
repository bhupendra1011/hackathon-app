import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';

import * as ImagePicker from 'expo-image-picker';


import { Text, View } from '../components/Themed';
import VideoPlayer from '../components/VideoPlayer';

export default function UploadIdeaScreen() {

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const [video, setVideo] = React.useState<string | null>(null);
  const [duration, setDuration] = React.useState(0);


  // reuesting camera permissions on mount , web its allowed by default
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const uploadProject = () => { console.warn("You submitted !") }

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setVideo(result.uri);
      setDuration(Math.floor(result.duration / 100)); // in seconds
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Project</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextBox style={styles.textBox} placeholder="Enter Project Title here ..." value={title} onChangeText={setTitle} />
      <TextBox style={styles.textBox} placeholder="Enter Project Desc here ..." value={description} onChangeText={setDescription} multiline={true} />

      <Button title="Pick a video from camera roll" style={styles.videoSel} onPress={pickVideo} />

      {video && <VideoPlayer videoURI={video} width='80%' style={{ marginTop: 20 }} />}

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
    height: 2,
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
