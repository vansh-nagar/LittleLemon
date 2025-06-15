import './global.css';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from 'components/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import ProfileSection from 'components/profileSection';
import { Image, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Main from 'components/main';
import ItemView from 'components/ItemView';
import Checkout from 'components/checkout';

export default function App({ navigation }: any) {
  const [Onboarded, setOnboarded] = useState(false);
  const stack = createStackNavigator();

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboarded = await AsyncStorage.getItem('Onboarding');
      if (onboarded === 'true') {
        setOnboarded(true);
      }
    };

    checkOnboarding();
  }, []);

  return (
    <>
      <NavigationContainer>
        <stack.Navigator>
          {!Onboarded && (
            <stack.Screen
              name="onBoradingPage"
              component={Onboarding}
              options={{
                headerTitle: () => (
                  <Image
                    source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Logo.png')}></Image>
                ),
                headerTitleAlign: 'center',
              }}
            />
          )}

          <stack.Screen
            name="Main"
            component={Main}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Image
                  source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Logo.png')}></Image>
              ),
              headerTitleAlign: 'center',
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('profileSection');
                  }}>
                  <Image
                    className="mr-5 h-14 w-14"
                    source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Profile.png')}></Image>
                </Pressable>
              ),
            })}
          />
          <stack.Screen
            name="profileSection"
            component={ProfileSection}
            options={{
              headerTitle: () => (
                <Image
                  source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Logo.png')}></Image>
              ),
              headerTitleAlign: 'center',
              headerRight: () => (
                <Image
                  className="mr-5 h-14 w-14"
                  source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Profile.png')}></Image>
              ),
            }}
          />

          <stack.Screen
            name="ItemView"
            component={ItemView}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Image
                  source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Logo.png')}></Image>
              ),
              headerTitleAlign: 'center',
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('profileSection');
                  }}>
                  <Image
                    className="mr-5 h-14 w-14"
                    source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Profile.png')}></Image>
                </Pressable>
              ),
            })}
          />
          <stack.Screen
            name="Checkout"
            component={Checkout}
            options={({ navigation }) => ({
              headerTitle: () => (
                <Image
                  source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Logo.png')}></Image>
              ),
              headerTitleAlign: 'center',
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    navigation.navigate('profileSection');
                  }}>
                  <Image
                    className="mr-5 h-14 w-14"
                    source={require('./assets/xklIQmqvTkCnBxdLLspn8w_c1f5d03a48b74e3db162fafa4bee95e1_Little-Lemon-Images/Profile.png')}></Image>
                </Pressable>
              ),
            })}
          />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
