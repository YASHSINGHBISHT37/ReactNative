import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { display: 'none' }, // hide the built-in one
    }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="Search" />
      <Tabs.Screen name="Insights" />
      <Tabs.Screen name="Library" />
      <Tabs.Screen name="Settings" />
      <Tabs.Screen name="Create" />
    </Tabs>
  );
}