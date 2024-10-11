import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F2F2F2",
          borderBottomWidth: 0,
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Farmacia"}} />
      <Stack.Screen name="products" options={{ title: "Produtos1"}} />
      <Stack.Screen name="produtos" options={{ title: "Produtos2"}} />
      <Stack.Screen name="bla" options={{ title: "Inicio"}} />
      <Stack.Screen name="firebase" options={{ title: "Firebase"}} />
      <Stack.Screen name="firebaseCRUD" options={{ title: "Firebase"}} />
    </Stack>
  );
}
