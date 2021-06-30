import * as React from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import project from "../assets/data/project.json";
import VideoPlayer from "../components/VideoPlayer"
import ProfilePicture from "../components/ProfilePicture";
import VotingBar from "../components/VotingBar";
import { Props } from "../constants/types";
import BottomSheet from '@gorhom/bottom-sheet';

import Comments from "./Comments";
import comments from "../assets/data/comments.json";
const UserInfo = ({ data }: Props) => {
    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignContent: 'flex-start',

                    }
                ]}
            >
                <ProfilePicture
                    imageUrl={data.User.image}
                    size={35}
                    margin={7}
                />
                <View
                    style={[
                        styles.font_small,
                        {
                            flexDirection: "column",
                        }
                    ]}
                >
                    <Text style={styles.font_big}>
                        {data.title}
                    </Text>
                    <View>
                        <Text style={styles.font_small}>
                            {data.User.name} | {data.createdAt}
                        </Text>

                    </View>

                </View>

            </View>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <VotingBar data={project} isEnabled={true} size={25} />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />

            <Text style={styles.title}>
                Description
            </Text>
            <Text style={styles.description} >
                {project.description}
            </Text>

        </>)
}


export default function DetailInfo() {
    const commentsSheetRef = React.useRef<BottomSheet>(null);
    const openComments = () => {
        // open bottom sheet
        commentsSheetRef.current?.expand();

    }
    return (
        <>
            <ScrollView style={{ ...styles.container }}>

                <VideoPlayer videoURI={project.videoUrl}></VideoPlayer>
                <UserInfo data={project} />

                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />

            </ScrollView>

            <Pressable onPress={openComments} style={{ flex: 1, borderWidth: 2, borderBottomColor: "red" }}>
                <Text style={styles.title}> Feedbacks </Text>
            </Pressable>


            <BottomSheet ref={commentsSheetRef} snapPoints={[0, '40%']} index={0}
                backgroundComponent={({ style }) => <View style={[style, { backgroundColor: "red" }]} />}
            >
                <Comments comments={comments} />
            </BottomSheet>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,

    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,

    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: "100%"
    },
    font_small: {
        flexDirection: "row", alignSelf: "flex-start",
        color: 'gray',
    },
    font_big: {
        fontSize: 16,
        alignSelf: "flex-start",
        paddingBottom: 5
    },
    description: {
        lineHeight: 20,
        fontSize: 16,
        marginVertical: 10
    },

});

