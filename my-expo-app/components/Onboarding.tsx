import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const Onboarding = ({ navigation }: any) => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Loader, setLoader] = useState(false);
  const [message, setmessage] = useState('');

  const handleSubmit = () => {
    if (!Email || !Name) {
      return;
    }

    setLoader(true);

    axios
      .post('http://192.168.29.34:3000/login', {
        username: Name,
        email: Email,
      })
      .then((res) => {
        setmessage(res.data.message);

        setLoader(false);
        if (res.status === 200) {
          const settoken = async () => {
            await AsyncStorage.setItem('jwtToken', res.data.jwt);
            await AsyncStorage.setItem('Onboarding', 'true');
          };

          settoken();
          navigation.dispatch(StackActions.replace('profileSection'));
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <View className="relative flex flex-1 ">
      {Loader && (
        <View className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/80">
          <Text className="text-xl text-white">Loading...</Text>
        </View>
      )}
      <View className="h-2/5 bg-main1 p-4">
        <Text
          className="font-playfair text-6xl text-main2
        ">
          Little lemon
        </Text>
        <Text className="-mt-2 text-white ">Chicago</Text>
        <View className="flex flex-row items-center justify-center gap-9">
          <Image
            source={require('../assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Bruschetta.png')}
            className="h-44 w-44 rounded-md shadow-lg"
          />
          <Image
            source={require('../assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Pasta.png')}
            className="h-56 w-64  rounded-md"
          />
          <Image
            source={require('../assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/des.png')}
            className="h-44 w-44 rounded-md"
          />
        </View>
      </View>
      <View className="relative flex-1  gap-7 p-4">
        <Text className="text-2xl">Let us get to know you</Text>

        <Text>Name</Text>
        <TextInput
          onChangeText={(e) => {
            setName(e);
          }}
          className="-mt-5  rounded-lg border border-main1 px-3 "
          placeholder="Please enter your first and last name"></TextInput>
        <Text>Email</Text>

        <TextInput
          onChangeText={(e) => {
            setEmail(e);
          }}
          className="-mt-5 rounded-lg  border  border-main1 px-3"
          placeholder="Value"></TextInput>
        <Text className="mt-9 text-center font-playfair">“An Experience Beyond Taste”</Text>
        <Text className=" text-center font-playfair text-red-500">{message}</Text>

        <Pressable
          onPress={handleSubmit}
          className={` flex h-14 items-center justify-center rounded-md px-12 shadow-lg   ${Name && Email ? 'bg-main2 ' : 'bg-yellow-600'}`}>
          <Text className="text-center">Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Onboarding;
