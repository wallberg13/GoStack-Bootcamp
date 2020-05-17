// Rotas para quando o usuário está autenticado
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../pages/Dashboard";

// Rotas para quando o usuário não está autenticado

/**
 * React Navigarion Stack
 * -> É a forma de navegação em Pilhas.
 * Comparando com o ReactRouterDom, o react-navigation basicamente possui os componentes
 * que se assemelha com o Route, Switch e o Browser Router, que é o Screen, Navigation e o NavigationContainer.
 * -> As rotas esta mais para uma mistura de Routes com Context.
 */
const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#312e38" }
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
);

export default AppRoutes;
