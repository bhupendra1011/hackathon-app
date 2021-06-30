import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, useThemeColor } from './Themed'

interface ButtonProps {
    title: string,
    style?: {},
    onPress: () => void
}


const Button = ({ title, style, onPress }: ButtonProps) => {

    const color = useThemeColor({}, 'tint');
    return (
        <TouchableOpacity style={{ ...style, borderColor: color, ...styles.button }} onPress={onPress}>
            <Text style={styles.title}> {title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderRadius: 6,

    },
    title: {
        fontSize: 16
    }
})
