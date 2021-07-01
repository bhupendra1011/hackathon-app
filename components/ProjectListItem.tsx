import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import ProfilePicture from "../components/ProfilePicture";
import VotingBar from "../components/VotingBar";
import { Props } from "../constants/types";
import { useNavigation } from "@react-navigation/native";


import moment from 'moment'
import { Project } from "../src/models";

type ProjectListProps = {
    data: Project
}

const ProjectListItem = (props: ProjectListProps) => {
    const { data } = props;
    const navigation = useNavigation();
    const openDetailsPage = () => navigation.navigate("DetailScreen", { id: data.id });

    //  console.log(data);

    return (

        <TouchableOpacity onPress={openDetailsPage}>
            {/* Project Image */}
            <Image
                style={styles.thumbnail}
                source={{
                    uri: data.thumbnail,
                }}
            />
            {/* Project Details Row */}
            <View style={styles.infoRow} >
                {/* Left side */}
                <ProfilePicture
                    imageUrl={data.User.image}
                    size={35}
                    margin={7}
                ></ProfilePicture>

                {/* RightSide */}
                <View style={styles.rightSide}>

                    <Text>{data.title}</Text>
                    <View style={styles.votingRow}>
                        <Text style={styles.fs13}>
                            {data.User.name} | {moment(data.createdAt).fromNow()}
                        </Text>
                        <VotingBar style={{ flex: 1 }} data={data} />
                    </View>
                </View>
            </View>

            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
        </TouchableOpacity>


    );
};

const styles = StyleSheet.create({
    votingRow: {
        flexDirection: "row",

    },
    infoRow: {
        flexDirection: "row",
        padding: 10
    },
    rightSide: {
        flex: 1,
        marginHorizontal: 5

    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    thumbnail: {
        width: "100%",
        aspectRatio: 16 / 9,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 10,
        height: 2,
        width: "100%",
    },
    fs13: {
        fontSize: 13,
    },
});

export default ProjectListItem;
