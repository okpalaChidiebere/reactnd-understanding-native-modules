package com.reactndunderstandingnativemodules.mlkit;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class TextRecognitionModule extends ReactContextBaseJavaModule {
    TextRecognitionModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "TextRecognitionModule";
    }

    @ReactMethod
    public void recognizeImage(String url) {
        Log.d("TextRecognitionModule", "Url: " + url); //to confirm that the file uri we passed from JS side is gotten here :)
    }
}
