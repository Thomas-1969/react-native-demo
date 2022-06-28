import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";
import { NearEarthObject } from "./astroScreen/type/AstroListRes";

export default function AstroDetailScreen() {



    const route = useRoute<any>()
    return <SafeAreaView>
        
        <Text testID="lblId" style={styles.labeAndValue}> ID : {route.params.arguments?.id}</Text>
        <Text testID="lblId" style={styles.labeAndValue}> Name : {route.params.arguments?.name}</Text>
        <Text testID="lblId" style={styles.labeAndValue}> Absolute Magnitude : {route.params.arguments?.absolute_magnitude_h}</Text>
        <Text testID="lblId" style={styles.labeAndValue}> Minumum Astimate Diameter : {route.params.arguments?.estimated_diameter?.kilometers?.estimated_diameter_min?.toString()}</Text>
        <Text testID="lblId" style={styles.labeAndValue}> Maximum Astimate Diameter : {route.params.arguments?.estimated_diameter?.kilometers?.estimated_diameter_min?.toString()}</Text>
    
    </SafeAreaView>
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1
    },
    labeAndValue: {
        fontSize: 15,
        fontColor: 'black',
        fontWeight: "bold",
        marginTop: 10,
        padding: 10
    }
});