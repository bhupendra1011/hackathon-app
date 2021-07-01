import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { useThemeColor } from './Themed';

interface ProfilePictureProps {
    imageUrl: string,
    size: number,
    margin?: number
}

const ProfilePicture = ({ imageUrl, size = 20, margin }: ProfilePictureProps) => {
    const color = useThemeColor({}, 'text');

    if (!imageUrl) {
        return (
            <FontAwesome5 name="user-circle" size={35} color={color} style={{ margin }} />
        )
    }

    return (
        <Image source={{ uri: imageUrl || '' }} style={{ width: size, height: size, borderRadius: size, margin: margin }} />
    )
}

export default ProfilePicture

const styles = StyleSheet.create({})
