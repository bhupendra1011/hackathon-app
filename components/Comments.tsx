import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import Comment from './Comment'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Feather } from '@expo/vector-icons';


import { Text, useThemeColor, View } from './Themed';
import TextBox from './TextBox';

const Comments = ({ comments }) => {
    const [newComment, setNewComment] = React.useState("");

    const color = useThemeColor({}, 'text');

    const submitCommit = () => {
        console.warn("Submit Feedback");
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
