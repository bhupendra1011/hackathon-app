import React from 'react'
import { StyleSheet } from 'react-native'
import ProfilePicture from './ProfilePicture'
import { Text, View } from './Themed'


const Comment = ({ comment }) => {
    return (
        <View style={styles.commentsSection} >
            <ProfilePicture imageUrl={comment.User.image} size={35} margin={5} />
            <View>
                <Text lightColor="#736766" darkColor="#ccbfbe" style={{ fontSize: 14 }}> {comment.User.name} </Text>
                <Text style={{ fontSize: 15 }}> {comment.comment} </Text>
            </View>
        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    commentsSection: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        flex: 1,
        paddingTop: 5

    }
})

