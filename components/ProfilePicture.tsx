import React from 'react'
import { StyleSheet, Image } from 'react-native'

interface ProfilePictureProps {
    imageUrl: string,
    size: number
}

const ProfilePicture = ({ imageUrl, size = 20 }: ProfilePictureProps) => {
    return (
        <Image source={{ uri: imageUrl || '' }} style={{ width: size, height: size, borderRadius: size }} />
    )
}

export default ProfilePicture

const styles = StyleSheet.create({})
