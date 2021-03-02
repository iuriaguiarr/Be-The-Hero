import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Detalhes from './pages/Detalhes'
import Gastos from './pages/Gastos'

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            
            <AppStack.Navigator screenOptions={{headerShown: false}}>

                <AppStack.Screen name="Gastos" component={Gastos}/>
                <AppStack.Screen name="Detalhes" component={Detalhes}/>

            </AppStack.Navigator>
        
        </NavigationContainer>
    );
}