import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../components/Themed";
import project from "../assets/data/project.json";
import VideoPlayer from "../components/VideoPlayer"
import ProfilePicture from "../components/ProfilePicture";
import VotingBar from "../components/VotingBar";
import { Props } from "../constants/types";
const UserInfo = ({ data }: Props) => {
    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignContent: 'flex-start'
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
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: "column"
                    }
                ]}
            >
                <Text style={styles.font_big}>
                    Description
                </Text>
                <Text >
                    {project.description}
                </Text>

            </View></>)
}

const Feedback = () => {
    return (<View
        style={[
            styles.container,
            {
                flexDirection: "column"
            }
        ]}
    ><Text style={styles.font_big}>
            Feedback
        </Text>

    </View>)
}
export default function DetailInfo() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <VideoPlayer videoURI={project.videoUrl}></VideoPlayer>
                <UserInfo data={project} />
            </View>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />

            <Feedback />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 5
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
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

    }
});
