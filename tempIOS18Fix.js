// Temporary fix to avoid duplicate messages on iOS version 18 (https://github.com/invertase/react-native-firebase/issues/7979)
import { Platform } from 'react-native';
import * as DeviceInfo from 'expo-device';
// import DeviceInfo from 'react-native-device-info'; (If you are not using expo)

export const tempIOS18Fix = (remoteMessage, processedMessagesFix = []) => {
  const iosVersion = Platform.OS === 'ios' ? parseInt(DeviceInfo.osVersion) : null; // Use DeviceInfo.getSystemVersion() instead if you are not using expo

  // Only apply this logic for iOS version 18 or above and just continue otherwise
  if (Platform.OS === 'ios' && iosVersion >= 18) {
    const tempFixMessageId = remoteMessage.messageId;

    // If messageId exists check for duplicates and return if already processed
    if (tempFixMessageId && processedMessagesFix.includes(tempFixMessageId)) { 
      return false; // Indicate message was already processed
    }

    if (tempFixMessageId) {
      // Add messageId to processed list to avoid duplicates
      processedMessagesFix.push(tempFixMessageId);   

      // If the array exceeds 10 items, remove the oldest ones (just for safety to avoid memory leaks)
      if (processedMessagesFix.length > 10) {
        processedMessagesFix.splice(0, processedMessagesFix.length - 10);
      }      
    }
  }

  return true; // Indicate message should be processed
};
