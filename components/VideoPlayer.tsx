import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from './Themed'

import { Video } from "expo-av"

interface VideoPlayerProps {
    videoURI: string,
    thumbnailURI?: string
}

const VideoPlayer = (props: VideoPlayerProps) => {
    const { videoURI, thumbnailURI } = props;
    return (
        <View>
            <Video
                source={{ uri: videoURI }}
                style={{ width: '100%', aspectRatio: 16 / 9 }}
                posterSource={{ uri: thumbnailURI }}
                posterStyle={{
                    resizeMode: 'cover'
                }}
                usePoster={false}
                useNativeControls
                resizeMode="contain"
            />
        </View>
    )
}

export default VideoPlayer

const styles = StyleSheet.create({})
