import {View, Text, SafeAreaView, Button, Alert} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/screens/home';
import Details_copy from './src/screens/details copy';
import Details_2 from './src/screens/details copy 2';
import Details_3 from './src/screens/details copy 3';
import Details_4 from './src/screens/details copy 4';
import EntryScreen from './src/screens/EntryScreen';
import {Provider} from 'react-redux';
import store from './src/store/reduxStore';
import Details from './src/screens/details';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="EntryScreen"
          screenOptions={{headerShown: true}}>
          <Stack.Screen name="EntryScreen" component={EntryScreen} />
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerRight: () => (
                <Button
                  onPress={() => Alert.alert('This is a button!')}
                  title="+"
                  color="dodgerblue"
                />
              ),
            }}
          />
          <Stack.Screen
            name="detail"
            component={Details}
            options={{
              headerRight: () => (
                <Button
                  onPress={() => Alert.alert('This is a button!')}
                  title="save"
                  color="dodgerblue"
                />
              ),
            }}
          />
          <Stack.Screen name="create" component={Details_2} />
          {/* <Stack.Screen name="detail3" component={Details_3} />
          <Stack.Screen name="detail4" component={Details_4} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
