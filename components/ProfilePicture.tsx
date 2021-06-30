import React from 'react'
import { StyleSheet, Image } from 'react-native'

interface ProfilePictureProps {
    imageUrl: string,
    size: number,
    margin?:number
}

const ProfilePicture = ({ imageUrl, size = 20,margin}: ProfilePictureProps) => {
    return (
        <Image source={{ uri: imageUrl || '' }} style={{ width: size, height: size, borderRadius: size,margin:margin }} />
    )
}

export default ProfilePicture

const styles = StyleSheet.create({})
