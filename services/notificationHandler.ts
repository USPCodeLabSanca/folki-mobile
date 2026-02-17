import { Platform } from 'react-native';

type NotificationHandler = (data: any) => void;

class NotificationHandlerService {
  private handlers: Map<string, NotificationHandler> = new Map();

  register(type: string, handler: NotificationHandler) {
    this.handlers.set(type, handler);
  }

  unregister(type: string) {
    this.handlers.delete(type);
  }

  handle(data: any) {
    const type = data?.type;
    if (!type) return;

    const handler = this.handlers.get(type);
    if (handler) {
      handler(data);
    }
  }
}

export const notificationHandler = new NotificationHandlerService();

if (Platform.OS !== 'web') {
  global.notificationClickHandler = (data: any) => {
    notificationHandler.handle(data);
  };
}
