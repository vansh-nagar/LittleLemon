import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileSection = ({ navigation }: any) => {
  const [Data, setData] = useState<any>(null);
  const [orderStatusNoti, setOrderStatusNoti] = useState(false);
  const [specialOfferNoti, setSpecialOfferNoti] = useState(false);
  const [passwordChangeNoti, setPasswordChangeNoti] = useState(false);
  const [newsletterNoti, setNewsletterNoti] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    const getInfo = async () => {
      const jwt = await AsyncStorage.getItem('jwtToken');
      axios
        .post('http://192.168.29.34:3000/getUserDetails', { token: jwt })
        .then((res) => {
          console.log(res.data.data);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    getInfo();
  }, []);

  useEffect(() => {
    if (Data) {
      setOrderStatusNoti(Data.orderStatusNoti);
      setSpecialOfferNoti(Data.specialOfferNoti);
      setPasswordChangeNoti(Data.passwordChangesNoti);
      setNewsletterNoti(Data.NewsLetterNoti);
      setFirstName(Data.firstName);
      setLastName(Data.lastName);
      setEmail(Data.email);
      setPhoneNumber(Data.phoneNumber);
    }
  }, [Data]);

  const Logout = async () => {
    const token = await AsyncStorage.getItem('jwtToken');
    AsyncStorage.removeItem('jwtToken');
    axios.post('http://192.168.29.34:3000/Logout', { token });
    navigation.push('onBoradingPage');
  };

  const handleSeaveChanges = async () => {
    setLoader(true);
    const jwt = await AsyncStorage.getItem('jwtToken');
    axios
      .post('http://192.168.29.34:3000/saveProfileInfo', {
        token: jwt,
        firstName,
        lastName,
        email,
        phoneNumber,
        orderStatusNoti,
        specialOfferNoti,
        passwordChangeNoti,
        newsletterNoti,
      })
      .then((res) => {
        console.log(res.data.message);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoader(false);
      });
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {Loader && (
        <View className="absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/80">
          <Text className="text-xl text-white">Loading...</Text>
        </View>
      )}
      {Data && (
        <>
          <Text className="text-2xl">Personal Information</Text>
          <Text className="mb-2 mt-4 text-neutral-500">Avatar</Text>
          <View className="m  flex flex-row items-center ">
            <Image className="mr-5 h-28 w-28 rounded-full" source={{ uri: `${Data.pfp}` }}></Image>
            <Pressable>
              <Text className="rounded-md  bg-main1 px-5 py-3 text-white">Change</Text>
            </Pressable>
            <Pressable>
              <Text className="ml-4 rounded-sm border border-main1 px-5 py-3 text-main1">
                Remove
              </Text>
            </Pressable>
          </View>
          <Text className="mt-6">First name</Text>
          <TextInput
            className="  rounded-lg border border-main1 px-3 "
            value={firstName}
            onChangeText={(e) => {
              setFirstName(e);
            }}
            placeholder="Value"></TextInput>
          <Text className="mt-6">Last name</Text>
          <TextInput
            className="  rounded-lg border border-main1 px-3 "
            value={lastName}
            onChangeText={(e) => {
              setLastName(e);
            }}
            placeholder="Value"></TextInput>
          <Text className="mt-6">Email</Text>
          <TextInput
            className="  rounded-lg border border-main1 px-3 "
            value={email}
            onChangeText={(e) => {
              setEmail(e);
            }}
            placeholder="Value"></TextInput>
          <Text className="mt-6">Phone number</Text>
          <TextInput
            className="  rounded-lg border border-main1 px-3 "
            value={phoneNumber}
            onChangeText={(e) => {
              setPhoneNumber(e);
            }}
            placeholder="Value"></TextInput>
          <Text className="text-1xl  mt-6  ">Email notifications</Text>
          <View className="mt-2 flex flex-row items-center">
            <Checkbox
              status={orderStatusNoti ? 'checked' : 'unchecked'}
              onPress={() => {
                setOrderStatusNoti(!orderStatusNoti);
              }}
              color="#495e57"
            />
            <Text>Order statuses</Text>
          </View>
          <View className="mt-2 flex flex-row items-center">
            <Checkbox
              status={specialOfferNoti ? 'checked' : 'unchecked'}
              onPress={() => {
                setSpecialOfferNoti(!specialOfferNoti);
              }}
              color="#495e57"
            />
            <Text>Special offer</Text>
          </View>
          <View className="mt-2 flex flex-row items-center">
            <Checkbox
              status={passwordChangeNoti ? 'checked' : 'unchecked'}
              onPress={() => {
                setPasswordChangeNoti(!passwordChangeNoti);
              }}
              color="#495e57"
            />
            <Text>Password changes</Text>
          </View>
          <View className="mt-2 flex flex-row items-center">
            <Checkbox
              status={newsletterNoti ? 'checked' : 'unchecked'}
              onPress={() => {
                setNewsletterNoti(!newsletterNoti);
              }}
              color="#495e57"
            />
            <Text>Newsletter</Text>
          </View>
          <Pressable
            onPress={Logout}
            className={`  mt-11 flex h-14 items-center justify-center rounded-md bg-main2 px-12  `}>
            <Text className="text-center">Log out</Text>
          </Pressable>
          <View className="mx-14 mb-16 mt-11 flex flex-row items-center justify-center gap-6">
            <Pressable className={` rounded-sm border border-main1 px-5 py-3 text-main1 `}>
              <Text className="text-center">Discard changes</Text>
            </Pressable>
            <Pressable onPress={handleSeaveChanges} className="   rounded-sm  bg-main1 px-5  py-3">
              <Text className="text-center text-white">Save Changes</Text>
            </Pressable>
          </View>{' '}
        </>
      )}
    </ScrollView>
  );
};

export default ProfileSection;
