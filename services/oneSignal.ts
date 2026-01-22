import { OneSignal } from 'react-native-onesignal';
import { Platform } from 'react-native';

/*
ESSE ARQUIVO É O CLÁSSICO NÃO MEXA.
A DOCUMENTAÇÃO (OU A FALTA DELA) DO ONESIGNAL PARA REACT NATIVE E WEB É UMA DAS PIORES QUE JÁ VI.
ENTÃO, SE VOCÊ ESTÁ LENDO ISSO, PROVAVELMENTE ESTÁ TENTANDO ARRUMAR ALGUMA COISA. BOA SORTE.
SE QUISER INOVAR OU REFATORAR, NÃO MEXA. NÃO MEXA.
*/

const ONESIGNAL_APP_ID = '63da72b4-fe6a-4f88-8cdd-c64ea598e8c0';

let isInitialized = false;

declare global {
  interface Window {
    OneSignalDeferred?: any[];
    OneSignal?: any;
  }
}

export const initializeOneSignal = async () => {
  if (Platform.OS === 'web') {
    try {
      if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const script1 = document.createElement('script');
        script1.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
        script1.defer = true;
        document.head.appendChild(script1);
        
        setTimeout(() => {
          const script2 = document.createElement('script');
          script2.innerHTML = `
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "63da72b4-fe6a-4f88-8cdd-c64ea598e8c0",
              safari_web_id: "web.onesignal.auto.428d294a-5ce2-44bb-bee0-dec3149a5564",
              notifyButton: {
                enable: true,
              },
              allowLocalhostAsSecureOrigin: true,
            });
            
            OneSignal.Notifications.addEventListener('permissionChange', (granted) => {
              if (granted) {
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            });
          });
        `;
          document.head.appendChild(script2);
        }, 1000);
      }
    } catch (error) {
      console.error('Erro ao inicializar OneSignal Web:', error);
    }
    return;
  }
  
  OneSignal.initialize(ONESIGNAL_APP_ID);
  isInitialized = true;
  
  const hasPermission = await OneSignal.Notifications.getPermissionAsync();
  if (hasPermission) {
    return true;
  }

  const granted = await OneSignal.Notifications.requestPermission(true);
  return granted;
};

export const getPlayerId = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    try {
      if (typeof window === 'undefined') return null;
      
      return await new Promise((resolve) => {
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        window.OneSignalDeferred.push(async function(OneSignal: any) {
          setTimeout(() => {
            const subscriptionId = OneSignal.User.PushSubscription.id;
            console.log('OneSignal subscription ID (web):', subscriptionId);
            resolve(subscriptionId || null);
          }, 2000);
        });
      });
    } catch (error) {
      console.error('Erro no getPlayerId web:', error);
      return null;
    }
  }
  
  try {
    if (!isInitialized) {
      console.log('OneSignal: inicializando antes de obter player ID');
      OneSignal.initialize(ONESIGNAL_APP_ID);
      isInitialized = true;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const hasPermission = await OneSignal.Notifications.getPermissionAsync();
    
    if (!hasPermission) {
      return null;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const subscriptionId = await OneSignal.User.pushSubscription.getIdAsync();
    return subscriptionId || null;
  } catch (error) {
    console.error('Erro ao obter OneSignal player ID:', error);
    return null;
  }
};
