import * as React from "react";
import { StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { Text, useThemeColor, View } from "../components/Themed";

import VideoPlayer from "../components/VideoPlayer"
import ProfilePicture from "../components/ProfilePicture";
import VotingBar from "../components/VotingBar";
import { Props } from "../constants/types";
import BottomSheet from '@gorhom/bottom-sheet';

import Comments from "./Comments";


import { useRoute } from '@react-navigation/native';
import { Project, Comment } from "../src/models";
import { Storage } from "aws-amplify"

import { DataStore } from "aws-amplify"
import moment from "moment";



export default function DetailInfo() {

    const [project, setProject] = React.useState<Project | null | undefined>(null);
    const [comments, setComments] = React.useState<Comment[]>([]);

    const [image, setImage] = React.useState<string | null>(null);
    const [videoUrl, setVideoUrl] = React.useState<string | null>(null);

    const commentsSheetRef = React.useRef<BottomSheet>(null);
    const color = useThemeColor({}, 'bottomSheet');

    const route = useRoute();
    const projectId = route.params?.id;

    // fetcing details of navigated project details 
    React.useEffect(() => {
        DataStore.query(Project, projectId).then(setProject)
    }, [])


    //fetching video from S3 bucket
    React.useEffect(() => {
        if (!project) return;
        //check if video url is not from S3 storage
        if (project?.videoUrl.startsWith('http')) {
            setVideoUrl(project.videoUrl)
        } else {
            Storage.get(project?.videoUrl).then(setVideoUrl);
        }

        //check if video thumbnail is not from S3 storage
        if (project?.thumbnail.startsWith('http')) {
            setImage(project.thumbnail)
        } else {
            Storage.get(project.thumbnail).then(setImage);
        }

    }, [project])




    //fetcing comments of a particular video
    React.useEffect(() => {
        const fetchComments = async () => {
            if (!project) {
                return;
            }

            const projectComments = (await DataStore.query(Comment)).filter(
                (comment) => comment.projectID === project.id
            );
            // console.log(project.id)
            console.log(projectComments)

            setComments(projectComments);
        };
        fetchComments();

    }, [project])

    // TODO: theme on loading screen
    if (!project) {
        return <ActivityIndicator color="white" style={{ flex: 1 }} size="large" />
    }

    const openComments = () => {
        // open bottom sheet
        commentsSheetRef.current?.expand();

    }

    return (
        <>
            <View style={{ ...styles.container }} >

                <VideoPlayer videoURI={videoUrl}></VideoPlayer>
                <UserInfo data={project} />

                <View
                    style={styles.separator}
                    lightColor="#eee"
                    darkColor="rgba(255,255,255,0.1)"
                />

            </View>

            <Pressable onPress={openComments} style={{ flex: 1, }}>
                <Text style={styles.title}> Feedbacks </Text>
            </Pressable>


            <BottomSheet ref={commentsSheetRef} snapPoints={[0, '40%']} index={0}
                backgroundComponent={({ style }) => <View style={[style, { backgroundColor: color }]} />}
            >
                <Comments comments={comments} projectID={project.id} />
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
        marginVertical: 15,
        textDecorationLine: 'underline',
        marginLeft: 15

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
        marginVertical: 10,

    },

});


const UserInfo = ({ data }: Props) => {
    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignContent: 'flex-start',


                    }
                ]}
            >
                <ProfilePicture
                    imageUrl={data.User?.image}
                    size={35}
                    margin={7}
                />
                <View
                    style={[
                        styles.font_small,
                        {
                            flexDirection: "column",
                            marginLeft: 10
                        }
                    ]}
                >
                    <Text style={styles.font_big}>
                        {data.title}
                    </Text>
                    <View>
                        <Text style={styles.font_small}>
                            {data.User?.name || 'User'} | {moment(data.createdAt).fromNow()}
                        </Text>

                    </View>

                </View>

            </View>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <VotingBar data={data} isEnabled={true} size={25} />
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />

            <Text style={styles.title}>
                Description
            </Text>
            <Text style={styles.description} >
                {data.description}
            </Text>

        </>)
}



