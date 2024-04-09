import React from 'react';
import { StyleSheet } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { NativeText, NativeView } from './Themed';

import Colors from '@/constants/Colors';

export default function EditScreenInfo({path}: { path: string }) {
    return (
        <NativeView>
            <NativeView style={ styles.getStartedContainer }>
                <NativeText
                    style={ styles.getStartedText }
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    Open up the code for this screen:
                </NativeText>

                <NativeView
                    style={ [ styles.codeHighlightContainer, styles.homeScreenFilename ] }
                    darkColor="rgba(255,255,255,0.05)"
                    lightColor="rgba(0,0,0,0.05)">
                    <MonoText>{ path }</MonoText>
                </NativeView>

                <NativeText
                    style={ styles.getStartedText }
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    Change any of the text, save the file, and your app will automatically update.
                </NativeText>
            </NativeView>

            <NativeView style={ styles.helpContainer }>
                <ExternalLink
                    style={ styles.helpLink }
                    href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
                    <NativeText style={ styles.helpLinkText } lightColor={ Colors.light.secondaryIcon }>
                        Tap here if your app doesn't automatically update after making changes
                    </NativeText>
                </ExternalLink>
            </NativeView>
        </NativeView>
    );
}

const styles = StyleSheet.create({
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },
});
