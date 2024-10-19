## 👾 Temporary fix for multiple onMessage (react-native-firebase)

## Description
This fix addresses the issue with duplicate Firebase Cloud Messaging (FCM) notifications on iOS 18 in react-native-firebase. The problem arises because of onMessage being triggered multiple times on iOS 18 devices. 

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
