import AsyncStorage from '@react-native-async-storage/async-storage';

export const users = [
  {
    id: 1,
    avatarUrl: "https://c.stocksy.com/a/XJC000/z9/47339.jpg",
    name: "James Martin",
    title: "Senior Graphic Designer",
    email: "james012@gmail.com",
    password:"leliem2003",
    phone: "1234567891",
    address: "K52/65 Lê Văn Liêm, Hải Châu, Đà Nẵng",
    twitter: "@james012",
    facebook: "www.facebook.com/james012",
  },
  {
    id: 2,
    avatarUrl: "https://c.stocksy.com/a/bXp200/z9/674783.jpg",
    name: "Sarah Johnson",
    title: "UI/UX Designer",
    email: "sarah.johnson@example.com",
    password:"123456",
    phone: "9876543210",
    address: "K52/65 Nguyễn Đình Bảng, Hải Châu, Đà Nẵng",
    twitter: "@sarahj",
    facebook: "www.facebook.com/sarahjohnson",
  },
];

export const getUserById = (id) => users.find((user) => user.id === id);

export const register = async (name, email, password, phone, address) => {
  try {
    const existingUsers = await AsyncStorage.getItem('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];


    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return { success: false, message: "Email already exists!" };
    }


    const newUser = { name, email, password, phone, address };

    users.push(newUser);

    await AsyncStorage.setItem('users', JSON.stringify(users));

    return { success: true, message: "Registration Successful!" };
  } catch (error) {
    console.error("Error saving data", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};

export const login = async (email, password) => {
  try {
    const existingUsers = await AsyncStorage.getItem('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Invalid email or password." };
    }
  } catch (error) {
    console.error("Error reading data", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
};