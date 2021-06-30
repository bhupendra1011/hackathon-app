import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Text, useThemeColor, View } from './Themed'



interface TextBoxProps {
    placeholder: string,
    onChangeText: Dispatch<SetStateAction<string>>,
    value: string
    multiline?: boolean,
    style: object
}


const TextBox = (props: TextBoxProps) => {
    const { placeholder, value, onChangeText, multiline = false } = props;
    const borderColor = useThemeColor({}, 'text');
    const placeholderText = useThemeColor({}, 'placeholerText');

    return (
        <View style={styles.container}>
            <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText}
                placeholderTextColor={placeholderText}
                underlineColorAndroid="transparent"
                multiline={multiline}

                style={{
                    ...props.style,
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: borderColor,
                    color: borderColor,
                    fontSize: 18,
                    padding: 10,
                    borderRadius: 6

                }} />
        </View>
    )
}

export default TextBox

const styles = StyleSheet.create({
    container: {
        width: "80%",
    }
})
