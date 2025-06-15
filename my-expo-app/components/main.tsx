import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, ScrollView, TextInput } from 'react-native-gesture-handler';
import { SectionList } from 'react-native';
import Icon from '@react-native-vector-icons/evil-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = ({ navigation }: any) => {
  const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'All'];
  const [Data, setData] = useState(null);
  const [CartCount, setCartCount] = useState(0);
  const [filter, setfilter] = useState('');
  const [Input, setInput] = useState('');
  const TimeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    axios
      .post('http://192.168.29.34:3000/getMenu', { filter: filter, input: Input })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.error('Error fetching menu data:', err);
      });
  }, [filter, Input]);

  useEffect(() => {
    async function main() {
      const token = await AsyncStorage.getItem('jwtToken');

      axios
        .post('http://192.168.29.34:3000/CartCount', { token })
        .then((response) => {
          setCartCount(response.data.message);
        })
        .catch((err) => {
          console.error('Error fetching menu data:', err);
        });
    }

    main();
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <Pressable
        onPress={() => {
          navigation.push('ItemView', { item });
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#f3f4f6' : '#fff',
            borderRadius: 16,
            marginVertical: 8,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          },
        ]}>
        <View style={{ flexDirection: 'row', padding: 12, alignItems: 'center' }}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 90,
              height: 90,
              borderRadius: 12,
              marginRight: 14,
              backgroundColor: '#eee',
            }}
          />
          <View style={{ flex: 1, justifyContent: 'space-between', height: 90 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>{item.name}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ color: '#555', marginTop: 4, fontSize: 14 }}>
              {item.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                justifyContent: 'space-between',
              }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#388e3c' }}>
                ${item.price.toFixed(2)}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Icon name="star" size={22} color="#fbbf24" />
                <Text style={{ fontWeight: '600', color: '#444', marginLeft: 2 }}>
                  {item.rating}
                </Text>
                <Text style={{ color: '#888', fontSize: 12 }}>/5</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-main1">
      <View className=" h-[40%] bg-main1 p-4">
        <Text className="text-5xl font-extrabold tracking-tight text-main2">Little Lemon</Text>
        <Text className="mt-1 text-lg font-semibold text-white">Chicago</Text>

        <View className="  mt-4 flex flex-row justify-between">
          <Text className="  w-60 text-white">
            Discover a world where culinary artistry meets timeless elegance. Every dish is a
            handcrafted symphony of flavor, curated for the discerning palate. From the finest
            ingredients to the most refined service, we redefine fine dining.
          </Text>
          <Image
            className="h-32 w-32 rounded-2xl border-2 border-main2"
            source={require('../assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Hero.png')}></Image>
        </View>
        <View className="mt-6 flex flex-row items-center rounded-full bg-white px-4">
          <TextInput
            onChangeText={(e) => {
              if (TimeoutId.current) {
                clearTimeout(TimeoutId.current);
              }
              TimeoutId.current = setTimeout(() => {
                console.log(e);
                setInput(e);
              }, 500);
            }}
            className="flex-1 py-2"
            placeholder="Search"
            style={{ backgroundColor: 'transparent' }}
          />
          <Icon name="search" size={28} color="#888" />
        </View>
      </View>
      <View className="flex flex-col rounded-t-2xl bg-main2 p-4">
        <View className="flex flex-row justify-between ">
          <Text className="font-extrabold ">ORDER FOR DELIVERY</Text>

          <Pressable
            className="relatives"
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Icon name="cart" size={30} />
            <Text className=" absolute -right-1 -top-2.5 rounded-full bg-red-600 px-1.5  text-white">
              {CartCount}
            </Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mt-3 flex  flex-row gap-3">
          {categories.map((category, index) => (
            <Pressable
              key={index}
              className="mx-7"
              onPress={() => {
                setInput('');
                if (filter === category) {
                  return 'Hello';
                } else {
                  console.log('Selected category:', category);
                  setfilter(category);
                }
              }}>
              <View
                key={index}
                className="mx-2 w-24 items-center rounded-md bg-white p-2 shadow-lg  active:bg-gray-400">
                <Text className="text-lg font-bold">{category}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {Data && <FlatList className="bg-main2 p-4 pb-14" data={Data} renderItem={renderItem} />}
    </View>
  );
};

export default Main;
