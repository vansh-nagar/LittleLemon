import './global.css';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from 'components/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import ProfileSection from 'components/profileSection';
import { Image, Pressable, Text } from 'react-native';

export default function App() {
  const stack = createStackNavigator();

  return (
    <>
      <NavigationContainer>
        <stack.Navigator>
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
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
