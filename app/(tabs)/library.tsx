import { SafeAreaView, StyleSheet, TouchableOpacity, VirtualizedList } from 'react-native';
import { NativeButton, NativeText, NativeView } from '@/components/Themed';
import { useEffect, useRef, useState } from 'react'
import { getResource, Resource } from '@/api/resource'
import { AudioLines } from 'lucide-react-native'
import { useColorScheme } from '@/components/useColorScheme';
import { Theme } from '@/constants/Theme'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'

export default function App() {
    const theme = Theme()

    const selectItem = useRef<Resource>();
    // const [ selectItem, setSelectItem ] = useState<Resource>()
    const [ resources, setResources ] = useState<Resource[]>([])

    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        (async function () {
            const r = await getResource(false)
            setResources(r)
        })()
    }, []);

    const getItem = (_data: Resource, index: number): Resource => {
        return resources[index];
    };

    if (resources.length === 0) {
        return (
            <NativeView style={ {flex: 1, justifyContent: "center", alignItems: 'center'} }>
                <NativeText style={ {fontSize: 30} }>无数据</NativeText>
            </NativeView>
        )
    }

    function Item({value}: { value: Resource }) {
        const light = (useColorScheme() ?? 'light') === 'light';
        const iconColor = light ? '#000' : '#fff'
        const theme = Theme()

        const resource = value
        const onPress = () => {
            selectItem.current = resource
            actionSheetRef.current?.show();
        }
        return (
            <>
                <TouchableOpacity
                    style={ {backgroundColor: theme.background} }
                    onPress={ onPress }>
                    <NativeView style={ [ {opacity: resource.status ? 1 : 0.5}, styles.item ] }>
                        <AudioLines size={ 28 } color={ iconColor }/>
                        <NativeView style={ styles.itemTitle }>
                            <NativeText numberOfLines={ 1 }>
                                { resource.name }
                            </NativeText>
                            <NativeText numberOfLines={ 1 } style={ {opacity: 0.4} }>
                                { resource.path }
                            </NativeText>
                        </NativeView>
                    </NativeView>
                </TouchableOpacity>
            </>
        )
    }

    function ActionSheetContent() {
        const current = selectItem.current
        const bgStyle = {backgroundColor: theme.secondaryBackground};
        if (!current) {
            return (
                <NativeView style={ [ {flex: 1, justifyContent: 'center', alignItems: 'center',}, bgStyle ] }>
                    <NativeText style={ {fontSize: 20} }>请重新选择数据</NativeText>
                </NativeView>
            )
        } else {
            return (
                <NativeView style={ [ {paddingTop: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}, bgStyle ] }>
                    <NativeText style={ {fontSize: 15} }>{ current?.name }</NativeText>
                    <NativeButton style={ {backgroundColor: 'white', borderWidth: 1} } textStyle={ {color: 'black'} }>播放</NativeButton>
                </NativeView>
            )
        }
    }

    const NativeActionSheet = () => (
        <ActionSheet ref={ actionSheetRef }
                     containerStyle={ {
                         borderTopLeftRadius: 25,
                         borderTopRightRadius: 25,
                         backgroundColor: theme.secondaryBackground
                     } }
                     indicatorStyle={ {
                         width: 100,
                         opacity: 0.6,
                         backgroundColor: theme.text
                     } }
                     gestureEnabled={ true }
        >
            <NativeView style={ {height: 200, backgroundColor: theme.secondaryBackground} }>
                <ActionSheetContent/>
            </NativeView>
        </ActionSheet>
    )
    return (
        <>
            <NativeActionSheet/>
            <SafeAreaView>
                <VirtualizedList
                    initialNumToRender={ 20 }
                    renderItem={ ({item}) => <Item value={ item }/> }
                    keyExtractor={ item => item.path }
                    getItemCount={ () => resources.length }
                    getItem={ getItem }
                    ItemSeparatorComponent={ ItemSeparator }
                />
            </SafeAreaView>
        </>
    );
}


const ItemSeparator = () => (
    <NativeView style={ {flexDirection: "row-reverse"} }>
        <NativeView style={ styles.separator }/>
    </NativeView>
);


const styles = StyleSheet.create({
    item: {
        marginLeft: '6%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        margin: 10,
    },
    separator: {
        width: '85%',
        height: 1,
        backgroundColor: 'gray',
        opacity: 0.3
    },
    itemTitle: {
        width: '80%'
    }

});
