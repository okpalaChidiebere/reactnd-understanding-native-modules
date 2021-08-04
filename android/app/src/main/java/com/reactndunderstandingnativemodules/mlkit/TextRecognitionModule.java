package com.reactndunderstandingnativemodules.mlkit;

import android.graphics.Point;
import android.graphics.Rect;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.TextRecognizerOptions;

import java.io.IOException;

public class TextRecognitionModule extends ReactContextBaseJavaModule {
    TextRecognitionModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "TextRecognitionModule";
    }

    //Helper function to convert a Rect Type to a readable map
    private WritableMap getRectMap(Rect rect){
        WritableMap rectObject = Arguments.createMap();
        rectObject.putInt("left", rect.left);
        rectObject.putInt("top", rect.top);
        rectObject.putInt("width", rect.right - rect.left);//coordinates start from left to right
        rectObject.putInt("height", rect.bottom - rect.top); //coordinates start from top to bottom

        return rectObject;
    }

    @ReactMethod
    public void recognizeImage(String url, Promise promise) {
        Uri uri = Uri.parse(url); //url gotten from JS side
        InputImage image;
        try {
            image = InputImage.fromFilePath(getReactApplicationContext(), uri);

            TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);

            recognizer.process(image)
                    .addOnSuccessListener(new OnSuccessListener<Text>() {
                        @Override
                        public void onSuccess(Text result) {
                            /*
                            * Create the map
                            *
                            * Maps are similar to Objects in JavaScript
                            * Learn more here https://reactnative.dev/docs/native-modules-android#argument-types
                            * */
                            WritableMap response = Arguments.createMap();

                            /*set some data to our map*/
                            response.putInt("width", image.getWidth()); //we want to add an integer data to our object
                            response.putInt("height", image.getHeight()); //we wil use this to know how to scale the image in RN Image component

                            //String resultText = result.getText();
                            WritableArray blocks = Arguments.createArray();
                            for (Text.TextBlock block : result.getTextBlocks()) {
                                //String blockText = block.getText();
                                //Point[] blockCornerPoints = block.getCornerPoints();
                                //Rect blockFrame = block.getBoundingBox();
                                WritableMap blockObject = Arguments.createMap();
                                blockObject.putString("blockText", block.getText());
                                blockObject.putMap("blockFrame", getRectMap(block.getBoundingBox()));

                                WritableArray lines = Arguments.createArray(); //create a lines array
                                for (Text.Line line : block.getLines()) {
                                    //String lineText = line.getText();
                                    //Point[] lineCornerPoints = line.getCornerPoints();
                                    //Rect lineFrame = line.getBoundingBox();
                                    WritableMap lineObject = Arguments.createMap();
                                    lineObject.putString("lineText", line.getText());
                                    lineObject.putMap("lineFrame", getRectMap(line.getBoundingBox()));
                                    lines.pushMap(lineObject); //we need to add each of our line to the lines array
                                    /*
                                    //we choose to skip elements. You can use it on your own if you want :)
                                    for (Text.Element element : line.getElements()) {
                                        String elementText = element.getText();
                                        Point[] elementCornerPoints = element.getCornerPoints();
                                        Rect elementFrame = element.getBoundingBox();
                                    }*/
                                }
                                blockObject.putArray("lines", lines);
                                blocks.pushMap(blockObject);
                            }
                            response.putArray("blocks", blocks);
                            promise.resolve(response);
                            /**
                             * We end up returning an object that looks like this to JS from this text regonition API
                             * {
                             *      width: number,
                             *      height: number,
                             *      blocks: [
                             *                  {
                             *                      blockText: string,
                             *                      blockFrame: {
                             *                          left: number,
                             *                          top: number,
                             *                          height: number,
                             *                          width: number,
                             *                      },
                             *                      lines: [
                             *                          {
                             *                              lineText: string
                             *                              lineFrame: {
                             *                                  left: number,
                             *                                  top: number,
                             *                                  height: number,
                             *                                  width: number,
                             *                              }
                             *                          }
                             *                          ....
                             *                      ]
                             *
                             *                  }
                             *                  ...
                             *      ],
                             * }
                             */
                        }
                    })
                    .addOnFailureListener(
                            new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    promise.reject("Text Recognition is failed", e);
                                }
                            });
        } catch (IOException e) {
            e.printStackTrace();
        }
        Log.d("TextRecognitionModule", "Url: " + url); //to confirm that the file uri we passed from JS side is gotten here :)
    }
}
