import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

// Rotas para quando o usuário não está autenticado

/**
 * React Navigarion Stack
 * -> É a forma de navegação em Pilhas.
 * Comparando com o ReactRouterDom, o react-navigation basicamente possui os componentes
 * que se assemelha com o Route, Switch e o Browser Router, que é o Screen, Navigation e o NavigationContainer.
 * -> As rotas esta mais para uma mistura de Routes com Context.
 */
const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#312e38" }
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
