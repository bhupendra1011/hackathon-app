import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import TextBox from '../components/TextBox';
import Button from '../components/Button';

import * as ImagePicker from 'expo-image-picker';


import { Text, View } from '../components/Themed';
import VideoPlayer from '../components/VideoPlayer';

import { v4 as uuidv4 } from "uuid";
import { Storage, DataStore, Auth } from "aws-amplify";
import * as VideoThumbnails from 'expo-video-thumbnails';

import { useNavigation } from '@react-navigation/core';
import { User } from '../src/models';
import { Project } from '../src/models';

export default function UploadIdeaScreen() {

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const [video, setVideo] = React.useState<string | null>(null);
  const [duration, setDuration] = React.useState(0);


  const [progress, setProgress] = React.useState(0);

  const navigation = useNavigation();


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


  const uploadVideo = async (): Promise<string | null> => {
    if (!video) return null;
    try {
      const response = await fetch(video);
      const blob = await response.blob();
      const fileKey = `${uuidv4()}.mp4`;
      // progress bar width calc
      await Storage.put(fileKey, blob, {
        progressCallback: ({ loaded, total }) => { setProgress(loaded / total); }
      });
      return fileKey
    } catch (err) {
      console.log('Error uploading file:', err);
      return null;
    }
  }

  const generateThumbnail = async () => {
    if (!video) return null;
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        video,
        {
          time: 1000,
        }
      );

      //Upload image to Cloud.
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
        const fileKey = `${uuidv4()}.jpg`;
        await Storage.put(fileKey, blob);
        return fileKey
      } catch (err) {
        console.log('Error uploading file:', err);
        return null;
      }


    } catch (e) {
      console.warn("Error in Generating thumbnail");
      return null;
    }

  }



  const uploadProject = async () => {
    if (!video) return null;
    const fileKey = await uploadVideo();
    const thumbnailKey = await generateThumbnail();

    //fetch current logged in user
    const userInfo = await Auth.currentAuthenticatedUser();
    const userSub = userInfo.attributes.sub;
    const user = (await DataStore.query(User)).find(u => u.sub === userSub);
    if (!user || !fileKey || !thumbnailKey) {
      console.error("Not sufficient data to upload");
      return;
    }
    // save in DB
    await DataStore.save(new Project({
      title: title,
      description: description,
      thumbnail: thumbnailKey,
      videoUrl: fileKey,
      duration: duration,
      techVotes: 0,
      creativeVotes: 0,
      valueVotes: 0,
      userID: user.id
    }))

    console.log(`Video successfuly uploaded`);
    //for next upload
    setVideo(null);
    setDuration(0);
    setTitle('');
    setDescription('');
    setProgress(0);
    navigation.navigate('Home')

  }

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    //console.log(result);

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
      <View style={{ width: `${progress * 100}%`, height: 3, backgroundColor: 'blue' }} />
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
