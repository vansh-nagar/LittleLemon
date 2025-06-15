import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, ScrollView, TextInput } from 'react-native-gesture-handler';
import { SectionList } from 'react-native';
import Icon from '@react-native-vector-icons/evil-icons';
import { useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const renderItem = ({ item }: any) => {
  return (
    <Pressable
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
          source={{ uri: item.menuItem.imageUrl }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 12,
            marginRight: 14,
            backgroundColor: '#eee',
          }}
        />
        <View style={{ flex: 1, justifyContent: 'space-between', height: 90 }}>
          <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>
            {item.menuItem.name}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{ color: '#555', marginTop: 4, fontSize: 14 }}>
            {item.menuItem.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#388e3c' }}>
              ${item.menuItem.price.toFixed(2)}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Icon name="star" size={22} color="#fbbf24" />
              <Text style={{ fontWeight: '600', color: '#444', marginLeft: 2 }}>
                {item.menuItem.rating}
              </Text>
              <Text style={{ color: '#888', fontSize: 12 }}>/5</Text>
            </View>
          </View>
        </View>
        <View className="ml-3 flex items-center justify-center gap-1  ">
          <View className="rounded-lg bg-neutral-200 active:bg-neutral-500">
            <Pressable
              style={{
                borderRadius: 8,
                paddingHorizontal: 11,
                paddingVertical: 2,
              }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222' }}>-</Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', minWidth: 24, textAlign: 'center' }}>
            {item.quantity}
          </Text>
          <View className="rounded-lg bg-neutral-200 active:bg-neutral-500">
            <Pressable
              style={{
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#222' }}>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const Checkout = () => {
  const [Data, setData] = useState(null);

  useEffect(() => {
    async function main() {
      const token = await AsyncStorage.getItem('jwtToken');

      axios
        .post('http://192.168.29.34:3000/getCart', { token })
        .then((response) => {
          console.log('Menu data:', response.data.message.cart);
          setData(response.data.message.cart);
        })
        .catch((err) => {
          console.error('Error fetching menu data:', err);
        });
    }

    main();
  }, []);

  return (
    <View className=" bg-white">
      <FlatList
        className="h-2/3"
        contentContainerStyle={{ padding: 16, paddingBottom: 56 }}
        data={Data}
        renderItem={renderItem}
      />
      <View>
        <View
          className="bg-main2"
          style={{
            padding: 24,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: '#222', fontSize: 16 }}>delivery time</Text>
            <Text style={{ color: '#222', fontSize: 16 }}>10 min</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: '#222', fontSize: 16 }}>dishes</Text>
            <Text style={{ color: '#222', fontSize: 16 }}>15.00</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: '#222', fontSize: 16 }}>extra's</Text>
            <Text style={{ color: '#222', fontSize: 16 }}>5.00</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ color: '#222', fontSize: 16 }}>taxes</Text>
            <Text style={{ color: '#222', fontSize: 16 }}>0.99</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 18,
            }}>
            <Text style={{ color: '#222', fontSize: 18, fontWeight: 'bold' }}>total</Text>
            <Text style={{ color: '#222', fontSize: 18, fontWeight: 'bold' }}>20.99</Text>
          </View>
          <Pressable
            style={{
              backgroundColor: '#2d2323',
              borderRadius: 14,
              paddingVertical: 12,
              alignItems: 'center',
              marginTop: 8,
              opacity: 0.92,
            }}
            android_ripple={{ color: '#000', borderless: false }}
            onPress={() => {
              /* handle checkout */
            }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>Check Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Checkout;
