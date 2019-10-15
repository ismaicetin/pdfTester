import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  WebView, View, Text, Button,SafeAreaView,TextInput, 
} from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default class InAppBrowser extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      link:'http://dokuman.osym.gov.tr/pdfdokuman/arsiv/2009/2009OSS/2009oss_tur.pdf'
    };

  }


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

  _changeLink = (text) => {
    this.setState({ link: text });
  }



  render() {
    //let uri = 'http://dokuman.osym.gov.tr/pdfdokuman/arsiv/2009/2009OSS/2009oss_tur.pdf';

    if (/\.pdf$/.test(this.state.link)) {
      uri = `https://drive.google.com/viewerng/viewer?embedded=true&url=${this.state.link}`;
      console.log(this.state.link);
    }else{
      uri = this.state.link
    }

    return (
      <View style={{ flex: 1, flexDirection: 'column', marginTop: Constants.statusBarHeight, }}>
        <View style={{alignItems:"center",flexDirection: 'row' ,backgroundColor: "#ddd",padding:2 }}>
            <TextInput
              style={{  flex: 5, backgroundColor: "white",borderWidth: 1, borderRadius: 25,padding:8}}
              placeholder="SORU SAYISINI GİRİN"
              onChangeText={(text) => this._changeLink(text)}
              value={this.state.link}
            /> 
            <Ionicons style={{  flex: 1,}} name="md-checkmark-circle" size={32} color="green" />
          </View>
        <View style={{flex: 1,}}> 
          <WebView 
            onLoad={() => this.renderLoadingView()}
            source={{ uri }}
            startInLoadingState={true}
          />
        </View>
       {/* <View style={{ flex: 1 }}>

          <View style={{ position: "absolute", backgroundColor: 'powderblue', top: "50%", left: -24 }}>

            <Button
              title="<"
              onPress={() => console.warn('Simple Button pressed')}
            />
          </View> 
          <Text >dfdf </Text> 
        </View> 
*/}

      </View>  
    );
  }
} 


