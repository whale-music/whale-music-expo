import ActionSheet, {
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { Theme } from "@/constants/Theme";
import {
  NativeButton,
  NativeInput,
  NativeText,
  NativeView,
} from "@/components/Themed";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { AudioLines, FileVideo, Image } from "lucide-react-native";
import React, { useState } from "react";

type FilterField = "audio" | "image" | "video";
type FilterType = Array<FilterField>;
export default function ResourceFilterOptionActionsSheet(
  props: SheetProps<"resource-filter">,
) {
  const theme = Theme();
  const [search, setSearch] = useState(props.payload?.value?.search);
  const [filterField, setFilterField] = useState<FilterType>(
    props?.payload?.value?.filterType ?? [],
  );

  const backgroundColor = theme.secondaryBackground;
  const foreground = theme.foreground;

  function FilterGroupType({
    filterField,
    setFilterField,
  }: {
    filterField: FilterType;
    setFilterField: React.Dispatch<React.SetStateAction<FilterType>>;
  }) {
    const theme = Theme();
    const selectIconColor = theme.primary;

    const styles = StyleSheet.create({
      container: {
        flexDirection: "column",
        width: "100%",
        backgroundColor: "transparent",
      },
      groupType: {
        flexDirection: "row",
        alignItems: "center",
        height: 46,
        borderRadius: 10,
        backgroundColor: theme.background,
        gap: 4,
        paddingHorizontal: 10,
      },
      groupSelectTitle: {
        fontSize: 18,
      },
      groupContainer: {
        borderRadius: 10,
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        gap: 10,
        backgroundColor: theme.secondaryBackground,
      },
    });

    const change = (type: FilterField) => {
      // 如果包含则删除
      // 检查数据是否存在于数组中
      const index = filterField.indexOf(type);
      if (index !== -1) {
        // 如果数据存在，则从数组中删除它
        filterField.splice(index, 1);
      } else {
        // 如果数据不存在，则将它添加到数组中
        filterField.push(type);
      }
      setFilterField([...filterField]);
    };
    const iconColor = (val?: FilterField) => {
      if (val) {
        return filterField.includes(val) ? selectIconColor : theme.icon;
      } else {
        return theme.icon;
      }
    };
    const filter = [
      {
        type: "audio" as FilterField,
        content: (type?: FilterField) => (
          <>
            <AudioLines size={28} color={iconColor(type)} />
            <NativeText
              style={[styles.groupSelectTitle, { color: iconColor(type) }]}
            >
              {type}
            </NativeText>
          </>
        ),
        onChange: change,
      },
      {
        type: "image" as FilterField,
        content: (type?: FilterField) => (
          <>
            <Image size={28} color={iconColor(type)} />
            <NativeText
              style={[styles.groupSelectTitle, { color: iconColor(type) }]}
            >
              {type}
            </NativeText>
          </>
        ),
        onChange: change,
      },
      {
        type: "video" as FilterField,
        content: (type?: FilterField) => (
          <>
            <FileVideo size={28} color={iconColor(type)} />
            <NativeText
              style={[styles.groupSelectTitle, { color: iconColor(type) }]}
            >
              {type}
            </NativeText>
          </>
        ),
        onChange: change,
      },
    ];

    function Item({
      type,
      content,
      onChange,
    }: {
      type: FilterField;
      content: (type?: FilterField) => React.ReactNode;
      onChange: (type: FilterField) => void;
    }) {
      return (
        <>
          <TouchableOpacity
            style={styles.groupType}
            onPress={() => onChange(type)}
          >
            {content(type)}
          </TouchableOpacity>
        </>
      );
    }

    const orderData = [
      {
        label: "A-Z",
        type: "name",
        sort: true,
      },
      {
        label: "最新",
        type: "date",
        sort: false,
      },
      {
        label: "最大",
        type: "size",
        sort: false,
      },
      {
        label: "Z-A",
        type: "name",
        sort: false,
      },
      {
        label: "最旧",
        type: "date",
        sort: true,
      },
      {
        label: "最小",
        type: "size",
        sort: true,
      },
    ];

    function OrderContainer({
      label,
      type,
      sort,
    }: {
      label: string;
      type: string;
      sort: boolean;
    }) {
      let order: { [key: string]: any } = {};
      order[type] = sort;
      return (
        <TouchableOpacity
          onPress={async () => {
            await SheetManager.hide(props.sheetId, {
              payload: {
                filterType: filterField,
                search: search,
                refresh: false,
                sort: order,
              },
            });
          }}
          style={{
            width: "20%",
            height: 40,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
            borderRadius: 10,
            margin: 1,
          }}
        >
          <NativeView style={{ backgroundColor: "transparent" }}>
            <NativeText>{label}</NativeText>
          </NativeView>
        </TouchableOpacity>
      );
    }

    return (
      <NativeView
        style={[
          {
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.secondaryBackground,
          },
        ]}
      >
        <NativeView style={styles.groupContainer}>
          <NativeView style={styles.container}>
            <NativeText
              numberOfLines={1}
              style={{ fontSize: 16, opacity: 0.7, marginLeft: 10 }}
            >
              过滤
            </NativeText>
            <NativeView
              style={{
                backgroundColor: "transparent",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {filter.map((v) => (
                <Item
                  type={v.type}
                  content={v.content}
                  onChange={v.onChange}
                  key={v.type}
                />
              ))}
            </NativeView>
          </NativeView>
          <NativeView style={styles.container}>
            <NativeText
              numberOfLines={1}
              style={{ fontSize: 16, opacity: 0.7, marginLeft: 10 }}
            >
              排序
            </NativeText>
            <NativeView
              style={{
                backgroundColor: "transparent",
                flexDirection: "row",
                flexGrow: 3,
              }}
            >
              <FlatList
                data={orderData}
                numColumns={3}
                contentContainerStyle={{ flexDirection: "column" }}
                renderItem={({ item }) => (
                  <OrderContainer
                    label={item.label}
                    type={item.type}
                    sort={item.sort}
                  />
                )}
                keyExtractor={(item) => item.label}
              />
            </NativeView>
          </NativeView>
        </NativeView>
      </NativeView>
    );
  }

  return (
    <>
      <ActionSheet
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: backgroundColor,
        }}
        indicatorStyle={{
          width: 100,
          opacity: 0.6,
          backgroundColor: foreground,
        }}
        // @ts-ignore
        payload={{
          search: search,
          filterType: filterField,
        }}
        gestureEnabled={true}
        openAnimationConfig={{
          delay: 0,
        }}
      >
        <NativeView
          style={{
            height: "60%",
            backgroundColor: backgroundColor,
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <NativeView style={{ width: "80%", backgroundColor: "transparent" }}>
            <NativeView
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                backgroundColor: "transparent",
              }}
            >
              <NativeInput
                style={{ width: "100%" }}
                value={search}
                placeholder="search file name"
                onChangeText={setSearch}
              />
              <FilterGroupType
                filterField={filterField}
                setFilterField={setFilterField}
              />
            </NativeView>

            <NativeButton
              onPress={async () => {
                await SheetManager.hide(props.sheetId, {
                  payload: {
                    filterType: filterField,
                    search: search,
                    refresh: true,
                  },
                });
              }}
              style={{ backgroundColor: "red", borderWidth: 0 }}
            >
              <NativeText>强制刷新</NativeText>
            </NativeButton>
          </NativeView>
        </NativeView>
      </ActionSheet>
    </>
  );
}
