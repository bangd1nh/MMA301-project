export const users = [
  {
    id: 1,
    avatarUrl: "https://c.stocksy.com/a/XJC000/z9/47339.jpg",
    name: "James Martin",
    title: "Senior Graphic Designer",
    email: "james012@gmail.com",
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
    phone: "9876543210",
    address: "K52/65 Nguyễn Đình Bảng, Hải Châu, Đà Nẵng",
    twitter: "@sarahj",
    facebook: "www.facebook.com/sarahjohnson",
  },
];

export const getUserById = (id) => users.find((user) => user.id === id);
