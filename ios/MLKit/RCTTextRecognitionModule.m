//
//  TextRecognitionModule.m
//  reactndunderstandingnativemodules
//
//  Created by Chidiebere Okpala Collins on 2021-08-04.
//

#import "RCTTextRecognitionModule.h" //add your headr file
#import <React/RCTLog.h>


@implementation RCTTextRecognitionModule

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
  
}

@end

