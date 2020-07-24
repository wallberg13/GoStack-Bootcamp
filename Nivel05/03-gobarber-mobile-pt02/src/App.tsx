// Para o react-navigation, isso tem que funcionar.
import "react-native-gesture-handler";
import React from "react";
import { View, StatusBar } from "react-native";
// Contexto do Navigator
import { NavigationContainer } from "@react-navigation/native";
import AppProvider from "./hooks";
import Routes from "./routes";

/**
 * A StatusBar pode ser inserida em qualquer do app, inclusive, tem como ser configurada em páginas individuais.
 */
const App: React.FC = () => (
  <NavigationContainer>
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: "#312e38" }}>
        <Routes />
      </View>
    </AppProvider>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" translucent />
  </NavigationContainer>
);

export default App;
