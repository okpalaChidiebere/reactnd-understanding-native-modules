import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { 
  MainScreen, MainScreenOptions, 
  ProcessImageScreen, ProcessImageScreenOptions,
 } from "./screens"
import { Strings } from "./values"

const Stack = createStackNavigator()
const MainNavigator = () => (
  <Stack.Navigator 
    initialRouteName={Strings.component_main}
  >
    <Stack.Screen
      name={Strings.component_main}
      component={MainScreen}
      options={MainScreenOptions}
    />
    <Stack.Screen
        name={Strings.screen_process_image}
        component={ProcessImageScreen}
        options={ProcessImageScreenOptions}
    />
  </Stack.Navigator>
)

export default MainNavigator
