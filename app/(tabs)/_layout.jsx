import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from "expo-linear-gradient"
import { Tabs } from "expo-router"

export default function TabLayout() {
    const tabs = [
        { name: 'index', title: 'Home', icon: 'home-filled' },
        { name: 'Search', title: 'Search', icon: 'search' },
        { name: 'insights', title: 'Library', icon: 'library-music' },
        { name: 'Settings', title: 'Settings', icon: 'settings' },
        { name: 'Create', title: 'Create', icon: 'add' },
    ]

    const SCREEN_OPTIONS = {
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            height: 60,
            paddingBottom: 0,
            paddingTop: 4,
            position: "absolute",
            bottom: 0,
            left: 0,
        },
        tabBarLabelStyle: {
            fontWeight: "400",
            fontSize: 9,
        },
        tabBarIconStyle: {
            marginBottom: 4,
        },
        tabBarBackground: () => (
            <LinearGradient
                colors={['black', 'transparent']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={{ flex: 1 }}
            />
        ),
    }

    return (
        <Tabs screenOptions={SCREEN_OPTIONS}>
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}            // ✅ always key list items
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons rialSymbols name={tab.icon} size={28} color={color} />
                        ),
                    }}
                />
            ))}
        </Tabs>
    )
}