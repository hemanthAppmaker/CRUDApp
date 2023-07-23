import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
const EntryScreen = props => {
  const [isOnline, setisOnline] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        setisOnline(state.isConnected);
      });
      return () => unsubscribe();
    }, []),
  );

  useEffect(() => {
    props.navigation.navigate('home');
  }, [isOnline]);

  //   console.log(data, 'dataSlice response');
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: '700'}}>The</Text>
      <Text style={{fontSize: 50, fontWeight: '700'}}>Post</Text>
      <Text style={{fontSize: 20, fontWeight: '700'}}>
        App is :
        <Text
          onPress={() => props.navigation.navigate('home')}
          style={{color: isOnline ? 'green' : 'red'}}>
          {isOnline ? 'online' : 'offline'}
        </Text>
      </Text>
    </View>
  );
};

export default EntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
