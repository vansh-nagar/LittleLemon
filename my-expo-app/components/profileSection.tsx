import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, TextInput, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';

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
    axios.post('http://192.168.29.34:3000/Logout', { token });
    await AsyncStorage.removeItem('jwtToken');
    await AsyncStorage.setItem('Onboarding', 'false');
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
        console.log(res.status);
        if (res.status === 200) {
          navigation.dispatch(StackActions.replace('Main'));
        }
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
        <View className="absolute inset-0 z-50 flex items-center justify-center bg-black/80">
          <Text className="text-xl text-white">Loading...</Text>
        </View>
      )}
      {Data && (
        <>
          <Text className="mb-6 text-3xl font-bold text-main1">Profile</Text>
          <Text className="mb-2 text-lg font-semibold text-neutral-700">Personal Information</Text>
          <Text className="mb-2 text-neutral-500">Avatar</Text>
          <View className="mb-6 flex flex-row items-center">
            <Image
              className="mr-5 h-28 w-28 rounded-full border-4 border-main1"
              source={{ uri: `${Data.pfp}` }}
            />
            <View className="flex flex-col gap-2">
              <Pressable className="mb-2">
                <Text className="rounded-md bg-main1 px-5 py-2 font-semibold text-white shadow">
                  Change
                </Text>
              </Pressable>
              <Pressable>
                <Text className="rounded-md border border-main1 px-5 py-2 font-semibold text-main1">
                  Remove
                </Text>
              </Pressable>
            </View>
          </View>
          <Text className="mt-2 font-medium text-neutral-700">First name</Text>
          <TextInput
            className="mt-1 rounded-lg border border-main1 bg-neutral-50 px-3 py-2"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            placeholderTextColor="#a3a3a3"
          />
          <Text className="mt-4 font-medium text-neutral-700">Last name</Text>
          <TextInput
            className="mt-1 rounded-lg border border-main1 bg-neutral-50 px-3 py-2"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            placeholderTextColor="#a3a3a3"
          />
          <Text className="mt-4 font-medium text-neutral-700">Email</Text>
          <TextInput
            className="mt-1 rounded-lg border border-main1 bg-neutral-50 px-3 py-2"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#a3a3a3"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text className="mt-4 font-medium text-neutral-700">Phone number</Text>
          <TextInput
            className="mt-1 rounded-lg border border-main1 bg-neutral-50 px-3 py-2"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone number"
            placeholderTextColor="#a3a3a3"
            keyboardType="phone-pad"
          />
          <Text className="mb-2 mt-8 text-lg font-semibold text-neutral-700">
            Email notifications
          </Text>
          <View className="mb-1 flex flex-row items-center">
            <Checkbox
              status={orderStatusNoti ? 'checked' : 'unchecked'}
              onPress={() => setOrderStatusNoti(!orderStatusNoti)}
              color="#495e57"
            />
            <Text className="ml-2 text-neutral-700">Order statuses</Text>
          </View>
          <View className="mb-1 flex flex-row items-center">
            <Checkbox
              status={specialOfferNoti ? 'checked' : 'unchecked'}
              onPress={() => setSpecialOfferNoti(!specialOfferNoti)}
              color="#495e57"
            />
            <Text className="ml-2 text-neutral-700">Special offers</Text>
          </View>
          <View className="mb-1 flex flex-row items-center">
            <Checkbox
              status={passwordChangeNoti ? 'checked' : 'unchecked'}
              onPress={() => setPasswordChangeNoti(!passwordChangeNoti)}
              color="#495e57"
            />
            <Text className="ml-2 text-neutral-700">Password changes</Text>
          </View>
          <View className="mb-6 flex flex-row items-center">
            <Checkbox
              status={newsletterNoti ? 'checked' : 'unchecked'}
              onPress={() => setNewsletterNoti(!newsletterNoti)}
              color="#495e57"
            />
            <Text className="ml-2 text-neutral-700">Newsletter</Text>
          </View>
          <Pressable
            onPress={Logout}
            className="mt-8 flex h-14 items-center justify-center rounded-md bg-main2 shadow">
            <Text className="text-lg font-semibold text-white">Log out</Text>
          </Pressable>
          <View className="mx-8 mb-16 mt-8 flex flex-row items-center justify-center gap-6">
            <Pressable className="rounded-md border border-main1 px-6 py-3">
              <Text className="font-semibold text-main1">Discard changes</Text>
            </Pressable>
            <Pressable
              onPress={handleSeaveChanges}
              className="rounded-md bg-main1 px-6 py-3 shadow">
              <Text className="font-semibold text-white">Save Changes</Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default ProfileSection;
