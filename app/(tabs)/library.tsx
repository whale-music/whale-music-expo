import { SafeAreaView, StyleSheet, TouchableOpacity, VirtualizedList } from 'react-native';
import { NativeText, NativeView } from '@/components/Themed';
import { useEffect, useState } from 'react'
import { getResource, Resource } from '@/api/resource'
import { AudioLines } from 'lucide-react-native'

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

    return (
        <SafeAreaView>
            <VirtualizedList
                initialNumToRender={ 4 }
                renderItem={ ({item}) => <Item resources={ item }/> }
                keyExtractor={ item => item.name }
                getItemCount={ () => resources.length }
                getItem={ getItem }
                ItemSeparatorComponent={ ItemSeparator }
            />
        </SafeAreaView>
    );
}

function Item({resources}: { resources: Resource }) {
    return (
        <>
            <TouchableOpacity>
                <NativeView style={ [ {opacity: resources.status ? 1 : 0.5}, styles.item ] }>
                    <AudioLines size={ 28 } color={ "#fff" }/>
                    <NativeView style={ styles.itemTitle }>
                        <NativeText numberOfLines={ 1 }>
                            { resources.name }
                        </NativeText>
                        <NativeText numberOfLines={ 1 } style={ {opacity: 0.4} }>
                            { resources.path }
                        </NativeText>
                    </NativeView>
                </NativeView>
            </TouchableOpacity>
        </>
    )
}

const ItemSeparator = () => (
    // <></>
    // <NativeView style={ {height: 10} }/>
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
