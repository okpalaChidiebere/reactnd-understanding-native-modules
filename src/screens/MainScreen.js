import React, { useState } from "react"
import { View, StyleSheet, Platform, useWindowDimensions, Image }  from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Constants from "expo-constants"
import * as ImagePicker from "expo-image-picker"
import { DemoButton } from "../components"
import { Colors, Strings } from "../values"

export function MainScreen({ navigation }){

  const { width } = useWindowDimensions()
  const [image, setImage] = useState()

  const pickImage = async () => {
    
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return  
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const takePhoto = async () => {
    //FYI camra not available on ios Simulator
    if (Constants.isDevice || Platform.OS === "android"){
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!') 
        return  
      }

      let result = await ImagePicker.launchCameraAsync({
        quality: 1,
      })

      if (!result.cancelled) {
        setImage(result.uri)
      }
    }else{
      alert('Camera not available on iOS simulator') 
      return  
    }
      
  }

  const onProcessImage = () => {
    if (image) {
      navigation.navigate(Strings.screen_process_image, {
        uri: image,
      })
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>
        <View style={{ flex: 4, marginVertical: 24, alignItems: 'center', }} >
          {image && 
            <Image resizeMode="cover"
              resizeMethod="scale"
              style={{width, height: width}}
              source={{ uri: image }} 
            />
          }
        </View>
        <View style={{ flex: 1, }} >
          <View style={{flex: 1, flexDirection: 'column-reverse'}}>
            <View style={{flexDirection: 'row', paddingBottom: 8}}>
              <DemoButton key="Process Image" onPress={onProcessImage}>
                {'Process Image'}
              </DemoButton>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 8}}>
              <DemoButton
                key="Take Image"
                onPress={() => takePhoto()}
              >
                {'Take Image'}
              </DemoButton>
              <DemoButton
                key="Select Image"
                onPress={() => pickImage()}
              >
                {'Select Image'}
              </DemoButton>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  content: Platform.select({
    ios: {
      flex: 1,
      backgroundColor: Colors.empty
    },
    android: {
      flex: 1
    }
  }),
})

export function MainScreenOptions(){
  return {
      title: Strings.app_name,
      headerTintColor: Colors.back,
      headerMode: "screen",
      headerStyle: { 
        backgroundColor: Colors.theme_primary,
      },
  }
}