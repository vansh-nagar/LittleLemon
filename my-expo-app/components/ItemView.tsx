import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ItemView = ({ navigation }: any) => {
  const { params } = useRoute();
  const { item } = params as { item: any };
  const [Quantity, setQuantity] = useState(1);

  const handleAddToCart = async (item: any) => {
    const user = await AsyncStorage.getItem('jwtToken');

    console.log(item);
    axios
      .post('http://192.168.29.34:3000/AddToCart', { item, data: user })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          navigation.replace('Main');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <ScrollView>
      <View className="flex-1 p-4">
        <Image
          className="h-96 w-full rounded-md shadow-md"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />
        <View className="mt-5 flex flex-row items-center justify-between">
          <Text className="text-3xl font-bold">{item.name}</Text>
          <Text className="text-2xl font-semibold text-green-700">${item.price}</Text>
        </View>
        <Text numberOfLines={3} className="mt-2 text-gray-700">
          {item.description}
        </Text>
        <View className="mt-4 flex flex-row items-center justify-start space-x-4">
          <Text className="mr-4 text-lg font-medium">Quantity:</Text>
          <View className="flex flex-row items-center space-x-2">
            <Pressable
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-8 w-8 items-center justify-center rounded-full bg-neutral-200 active:bg-neutral-500">
              <Text className="text-xl font-bold text-black">-</Text>
            </Pressable>
            <Text className="w-8 text-center text-lg font-semibold">{Quantity}</Text>
            <Pressable
              onPress={() => setQuantity((q) => q + 1)}
              className="h-8 w-8 items-center justify-center rounded-full bg-neutral-200 active:bg-neutral-500">
              <Text className="text-xl font-bold text-black">+</Text>
            </Pressable>
          </View>
        </View>
        <View className="mt-4 flex h-12 flex-row items-center justify-between rounded-md bg-main2 px-6">
          <Text className="font-medium">Calories</Text>
          <Text>{item.calories} kcal</Text>
        </View>
        <View className="mt-4 flex h-12 flex-row items-center justify-between rounded-md bg-main2 px-6">
          <Text className="font-medium">Preparation Time</Text>
          <Text>{item.prepTime} mins</Text>
        </View>
        <View className="mt-4 flex h-12 flex-row items-center justify-between rounded-md bg-main2 px-6">
          <Text className="font-medium">Spice Level</Text>
          <Text>{item.spiceLevel}</Text>
        </View>

        <Pressable
          onPress={() => {
            handleAddToCart(item);
          }}
          className="mt-10 flex h-12 items-center justify-center rounded-md bg-black">
          <Text className="text-lg font-semibold text-white">Add to cart</Text>
        </Pressable>
      </View>

      <Text className="mb-9 mt-6 text-center italic text-gray-600">
        “An Experience Beyond Taste”
      </Text>
    </ScrollView>
  );
};

export default ItemView;
