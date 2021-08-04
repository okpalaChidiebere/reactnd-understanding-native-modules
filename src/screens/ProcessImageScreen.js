import React, { useEffect, useState } from "react"
import { Image, useWindowDimensions, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { recognizeImage } from "../mlkit"
import { Colors, Strings } from "../values"

export function ProcessImageScreen({ route }) {
    const { width: windowWidth } = useWindowDimensions()
    const [aspectRatio, setAspectRation] = useState(1)
    const uri = route.params.uri

    useEffect(() => {
        if (uri) {
            proccessImage(uri)
        }
    }, [uri])

    const proccessImage = async (url) => {
        if(url){
            try{
                const response = await recognizeImage(url)
                console.log(response)
            }catch(e){
                console.log(e)
            }
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom", "left", "right"]}>
            <ScrollView style={{ flex: 1 }}>
                <Image
                    source={{ uri }}
                    style={{ width: windowWidth, height: windowWidth * aspectRatio }}
                    resizeMode="cover"
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
  })

export function ProcessImageScreenOptions(){
    return {
        title: Strings.screen_process_image,
        headerTintColor: Colors.back,
        headerMode: "screen",
        headerStyle: { 
          backgroundColor: Colors.theme_primary,
        },
    }
  }