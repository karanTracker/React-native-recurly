import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const subscriptionsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>subscriptionsDetails : {id}</Text>
      <Link href ="/"> Go back</Link>
    </View>
  );
};

export default subscriptionsDetails;
