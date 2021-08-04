import React, { useEffect, useState } from "react"
import { Image, useWindowDimensions, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ResponseRenderer } from "../components"
import { recognizeImage } from "../mlkit"
import { Colors, Strings } from "../values"

export function ProcessImageScreen({ route }) {
    const { width: windowWidth } = useWindowDimensions()
    const [aspectRatio, setAspectRation] = useState(1)
    const [response, setResponse] = useState(null)
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
                //console.log(response)
                if(response?.blocks?.length > 0){
                    setResponse(response)
                    setAspectRation(response.height / response.width) //we set the correct width and height of the image processed originally
                }
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
                {
                    //`!!` means we converted the result returned into boolean :)
                    !!response && (
                        <ResponseRenderer 
                            response={response} 
                            scale={windowWidth / response.width /** helps us set position of blocks while rendeing */}
                        />
                    )
                }
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