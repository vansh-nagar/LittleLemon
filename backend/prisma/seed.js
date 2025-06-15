import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const Data = [
  {
    title: "Starters",
    data: [
      {
        id: 1,
        name: "Greek Salad",
        price: 12.99,
        description:
          "Crisp cucumbers, vine‑ripened tomatoes, Kalamata olives and creamy feta tossed in a zesty lemon‑oregano dressing.",
        image:
          "https://images.unsplash.com/photo-1745126010010-da1c6f5300a9?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.5,
        calories: 250,
        prepTime: 10,
        spiceLevel: "MILD",
        extra: "Vegetarian",
      },
      {
        id: 2,
        name: "Bruschetta",
        price: 7.99,
        description:
          "Grilled sourdough rubbed with garlic, topped with marinated tomatoes, basil and a drizzle of extra‑virgin olive oil.",
        image:
          "https://plus.unsplash.com/premium_photo-1677686707068-787e793bc582?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.2,
        calories: 180,
        prepTime: 8,
        spiceLevel: "MILD",
        extra: "Vegan",
      },
      {
        id: 3,
        name: "Caprese Salad",
        price: 9.99,
        description:
          "Layers of fresh mozzarella, heirloom tomatoes and basil finished with balsamic glaze.",
        image:
          "https://images.unsplash.com/photo-1745360687654-877271150ce6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.7,
        calories: 220,
        prepTime: 7,
        spiceLevel: "MILD",
        extra: "Gluten Free",
      },
      {
        id: 4,
        name: "Stuffed Mushrooms",
        price: 8.49,
        description:
          "Roasted mushroom caps filled with herbed cream cheese and parmesan breadcrumbs.",
        image:
          "https://images.unsplash.com/photo-1640456604089-cc18763be2b5?q=80&w=1071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.3,
        calories: 200,
        prepTime: 12,
        spiceLevel: "MEDIUM",
        extra: "Contains Dairy",
      },
    ],
  },
  {
    title: "Mains",
    data: [
      {
        id: 5,
        name: "Margherita Pizza",
        price: 14.99,
        description:
          "Wood‑fired pizza with San Marzano tomato sauce, fior di latte mozzarella and garden basil.",
        image:
          "https://images.unsplash.com/photo-1658478006307-525ab032ab26?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.8,
        calories: 700,
        prepTime: 20,
        spiceLevel: "MILD",
        extra: "Vegetarian",
      },
      {
        id: 6,
        name: "Grilled Salmon",
        price: 19.99,
        description:
          "Atlantic salmon fillet, char‑grilled and served with lemon–dill butter and seasonal vegetables.",
        image:
          "https://images.unsplash.com/photo-1633524792906-73b111908d9c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.9,
        calories: 600,
        prepTime: 18,
        spiceLevel: "MEDIUM",
        extra: "Gluten Free",
      },
      {
        id: 7,
        name: "Chicken Alfredo",
        price: 17.99,
        description:
          "Tagliatelle tossed in a silky parmesan cream sauce, topped with grilled chicken breast.",
        image:
          "https://images.unsplash.com/photo-1748012199672-2a94ab9cbb19?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.6,
        calories: 850,
        prepTime: 22,
        spiceLevel: "MILD",
        extra: "Contains Dairy",
      },
      {
        id: 8,
        name: "Vegan Buddha Bowl",
        price: 13.49,
        description:
          "Quinoa, roasted chickpeas, avocado, seasonal veggies and tahini‑lemon dressing.",
        image:
          "https://plus.unsplash.com/premium_photo-1664476002571-ead0cbfc6d74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.4,
        calories: 500,
        prepTime: 15,
        spiceLevel: "SPICY",
        extra: "Vegan",
      },
    ],
  },
  {
    title: "Desserts",
    data: [
      {
        id: 9,
        name: "Tiramisu",
        price: 6.99,
        description:
          "Layers of espresso‑soaked ladyfingers, mascarpone cream and dark‑cocoa dust.",
        image:
          "https://images.unsplash.com/photo-1698688334089-c68105801d02?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.9,
        calories: 420,
        prepTime: 8,
        spiceLevel: "MILD",
        extra: "Contains Dairy",
      },
      {
        id: 10,
        name: "Chocolate Lava Cake",
        price: 7.99,
        description:
          "Warm chocolate cake with a flowing molten center, served with vanilla gelato.",
        image:
          "https://images.unsplash.com/photo-1532301634640-d623ab11bb22?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.8,
        calories: 480,
        prepTime: 10,
        spiceLevel: "MILD",
        extra: "Vegetarian",
      },
      {
        id: 11,
        name: "Strawberry Cheesecake",
        price: 6.49,
        description:
          "Classic baked cheesecake crowned with fresh strawberries and compote.",
        image:
          "https://plus.unsplash.com/premium_photo-1672192166439-f20d9ec1dbbc?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.7,
        calories: 430,
        prepTime: 9,
        spiceLevel: "MILD",
        extra: "Contains Dairy",
      },
      {
        id: 12,
        name: "Italian Gelato",
        price: 5.99,
        description:
          "Two scoops of artisan gelato – ask for today’s rotating flavours.",
        image:
          "https://images.unsplash.com/photo-1740969136572-bdd24d36114d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.5,
        calories: 300,
        prepTime: 5,
        spiceLevel: "MILD",
        extra: "Gluten Free",
      },
    ],
  },
  {
    title: "Drinks",
    data: [
      {
        id: 13,
        name: "Espresso",
        price: 3.49,
        description:
          "Single‑origin espresso shot pulled short for a rich crema.",
        image:
          "https://images.unsplash.com/photo-1646257861487-60fa89bef25f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.6,
        calories: 5,
        prepTime: 2,
        spiceLevel: "MILD",
        extra: "Caffeinated",
      },
      {
        id: 14,
        name: "Red Wine (Glass)",
        price: 8.99,
        description:
          "Sommelier‑selected Italian red – ask staff for today’s pour.",
        image:
          "https://images.unsplash.com/photo-1630369160812-26c7604cbd8c?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.7,
        calories: 120,
        prepTime: 1,
        spiceLevel: "MILD",
        extra: "Alcoholic",
      },
      {
        id: 15,
        name: "Homemade Lemonade",
        price: 2.99,
        description: "Fresh‑squeezed lemons, hint of mint, lightly sweetened.",
        image:
          "https://plus.unsplash.com/premium_photo-1721780793069-5576631f1b46?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.3,
        calories: 90,
        prepTime: 3,
        spiceLevel: "MILD",
        extra: "Non-Alcoholic",
      },
      {
        id: 16,
        name: "Iced Tea",
        price: 2.49,
        description: "Cold‑brewed black tea with citrus and simple syrup.",
        image:
          "https://plus.unsplash.com/premium_photo-1694825174350-cb9f27949883?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        rating: 4.2,
        calories: 60,
        prepTime: 4,
        spiceLevel: "MILD",
        extra: "Caffeinated",
      },
    ],
  },
];

async function main() {
  for (const category of Data) {
    for (const item of category.data) {
      await prisma.menuItem.create({
        data: {
          name: item.name,
          price: item.price,
          description: item.description,
          imageUrl: item.image,
          title: category.title,
          rating: item.rating,
          calories: item.calories,
          prepTime: item.prepTime,
          spiceLevel: item.spiceLevel,
        },
      });
    }

    console.log(`Created menu with title: ${category.title}`);
  }
}

main();
