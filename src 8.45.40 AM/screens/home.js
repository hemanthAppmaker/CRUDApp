import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData, updateData } from "../store/dataslicer";
import { selectColor } from "../utils/helperFunc";

const Home = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add"
          onPress={() => props.navigation.navigate("create")}
        />
      ),
    });
  }, []);
  const createFn = (id) => {
    props.navigation.navigate("create", { data });

    dispatch(addData(id));
  };
  const updateFn = (data) => {
    props.navigation.navigate("detail", { data });
    // dispatch(updateData());
  };
  const deleteFn = (id) => {
    console.log("here deleted", id);
    dispatch(deleteData(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        inverted
        extraData={data}
        renderItem={({ item, index }) => {
          return (
            <View
              key={item.id}
              style={[
                styles.FlatListContainer,
                { backgroundColor: selectColor(item.userId) },
              ]}
            >
              {/* <Text>{item.userId}</Text> */}
              <Text style={{ fontWeight: "800" }}>{item.title}</Text>
              <Text>{item.body}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  onPress={() => deleteFn(index)}
                  style={{ fontWeight: "800" }}
                >
                  delete
                </Text>
                <Text
                  onPress={() => updateFn(item)}
                  style={{ fontWeight: "800" }}
                >
                  update
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  FlatListContainer: {
    margin: 3,
    backgroundColor: "skyblue",
    padding: 15,
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
