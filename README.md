# 👾 Temporary Fix
Fix for preventing duplicate FCM notifications on iOS 18 in `react-native-firebase` that is `happening in iOS 18` ([see this](https://developer.apple.com/forums/thread/762412?answerId=800720022#800720022)). This fix will track and limit the processed messages to avoid duplicates.

## Description
This fix addresses the issue with `duplicate` Firebase Cloud Messaging (FCM) notifications on iOS 18 in react-native-firebase. The problem arises because of `onMessage` being triggered multiple times on iOS 18 devices that is somehow connected to iOS 18. 

To prevent this, the fix stores processed messageIds in an array and checks if a message has already been processed. If a message has already been handled, it is ignored. Additionally, the array is kept trimmed to the last 10 processed messages, ensuring memory efficiency while preventing duplicate notifications.

## Usage
Here's a simple example:
```jsx
import { tempIOS18Fix } from './tempIOS18Fix';

useEffect(() => {
  const processedMessagesFix = [];
  const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (!tempIOS18Fix(remoteMessage, processedMessagesFix)){
          return;
      }
  });

  return unsubscribe;
}, []);  
```
