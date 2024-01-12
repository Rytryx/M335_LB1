import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContent from './AppContent';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

export default App;
