import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from './Themed'

import { Video } from "expo-av"

interface VideoPlayerProps {
    width?: string,
    videoURI: string,
    thumbnailURI?: string,
    style?: object
}

const VideoPlayer = (props: VideoPlayerProps) => {
    const { videoURI, thumbnailURI, width = '100%', style = {} } = props;
    return (
        <View>
            <Video
                source={{ uri: videoURI }}
                style={{ ...style, width: width, aspectRatio: 16 / 9 }}
                posterSource={{ uri: thumbnailURI }}
                posterStyle={{
                    resizeMode: "contain"
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
