import { Tabs } from "expo-router";

import "react-native-reanimated";


export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
