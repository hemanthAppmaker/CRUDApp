import {
  Button,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateData} from '../store/dataslicer';
import {selectColor} from '../utils/helperFunc';

const Details = ({route, navigation}) => {
  const {id, userId, title, body} = route?.params.data;
  const {state} = navigation;
  const [titleUpdate, setTitle] = useState('');
  const [bodyUpdate, setBody] = useState('');
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedData = {
      id: id, // Specify the id of the data to update (in this example, updating data with id: 2)
      userId: userId,
      title: titleUpdate || title,
      body: bodyUpdate || body,
    };
    if (id) {
      console.log('handleSave', id);

      dispatch(updateData(updatedData));
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="update" onPress={() => handleSave()} />,
    });
  });

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View
        style={[
          styles.FlatListContainer,
          {backgroundColor: selectColor(userId)},
        ]}>
        <TextInput
          autoFocus={true}
          placeholder="Title"
          style={[styles.container, {flex: 0.5, fontSize: 35, padding: 10}]}
          defaultValue={title}
          textAlign="left"
          multiline
          returnKeyType="next"
          blurOnSubmit={false}
          numberOfLines={8}
          value={titleUpdate || title}
          onChangeText={text => setTitle(text)}
          onEndEditing={() => {}}
        />
        <TextInput
          style={[
            styles.container,
            {fontSize: 25, marginVertical: 5, padding: 10, borderTopWidth: 0.5},
          ]}
          placeholder="Body"
          defaultValue={body}
          textAlign="left"
          multiline
          value={bodyUpdate || body}
          numberOfLines={8}
          onChangeText={text => setBody(text)}
          onEndEditing={item => console.log(item, 'ended editing 2')}
        />
      </View>
      {/* <TextInput
        style={styles.container}
        defaultValue={title}
        textAlign="left"
      /> */}
    </KeyboardAvoidingView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    fontSize: 30,
  },
  FlatListContainer: {
    flex: 1,
    margin: 3,
    flexDirection: 'column',
    // backgroundColor: 'skyblue',
    padding: 10,
    // borderRadius: 10,
    // borderWidth: 0.5,
  },
});
