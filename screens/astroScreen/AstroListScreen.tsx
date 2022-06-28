import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { AstroListRes, NearEarthObject } from "./type/AstroListRes";

export default function AstroListScreen({ navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState<AstroListRes>();
  const [dataList, setDataList] = useState<NearEarthObject[]>([]);
  const [offSet, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [error, setError] = useState<string>('');

  const API_KEY = "led4H3DUp9K8l5ItppiQJM7rqeLSe9XlNRYk7w21";
  const BROWSER_LIST = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}&size=20&page=`;


  const getData = (): void => {
    console.log(
        ":::::::::::::::::::::::::::::::: offSet ::",
        isLoading, isListEnd
      );
    if (!isLoading && !isListEnd) {
      setIsLoading(true);

      fetch(`${BROWSER_LIST}${offSet}`)
        .then((response) => response.json())
        .then((responseJson) => {
          setDataSource(responseJson as AstroListRes);
          if (responseJson as AstroListRes) {
            let tempArray = [...dataList];
            const data = responseJson as AstroListRes;
            if (data.links.next && data.links.next != null)
            {
                setOffset(offSet + 1)
                if (data?.near_earth_objects?.length > 0) {
                    tempArray = [...dataList, ...data?.near_earth_objects];
                    let filterList = tempArray?.sort(function (a, b) {
                      const megnA = a.absolute_magnitude_h;
                      const megnB = b.absolute_magnitude_h;
                      return megnB - megnA;
                    });
      
                    setDataList(filterList);
                  }
            }
            else {
                setIsListEnd(true);
            }
          }
          setIsLoading(false)
          console.log(
            "::::::::::::::::::::::::::::::::::",
            dataList
          );
        })
        .catch((error) => {
            setIsLoading(false)
            setError(error)
            console.log(":::::::::::::::::::::::::::::::::: error :::", error);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderFooter = () => (
    isLoading ? (<View style={styles.footer}>
      <ActivityIndicator testID="loader" style={styles.loadingBottom} />
    </View>) : null
  )

  const renderListItemView = (item : NearEarthObject) => (
    <TouchableOpacity
        style={item.is_potentially_hazardous_asteroid ? styles.listItemWithHeighlight : styles.listItem}
        onPress={() => {navigation.navigate("AstroDetail", {item})}}
    >
        <Text testID="lblId" style={styles.labeAndValue}> ID: {item.id}</Text>
        <Text testID="lblName" style={styles.labeAndValue}> Name: {item.name}</Text>
        <Text testID="lblMagnitude" style={styles.labeAndValue}> Absolute Magnitude: {item.absolute_magnitude_h}</Text>
    </TouchableOpacity>
  )

  const renderEmptyView = (text: string) => (
      <View style={styles.container}>
          <Text style={styles.labeAndValue}>{text}</Text>
      </View>
  )


  return <SafeAreaView style={styles.container}>

            <FlatList
                data={dataList}
                renderItem={({item}) => renderListItemView(item)}
                keyExtractor = {(item: any) => `${item.key}_list`}
                onEndReachedThreshold={0.1}
                onEndReached={getData}
                ListFooterComponent={renderFooter}
            />

            {!isLoading ? renderEmptyView(error) : null}
       </SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  listItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginVertical: 5,
    padding: 5
  },
  listItemWithHeighlight: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    marginVertical: 5,
    padding: 5
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadingBottom: {
    color: "black",
    margin: 15
  },
  row: {
      flexDirection: "row",
      flex: 1
  },
  labeAndValue: {
      fontSize: 12,
      fontColor: 'black',
      fontWeight: "bold",
  }
});
