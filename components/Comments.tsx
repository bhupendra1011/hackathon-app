import React from 'react'
import { StyleSheet } from 'react-native'
import Comment from './Comment'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'


import { Text, View } from './Themed';

const Comments = ({ comments }) => {
    return (
        <View style={styles.container}>
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
        paddingHorizontal: 15
    }
})
