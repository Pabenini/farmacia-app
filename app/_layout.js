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
      <Stack.Screen name="index" options={{ title: "Farma-Cia"}} />
      <Stack.Screen name="products" options={{ title: "Produtos"}} />
      <Stack.Screen name="produtos" options={{ title: "Produtos2"}} />
      <Stack.Screen name="bla" options={{ title: "Inicio"}} />
      <Stack.Screen name="firebase" options={{ title: "Registros"}} />
      <Stack.Screen name="firebaseCRUD" options={{ title: "Cadastro"}} />
    </Stack>
  );
}
