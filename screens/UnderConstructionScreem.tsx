import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import comments from "../assets/data/comments.json";

import { Text, View } from '../components/Themed';
import VideoPlayer from '../components/VideoPlayer';
import BottomSheet from '@gorhom/bottom-sheet';
import Comments from '../components/Comments';

import { Auth } from "aws-amplify";


export default function UnderConstructionScreen() {
    const commentsSheetRef = React.useRef<BottomSheet>(null);
    const openComments = () => {
        // open bottom sheet
        commentsSheetRef.current?.expand();

    }

    const onLogout = () => {
        Auth.signOut();

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> 🛠 Screen Under Construction </Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            {/* TODO: to remove */}
            {/* <VideoPlayer
                videoURI="https://res.cloudinary.com/dqbrq8pbi/video/upload/v1624810540/hackathon/Zero_Contact_Record_Entry_System_eh1sic.mp4"
                thumbnailURI="https://i.ibb.co/HrhTkg2/iot-proj.jpg" /> */}

            {/* <Pressable onPress={openComments} style={{ padding: 10, marginVertical: 10 }}>
                <Text>Comments </Text>
            </Pressable>


            <BottomSheet ref={commentsSheetRef} snapPoints={[0, '40%']} index={0}
                backgroundComponent={({ style }) => <View style={[style, { backgroundColor: "red" }]} />}
            >
                <Comments comments={comments} />
            </BottomSheet> */}

            {/* LogOut */}
            <Pressable onPress={onLogout}>
                <Text style={styles.title}>LogOut</Text>
            </Pressable>


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
});