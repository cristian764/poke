import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/inicio'; 
import EvolucionesScreen from './src/screens/evoluciones';
import './src/styles/estilos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Pokémon Selector' }} 
        />
        <Stack.Screen 
          name="Evoluciones" 
          component={EvolucionesScreen} 
          options={{ title: 'Evoluciones' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
