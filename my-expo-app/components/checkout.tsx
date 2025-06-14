import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Pressable, ScrollView, TextInput } from 'react-native-gesture-handler';
import { SectionList } from 'react-native';
import Icon from '@react-native-vector-icons/evil-icons';

const Data = [
  {
    title: 'Starters',
    data: [
      {
        id: 1,
        name: 'Greek Salad',
        price: 12.99,
        description:
          'Crisp cucumbers, vine‑ripened tomatoes, Kalamata olives and creamy feta tossed in a zesty lemon‑oregano dressing.',
        image:
          'https://images.unsplash.com/photo-1745126010010-da1c6f5300a9?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Bruschetta',
        price: 7.99,
        description:
          'Grilled sourdough rubbed with garlic, topped with marinated tomatoes, basil and a drizzle of extra‑virgin olive oil.',
        image:
          'https://plus.unsplash.com/premium_photo-1677686707068-787e793bc582?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 3,
        name: 'Caprese Salad',
        price: 9.99,
        description:
          'Layers of fresh mozzarella, heirloom tomatoes and basil finished with balsamic glaze.',
        image:
          'https://images.unsplash.com/photo-1745360687654-877271150ce6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 4,
        name: 'Stuffed Mushrooms',
        price: 8.49,
        description:
          'Roasted mushroom caps filled with herbed cream cheese and parmesan breadcrumbs.',
        image:
          'https://images.unsplash.com/photo-1640456604089-cc18763be2b5?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    title: 'Mains',
    data: [
      {
        id: 5,
        name: 'Margherita Pizza',
        price: 14.99,
        description:
          'Wood‑fired pizza with San Marzano tomato sauce, fior di latte mozzarella and garden basil.',
        image:
          'https://images.unsplash.com/photo-1658478006307-525ab032ab26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 6,
        name: 'Grilled Salmon',
        price: 19.99,
        description:
          'Atlantic salmon fillet, char‑grilled and served with lemon–dill butter and seasonal vegetables.',
        image:
          'https://images.unsplash.com/photo-1633524792906-73b111908d9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 7,
        name: 'Chicken Alfredo',
        price: 17.99,
        description:
          'Tagliatelle tossed in a silky parmesan cream sauce, topped with grilled chicken breast.',
        image:
          'https://images.unsplash.com/photo-1748012199672-2a94ab9cbb19?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 8,
        name: 'Vegan Buddha Bowl',
        price: 13.49,
        description:
          'Quinoa, roasted chickpeas, avocado, seasonal veggies and tahini‑lemon dressing.',
        image:
          'https://plus.unsplash.com/premium_photo-1664476002571-ead0cbfc6d74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    title: 'Desserts',
    data: [
      {
        id: 9,
        name: 'Tiramisu',
        price: 6.99,
        description: 'Layers of espresso‑soaked ladyfingers, mascarpone cream and dark‑cocoa dust.',
        image:
          'https://images.unsplash.com/photo-1698688334089-c68105801d02?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 10,
        name: 'Chocolate Lava Cake',
        price: 7.99,
        description:
          'Warm chocolate cake with a flowing molten center, served with vanilla gelato.',
        image:
          'https://images.unsplash.com/photo-1532301634640-d623ab11bb22?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 11,
        name: 'Strawberry Cheesecake',
        price: 6.49,
        description: 'Classic baked cheesecake crowned with fresh strawberries and compote.',
        image:
          'https://plus.unsplash.com/premium_photo-1672192166439-f20d9ec1dbbc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 12,
        name: 'Italian Gelato',
        price: 5.99,
        description: 'Two scoops of artisan gelato – ask for today’s rotating flavours.',
        image:
          'https://images.unsplash.com/photo-1740969136572-bdd24d36114d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    title: 'Drinks',
    data: [
      {
        id: 13,
        name: 'Espresso',
        price: 3.49,
        description: 'Single‑origin espresso shot pulled short for a rich crema.',
        image:
          'https://images.unsplash.com/photo-1646257861487-60fa89bef25f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 14,
        name: 'Red Wine (Glass)',
        price: 8.99,
        description: 'Sommelier‑selected Italian red – ask staff for today’s pour.',
        image:
          'https://images.unsplash.com/photo-1630369160812-26c7604cbd8c?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 15,
        name: 'Homemade Lemonade',
        price: 2.99,
        description: 'Fresh‑squeezed lemons, hint of mint, lightly sweetened.',
        image:
          'https://plus.unsplash.com/premium_photo-1721780793069-5576631f1b46?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 16,
        name: 'Iced Tea',
        price: 2.49,
        description: 'Cold‑brewed black tea with citrus and simple syrup.',
        image:
          'https://plus.unsplash.com/premium_photo-1694825174350-cb9f27949883?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
];

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
          source={{ uri: item.image }}
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
              <Text style={{ fontWeight: '600', color: '#444', marginLeft: 2 }}>4.5</Text>
              <Text style={{ color: '#888', fontSize: 12 }}>/5</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const Checkout = () => {
  return (
    <View className=" bg-white">
      <SectionList
        className="h-2/3"
        contentContainerStyle={{ padding: 16, paddingBottom: 56 }}
        sections={Data}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <View
            style={{
              marginVertical: 8,
              marginTop: 24,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              paddingBottom: 4,
            }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#222' }}>{section.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
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
              paddingVertical: 18,
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
