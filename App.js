import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/views/HomeScreen'
import ScanScreen from './src/views/ScanScreen'
import DetailsScreen from './src/views/DetailsScreen'
import FullImage from './src/views/FullImage'

const HomeStack = createStackNavigator(
    {
      HomePage: { screen: HomeScreen },
      Details: { screen: DetailsScreen },
      FullImage: { 
            screen: FullImage,
            headerMode: 'none',
        }
    }
);

const TabNavigator = createBottomTabNavigator(
{
    Home: {
        screen: HomeStack,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="home"
                    size={24}
                    style={{ color: tintColor }}
                />
            ),
        })
    },
    Scanner: {
        screen: ScanScreen,
        navigationOptions: () => ({
            tabBarIcon: ({focused, tintColor }) => (
                <Icon
                    name="barcode-scan"
                    type="MaterialCommunityIcons"
                    style={{ color: tintColor }}
                    size={24}
                />
            ),
        })
    },
    },
    {
    mode: 'modal', 
    tabBarOptions: { 
        showLabel: false,
        activeTintColor: '#cd077d',
        inactiveTintColor: 'gray', 
    }
}
);

export const AppNavigator = createAppContainer(TabNavigator);

export default class AppContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isReady: false,
        };
    }

    async _loadAssetsAsync() {

        await Font.loadAsync({
            'linotype_brewery_bold': require('./assets/fonts/linotype_brewery_bold.ttf'),
            'SFProDisplay-Bold': require('./assets/fonts/SF-Pro-Display-Black.otf'),
            'SFProDisplay-Regular': require('./assets/fonts/SF-Pro-Display-Regular.otf')
        })
    }


        render() {
            if (!this.state.isReady) {
              return (
                <AppLoading
                  startAsync={this._loadAssetsAsync}
                  onFinish={() => this.setState({ isReady: true })}
                  onError={console.warn}
                />
              );
            }
        
            return (
                <AppNavigator />
            );
          }
    

}
