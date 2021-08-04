import React, { useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"

export function ResponseRenderer({ response, scale }){
    return (
        <View style={StyleSheet.absoluteFillObject}>
            {response.blocks.map(block => block.lines.map((line, key) => {
                return <Block line={line} scale={scale} key={key}/>
            }))}
        </View>
    )
}


const Block = ({ line, scale }) => {
    //for list optimization
    const lineFrame = useMemo(() => {
        return {
            left: line.lineFrame.left * scale,
            top: line.lineFrame.top * scale,
            height: line.lineFrame.height * scale,
            width: line.lineFrame.width * scale,
        }
    }, [ line, scale ])
    return(
        <View style={{
            position: "absolute",
            borderWidth: 1,
            backgroundColor: "red",
            ...lineFrame,
        }}>
            <Text style={{ color: "blue", fontSize: 7}}>{line.lineText}</Text>
        </View>
    )
}