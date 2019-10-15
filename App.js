/*import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  WebView, View, Text, Button
} from 'react-native';

export default class InAppBrowser extends React.Component {
  renderLoadingView() {
    const dimensions = Dimensions.get('window');
    const marginTop = dimensions.height / 2 - 75;

    return (
      <ActivityIndicator
        animating={true}
        color='#0076BE'
        size='large'
        hidesWhenStopped={true}
        style={{ marginTop }}
      />
    );
  }


  render() {
    let uri = 'http://www.pdf995.com/samples/pdf.pdf';

    if (/\.pdf$/.test(uri)) {
      uri = `https://drive.google.com/viewerng/viewer?embedded=true&url=${uri}`;
      console.log(uri);
    }

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 5 }}>
          <WebView
            renderLoading={this.renderLoadingView}
            source={{ uri }}
            startInLoadingState={true}
          />
        </View>
        <View style={{ flex: 1 }}>

          <View style={{ position: "absolute", backgroundColor: 'powderblue', top: "50%", left: -24 }}>

            <Button
              title="<"
              onPress={() => console.warn('Simple Button pressed')}
            />
          </View> 
          <Text >dfdf </Text> 
        </View> 
      </View>

    );
  }
} 
*/

import React, { Component } from 'react';
import  { Text,View } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import HomeScreen from './screens/HomeScreen';
import SideDrawer from './screens/SideDrawer';
import Constants from 'expo-constants';
 
 
 
 
 



const DrawerStack = createDrawerNavigator({
  HomePage: { screen: HomeScreen },
  SideDrawer: { screen: SideDrawer } 
},
{
  gesturesEnabled: false,
  contentComponent: SideDrawer,
  drawerPosition:"right",
  drawerWidth:200
  
})


export default DrawerStack