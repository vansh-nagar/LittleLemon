import React from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ItemView = () => {
  return (
    <ScrollView>
      <View className="flex-1 p-4">
        <Image
          className="h-96 w-full rounded-md shadow-md"
          source={{
            uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
          }}
        />
        <View className="mt-5 flex flex-row items-center justify-between">
          <Text className="text-3xl font-bold">Shahi Paneer</Text>
          <Text className="text-2xl font-semibold text-green-700">$12.99</Text>
        </View>
        <Text numberOfLines={3} className="mt-2 text-gray-700">
          Shahi Paneer is a rich and creamy North Indian curry made with paneer (Indian cottage
          cheese) cooked in a spiced tomato and cashew-based gravy. Perfect for a royal dining
          experience!
        </Text>
        <Text className="mt-2 text-lg">Quantity: 2</Text>
        <View className="mt-4 flex h-12 flex-row items-center justify-between rounded-md bg-yellow-100 px-6">
          <Text className="font-medium">Calories</Text>
          <Text>350 kcal</Text>
        </View>
        <View className="mt-4 flex h-12 flex-row items-center justify-between rounded-md bg-yellow-100 px-6">
          <Text className="font-medium">Preparation Time</Text>
          <Text>30 mins</Text>
        </View>
        <View className="mt-4 flex h-12 flex-row items-center justify-between rounded-md bg-yellow-100 px-6">
          <Text className="font-medium">Spice Level</Text>
          <Text>Mild</Text>
        </View>

        <Pressable className="mt-10 flex h-12 items-center justify-center rounded-md bg-black">
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
