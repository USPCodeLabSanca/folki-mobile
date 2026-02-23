import { Mixpanel } from 'mixpanel-react-native';

const MIXPANEL_TOKEN = 'edefcc9a2dfa351b5868d524099109ff';

interface MixpanelEvent {
  [key: string]: any;
}

class MixpanelService {
  private mixpanel: Mixpanel | null = null;
  private isInitialized: boolean = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      if (MIXPANEL_TOKEN) {
        const trackAutomaticEvents = false;
        const useNative = false;
        this.mixpanel = new Mixpanel(MIXPANEL_TOKEN, trackAutomaticEvents, useNative);
        await this.mixpanel.init();
        this.isInitialized = true;
      }
    } catch (error) {
      console.error('Erro ao inicializar Mixpanel:', error);
    }
  }

  track(eventName: string, properties?: MixpanelEvent) {
    if (!this.isInitialized || !this.mixpanel) return;

    try {
      this.mixpanel.track(eventName, properties);
    } catch (error) {
      console.error('Erro ao rastrear evento:', error);
    }
  }

  identify(userId: string) {
    if (!this.isInitialized || !this.mixpanel) return;

    try {
      this.mixpanel.identify(userId);
    } catch (error) {
      console.error('Erro ao identificar usuário:', error);
    }
  }

  setUserProperties(properties: MixpanelEvent) {
    if (!this.isInitialized || !this.mixpanel) return;

    try {
      this.mixpanel.getPeople().set(properties);
    } catch (error) {
      console.error('Erro ao definir propriedades do usuário:', error);
    }
  }

  reset() {
    if (!this.isInitialized || !this.mixpanel) return;

    try {
      this.mixpanel.reset();
    } catch (error) {
      console.error('Erro ao resetar Mixpanel:', error);
    }
  }
}

export default new MixpanelService();
