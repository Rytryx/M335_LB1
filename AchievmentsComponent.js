import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const AchievmentsComponent = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Text style={styles.text}>AchievmentsComponent</Text>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default AchievmentsComponent;
