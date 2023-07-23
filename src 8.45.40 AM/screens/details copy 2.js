import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectColor } from "../utils/helperFunc";
import { addData } from "../store/dataslicer";

const CreatePost = (props) => {
  const [titleUpdate, setTitle] = useState("");
  const [bodyUpdate, setBody] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.post);
  const dataUid = useSelector((state) => state?.post[state?.post?.length - 1]);
  const nextId =
    data.reduce((maxId, item) => (item.id > maxId ? item.id : maxId), 0) + 1;

  const CreatePost = () => {
    const data = {
      id: nextId,
      userId: dataUid.userId + 1,
      title: titleUpdate,
      body: bodyUpdate,
    };

    if (titleUpdate !== null) {
      dispatch(addData(data));
      props.navigation.goBack();
    }
  };
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <Button title="Save" onPress={() => CreatePost()} />,
    });
  }, []);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View
        style={[styles.FlatListContainer, { backgroundColor: selectColor() }]}
      >
        <TextInput
          autoFocus={true}
          placeholder="Title"
          style={[styles.container, { flex: 0.5, fontSize: 35, padding: 10 }]}
          textAlign="left"
          multiline
          returnKeyType="next"
          blurOnSubmit={false}
          numberOfLines={8}
          value={titleUpdate}
          onChangeText={(text) => setTitle(text)}
          onEndEditing={() => {}}
        />
        <TextInput
          style={[
            styles.container,
            {
              fontSize: 25,
              marginVertical: 5,
              padding: 10,
              borderTopWidth: 0.5,
            },
          ]}
          placeholder="Body"
          textAlign="left"
          multiline
          value={bodyUpdate}
          numberOfLines={8}
          onChangeText={(text) => setBody(text)}
          onEndEditing={(item) => console.log(item, "ended editing 2")}
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

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    fontSize: 30,
  },
  FlatListContainer: {
    flex: 1,
    margin: 3,
    flexDirection: "column",
    // backgroundColor: 'skyblue',
    padding: 10,
    // borderRadius: 10,
    // borderWidth: 0.5,
  },
});
