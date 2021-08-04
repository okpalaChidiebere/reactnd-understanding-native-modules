//
//  TextRecognitionModule.m
//  reactndunderstandingnativemodules
//
//  Created by Chidiebere Okpala Collins on 2021-08-04.
//

#import "RCTTextRecognitionModule.h" //add your headr file
#import <React/RCTLog.h>

/*
 sometimes you might be confused on what to import just look at the sample code
 provided in the documentation
 https://github.com/googlesamples/mlkit/blob/master/ios/quickstarts/vision/VisionExampleObjC/CameraViewController.m
 **/
@import MLKit;


@implementation RCTTextRecognitionModule

//@import MLKit;

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE(TextRecognitionModule /*this name must match what you will inport in JS as the native module*/);

/* creating the native method that you will invoke in JS **/
RCT_EXPORT_METHOD(recognizeImage:(NSString *)url)
{
  /**
   @" "  means " " like in JavaScript
   %@ represents the variables you want to add to the string passed as arguments
   */
  RCTLogInfo(@"URL: %@", url); //for testing :)
  
  /*
   Prepare the input image
   https://developers.google.com/ml-kit/vision/text-recognition/ios#1.-prepare-the-input-image
   
   We basically google `how to create uiimage from url objective c` because we needed
   to pass UIImage to MLKit from looking at the docs
   https://stackoverflow.com/questions/1760857/iphone-how-to-get-a-uiimage-from-a-url
   **/
  NSURL *_url = [NSURL URLWithString:url];
  NSData *imageData = [NSData dataWithContentsOfURL:_url];
  UIImage *img = [UIImage imageWithData:imageData];
  
  MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:img];
  
  //Get an instance of TextRecognizer
  MLKTextRecognizer *textRecognizer = [MLKTextRecognizer textRecognizer];

  //process the image
  [textRecognizer processImage:visionImage
                    completion:^(MLKText *_Nullable result,
                                 NSError *_Nullable error) {
    if (error != nil || result == nil) {
      // Error handling
      return;
    }
    // Recognized text
    NSString *resultText = result.text;
    for (MLKTextBlock *block in result.blocks) {
      NSString *blockText = block.text;
      NSArray<MLKTextRecognizedLanguage *> *blockLanguages = block.recognizedLanguages;
      NSArray<NSValue *> *blockCornerPoints = block.cornerPoints;
      CGRect blockFrame = block.frame;
      for (MLKTextLine *line in block.lines) {
        NSString *lineText = line.text;
        NSArray<MLKTextRecognizedLanguage *> *lineLanguages = line.recognizedLanguages;
        NSArray<NSValue *> *lineCornerPoints = line.cornerPoints;
        CGRect lineFrame = line.frame;
        /**
        we choose to ignore the elements  like in Java
         
         for (MLKTextElement *element in line.elements) {
           NSString *elementText = element.text;
           NSArray<MLKTextRecognizedLanguage *> *elementLanguages = element.recognizedLanguages;
           NSArray<NSValue *> *elementCornerPoints = element.cornerPoints;
           CGRect elementFrame = element.frame;
         }
         */
      }
    }
  }];
  
}

@end

