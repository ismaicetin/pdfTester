import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, SafeAreaView, Button, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Constants from 'expo-constants';

export default class SideDrawer extends Component {

   constructor(props) {
      super(props);

      this.state = {
         data: [],
         sayi: "18",
         sonucGoster: false,
         soruSayisi: [], cevap: []
      };

      /*
            var mynumber = 10;
      var arr = new Array(mynumber);
      */
   }
   componentDidMount() {
      this.setState({
         soruSayisi: [...Array(parseInt(this.state.sayi)).keys()]
      })
   }

   _getValue = (index) => {
      var r = " - "
      var value = this.state[`${index}`]
      if (value == 0) r = "A"
      else if (value == 1) r = "B"
      else if (value == 2) r = "C"
      else if (value == 3) r = "D"
      else if (value == 4) r = "E"
      return r
   }

   _selected = (index, value) => {
      if (this.state[`${index}`] != value) {
         this.setState({ [`${index}`]: value });
      } else {
         this.setState({ [`${index}`]: "" });
      }
   }

   _selectedCevap = (index, value) => {
      if (this.state.cevap[`${index}`] != value) {

         this.setState(prevState => ({
            cevap: {
               ...prevState.cevap,
               [`${index}`]: value,
            },
         }));
      } else {
         this.setState(prevState => ({
            cevap: {
               ...prevState.cevap,
               [`${index}`]: null,
            },
         }));
      }
   }
   _sifirlar = () => {
      for (let index = 0; index < this.state.sayi; index++) {
         this.setState({ [`${index}`]: null });
         this.setState(prevState => ({
            cevap:[],
         }));
      }
   }
   _dogruYanlısBasarıOranı = () => {
      var sorusayisi = this.state.sayi;
      var dogru = 0
      var yanlis = 0
      var basari = 0
      for (let index = 0; index < sorusayisi; index++) {
         if (this.state.cevap[`${index}`] != undefined) {
            if (this.state.cevap[`${index}`] == 1) {
               dogru++
            } else if (this.state.cevap[`${index}`] == 0) {
               yanlis++
            }
         }
      }
      basari= (dogru *100) /sorusayisi; 
      return ` Dogru:${dogru} \n Yanlış:${yanlis} \n Başarı: % ${basari.toFixed(2).toString()} \n`
   }

   _changeSoruSayisi = (text) => {
      this.setState({ sayi: text });
      if (parseInt(text) > 0) {
         this.setState({
            soruSayisi: [...Array(parseInt(text)).keys()]
         })
      }
   }


