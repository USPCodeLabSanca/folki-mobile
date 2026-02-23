import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import mixpanel from '../services/mixpanel';

export const useScreenTracking = (screenName: string, properties?: Record<string, any>) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      mixpanel.track('Screen View', {
        screen: screenName,
        ...properties,
      });
    }
  }, [isFocused, screenName]);
};
