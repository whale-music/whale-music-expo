import { SafeAreaView, StyleSheet, TouchableOpacity, VirtualizedList } from 'react-native';
import { NativeText, NativeView } from '@/components/Themed';
import { useEffect, useState } from 'react'
import { getResource, Resource } from '@/api/resource'
import { AudioLines } from 'lucide-react-native'
import { useColorScheme } from '@/components/useColorScheme';
import { Theme } from '@/constants/Theme'
import { SheetManager } from 'react-native-actions-sheet'
import { audioPreview } from '@/components/ActionsSheet/sheets'

export default function App() {
    const [ resources, setResources ] = useState<Resource[]>([])

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
        const onPress = async () => {
            await SheetManager.show(audioPreview, {
                payload: {value: resource},
            });
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

    return (
        <>
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
