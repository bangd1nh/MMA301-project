import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 7000 },
  { month: "Mar", revenue: 8000 },
  { month: "Apr", revenue: 6000 },
  { month: "May", revenue: 9000 },
  { month: "Jun", revenue: 12000 },
];

const bookSalesData = [
  { name: "Fiction", value: 400 },
  { name: "Non-Fiction", value: 300 },
  { name: "Science", value: 200 },
  { name: "History", value: 150 },
  { name: "Technology", value: 350 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

const AnalyticsScreen = () => {
  return (
    
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Revenue Analytics</Text>
      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="month" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </View>

      <Text style={styles.title}>📚 Book Sales Distribution</Text>
      <View style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bookSalesData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {bookSalesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginVertical: 15 },
  chartContainer: { alignItems: "center", marginBottom: 20 },
});


export default AnalyticsScreen;
