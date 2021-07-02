import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import Comment from './Comment'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Feather } from '@expo/vector-icons';

import { DataStore, Auth } from "aws-amplify";

import { Text, useThemeColor, View } from './Themed';
import TextBox from './TextBox';
import { User, Comment as CommentModel } from '../src/models';

interface ProjectCommentProps {
    comments: CommentModel[],
    projectID: string,
}


const Comments = ({ comments, projectID }: ProjectCommentProps) => {
    const [newComment, setNewComment] = React.useState("");

    const [feedbacks, setFeedbacks] = React.useState(() => comments)

    const color = useThemeColor({}, 'text');

    const submitCommit = async () => {
        // get current authenticated user;
        const userInfo = await Auth.currentAuthenticatedUser();
        const userSub = userInfo.attributes.sub;
        const allUsers = await DataStore.query(User);
        // console.log(allUsers);

        const user = allUsers.find(u => u.sub === userSub);

        if (!user) {
            console.error("user not found");
            return;
        }

        await DataStore.save(new CommentModel({
            comment: newComment,
            projectID,
            userID: user.id
        })
        );
        setFeedbacks([...feedbacks, {
            id: new Date().getTime().toString()
            , comment: newComment
        }])
        setNewComment("");

    }



    return (
        <View style={styles.container}>
            <View style={styles.submitFeedback}>
                <TextBox style={styles.textBox} placeholder="Your feedback on the project ..." value={newComment} onChangeText={setNewComment} />
                <Pressable onPress={submitCommit}>
                    <Feather name="send" size={24} color={color} />
                </Pressable>
            </View>
            <BottomSheetFlatList
                data={comments}
                renderItem={({ item }) => <Comment comment={item} />}
            />
        </View>
    )
}

export default Comments

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    submitFeedback: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
    textBox: {
        marginVertical: 10,
        marginRight: 15
    }
})
