// import {
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold,
//     Poppins_700Bold,
//     useFonts
// } from "@expo-google-fonts/poppins"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { SafeAreaView } from "react-native-safe-area-context"
import "../global.css"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    // const [loaded, error] = useFonts({
    //     Poppins_400Regular,
    //     Poppins_500Medium,
    //     Poppins_600SemiBold,
    //     Poppins_700Bold,
    // })


    return (
        <SafeAreaView className="flex-1 bg-[#121212]">
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="boarding" />
            </Stack>
        </SafeAreaView>
    )
}