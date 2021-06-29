import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import SplashScreen from '../Screens/SplashScreen'
import HomeNavigation from '../HomeNavigation'

const PrimaryNav = createStackNavigator({
    SplashScreen : {screen : SplashScreen},
    HomeNavigation : {screen: HomeNavigation}
},{
    headerMode:'none',
    initialRouteName:'SplashScreen',
    navigationOptions: {
      }
})

export default createAppContainer(PrimaryNav)