import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, useThemeColor, View } from './Themed';
import { MonoText } from './StyledText';
import { Ionicons } from '@expo/vector-icons';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';



export default function CustomHeader() {
    const theme = useColorScheme();
    const color = useThemeColor({}, 'text');

    return (
        <>
            <SafeAreaView>
                <View style={styles.container}>
                    <MonoText style={styles.title}> HACKATHON Q3 2021 </MonoText>
                    <Ionicons name="search-outline" size={24} color={color} />
                </View>
            </SafeAreaView>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: Platform.OS == "ios" ? 20 : 0

    },
    title: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    separator: {

        height: 3,
        width: '100%',
    },
});
