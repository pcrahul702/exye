import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * Custom hook to handle back button behavior
 * @param {Object} options - Configuration options
 * @param {boolean} options.exitApp - Whether to exit app on back press
 * @param {boolean} options.preventBack - Whether to prevent back navigation
 * @param {string} options.navigateTo - Screen name to navigate to instead of going back
 * @param {function} options.customHandler - Custom handler function
 */
export const useBackHandler = (options = {}) => {
  const navigation = useNavigation();
  const {
    exitApp = false,
    preventBack = false,
    navigateTo = null,
    customHandler = null,
  } = options;

  useEffect(() => {
    const handleBackPress = () => {
      // If custom handler is provided, use it
      if (customHandler) {
        return customHandler();
      }

      // If should exit app
      if (exitApp) {
        BackHandler.exitApp();
        return true;
      }

      // If should prevent back navigation
      if (preventBack) {
        return true;
      }

      // If should navigate to specific screen
      if (navigateTo) {
        navigation.reset({
          index: 0,
          routes: [{ name: navigateTo }],
        });
        return true;
      }

      // Default: let React Navigation handle it
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, [navigation, exitApp, preventBack, navigateTo, customHandler]);
};

/**
 * Hook specifically for screens that should exit the app on back press
 */
export const useExitAppOnBack = () => {
  return useBackHandler({ exitApp: true });
};

/**
 * Hook specifically for screens that should prevent back navigation
 */
export const usePreventBack = (showMessage = null) => {
  const customHandler = showMessage
    ? () => {
        showMessage();
        return true;
      }
    : null;

  return useBackHandler({ 
    preventBack: !customHandler,
    customHandler 
  });
};

/**
 * Hook for screens that should navigate to a specific screen on back press
 */
export const useNavigateOnBack = (screenName) => {
  return useBackHandler({ navigateTo: screenName });
};
