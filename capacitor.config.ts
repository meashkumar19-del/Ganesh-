import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.elitecompanions.app',
  appName: 'Elite Companions',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
