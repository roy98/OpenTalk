import React, { useEffect } from "react";
import { IconButton } from "react-native-paper";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Categorie from "./Categorie";
import { wait } from "../Utils/core";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreators from "../Store/action_creators/index";
import { getCategories, setUserCategory } from "../API/Auth.service";

function Choose_categories({ onNext, hideLoader, displayLoader }) {
  const categoryState = useSelector((state) => state.category);
  const currentUser = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const { getAllCategories, toggleCategory, error } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleSubmit = () => {
    displayLoader();
    setUserCategory(currentUser.id, categoryState.userCategories)
      .then((res) => {
        hideLoader();
        onNext();
      })
      .catch((err) => {
        hideLoader();
        console.log(err);
        onNext();
      });
  };

  useEffect(() => {
    getCategories()
      .then((res) => {
        getAllCategories(res.items);
      })
      .catch((err) => {
        error(err.message);
      });
  }, []);

  return (
    <View style={styles.form}>
      <View style={styles.title_container}>
        <Text
          style={{
            textAlign: "center",
            padding: 5,
            fontFamily: "Avenir-Heavy",
            fontSize: 22,
            color: "rgba(0,0,0,0.6)",
          }}
        >
          Choose your categories
        </Text>
      </View>
      <View style={styles.categories_container}>
        <FlatList
          data={categoryState.categories}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={9}
          numColumns={3}
          ListEmptyComponent={({}) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator color="purple" size="small" />
            </View>
          )}
          renderItem={({ item }) => (
            <Categorie
              toggle={toggleCategory}
              userCategories={categoryState.userCategories}
              item={item}
            />
          )}
        />
      </View>
      <View
        style={[
          styles.btn_container,
          {
            marginBottom: 0,
            justifyContent: "center",
            paddingBottom: 10,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => console.log("fetch more")}
          style={[
            styles.btn,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 5,
              backgroundColor: "#fff",
              borderColor: "purple",
              borderWidth: 1,
            },
          ]}
        >
          <Text
            style={[
              styles.btn_text,
              {
                textAlign: "center",
                color: "purple",
              },
            ]}
          >
            See more
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            styles.btn,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 5,
            },
          ]}
        >
          <Text style={[{ textAlign: "center" }, styles.btn_text]}>
            Next step
          </Text>
          <IconButton
            style={{ margin: 0 }}
            color="rgba(255,255,255,0.8)"
            size={15}
            icon="chevron-right"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-evenly",
    paddingRight: 0,
    paddingLeft: 0,
  },
  btn: {
    width: 325,
    padding: 12,
    borderRadius: 25,
    backgroundColor: "purple",
  },
  title_container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  categories_container: {
    flex: 2,
    alignItems: "center",
  },
  btn_container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
    alignItems: "center",
  },
  btn_text: {
    fontFamily: "Avenir-Heavy",
    color: "#FFF",
  },
});

export default Choose_categories;
