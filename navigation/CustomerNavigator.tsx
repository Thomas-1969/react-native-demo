import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator()

const CustomeNavigator = ({component, params = {}}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name= "CustomerNavigator"
                component={component}
                initial={params}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default CustomeNavigator;