   render() {

      const listItems = this.state.soruSayisi.map((item, index) => (
         <View key={index} style={{ display: "flex", flexDirection: 'row', marginTop: 8, backgroundColor: "#f7f7f7", padding: 2 }}  >

            <View style={styles.item}>
               <Text> {(index + 1).toString() +") "}</Text>
            </View>
            {this.state.sonucGoster == false ?
               <View style={{ display: "flex", flexDirection: 'row' }}>
                  <TouchableOpacity
                     style={[styles.button, this.state[`${index}`] == 1 ? styles.backgroundColorActive : styles.backgroundColorDefault]}
                     onPress={() => this._selected(index, 1)}
                  >
                     <Text style={this.state[`${index}`] == 1 ? styles.colorActive : styles.colorDefault}>A</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={[styles.button, this.state[`${index}`] == 2 ? styles.backgroundColorActive : styles.backgroundColorDefault]}
                     onPress={() => this._selected(index, 2)}
                  >
                     <Text style={this.state[`${index}`] == 2 ? styles.colorActive : styles.colorDefault}>B</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={[styles.button, this.state[`${index}`] == 3 ? styles.backgroundColorActive : styles.backgroundColorDefault]}
                     onPress={() => this._selected(index, 3)}
                  >
                     <Text style={this.state[`${index}`] == 3 ? styles.colorActive : styles.colorDefault}>C</Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                     style={[styles.button, this.state[`${index}`] == 4 ? styles.backgroundColorActive : styles.backgroundColorDefault]}
                     onPress={() => this._selected(index, 4)}
                  >
                     <Text style={this.state[`${index}`] == 4 ? styles.colorActive : styles.colorDefault}>D</Text>
                  </TouchableOpacity>


                  <TouchableOpacity
                     style={[styles.button, this.state[`${index}`] == 5 ? styles.backgroundColorActive : styles.backgroundColorDefault]}
                     onPress={() => this._selected(index, 5)}
                  >
                     <Text style={this.state[`${index}`] == 5 ? styles.colorActive : styles.colorDefault}>E</Text>
                  </TouchableOpacity>
               </View>
               : <View style={{ display: "flex", flexDirection: 'row' }}>
                  <Text style={{fontWeight:"bold",marginLeft:5 ,marginRight:5 }}>{this._getValue(index)}</Text>
                  {this.state[`${index}`] != null &&
                     <TouchableOpacity
                        style={[styles.button, this.state.cevap[`${index}`] == 1 ? styles.backgroundColorActiveSuccess : styles.backgroundColorDefault]}
                        onPress={() => this._selectedCevap(index, 1)}
                     >
                        <Text style={this.state.cevap[`${index}`] == 1 ? styles.colorActiveSucces : styles.colorDefault}>D</Text>
                     </TouchableOpacity>
                  }{this.state[`${index}`] != null &&
                     <TouchableOpacity
                        style={[styles.button, this.state.cevap[`${index}`] == 0 ? styles.backgroundColorActive : styles.backgroundColorDefault]}
                        onPress={() => this._selectedCevap(index, 0)}
                     >
                        <Text style={this.state.cevap[`${index}`] == 0 ? styles.colorActive : styles.colorDefault}>Y</Text>
                     </TouchableOpacity>
                  }
               </View>
            }
         </View>
      ))

      return (
         <View style={styles.container}>
            <TextInput
               style={{ height: 40, width: "100%" }}
               placeholder="SORU SAYISINI GİRİN"
               onChangeText={(text) => this._changeSoruSayisi(text)}
               value={this.state.sayi}
               keyboardType='numeric'
            />
            <ScrollView style={styles.scrollView}>
               {listItems}


               <View style={{ width: 200, alignItems: 'center' }}>
               {this.state.sonucGoster ? 
                        <Text >{this._dogruYanlısBasarıOranı()}</Text> :null
                  }

                  <TouchableOpacity
                     style={styles.sınaviBitir}
                     onPress={() => { this.setState({ sonucGoster: !this.state.sonucGoster }); }}
                  >
                     <Text style={{ textAlign: "center", color:"white" ,fontWeight:"bold"}} >{this.state.sonucGoster ? "Sınava Don" : "Sınavı Bitir"}</Text>
                  </TouchableOpacity>



                  {this.state.sonucGoster ?
                     <TouchableOpacity
                        style={{backgroundColor: "#ff5722",borderRadius:8,padding:5,marginTop:5}}
                        onPress={() => { this._sifirlar() }}
                     >
                        <Text  >Sonucları Sıfırla</Text>
                     </TouchableOpacity> : null
                  }

 
                 


               </View>


            </ScrollView>


         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      marginTop: Constants.statusBarHeight,
      backgroundColor: 'white',
      width: Dimensions.get("window").width * 0.8,
      textAlign: "center"
   },
   item: {
      width: 25,
      marginLeft: 5,
      marginTop: 2
   },
   button: {
      marginLeft: 5,
      height: 25,
      width: 25,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderRadius: 12,
      borderColor: "#ff5722",
   },
   backgroundColorActive: {
      borderColor: "black",
      backgroundColor: "#FF5722",
   },
   backgroundColorActiveSuccess: {
      borderColor: "black",
      backgroundColor: "#28a745",
   },
   backgroundColorDefault: {

   },
   colorActive: {
      color: "black"
   },
   colorActiveSucces: {
      color: "white"
   },
   colorDefault: {
      color: "#ff5722"
   }, scrollView: {
      marginBottom: Constants.statusBarHeight + 40
   }, sınaviBitir: {
      marginTop:5,
      padding: 20,
      width: 180,
      backgroundColor: "#28a745",
      borderRadius:8
   }



});