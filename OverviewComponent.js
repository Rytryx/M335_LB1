import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Appbar, Divider } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const OverviewComponent = () => {
  const insets = useSafeAreaInsets();

  return (
    <View>
      <Appbar.Header>
       <Appbar.Content title="My Reflexions" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="calendar" onPress={() => {}} />
      </Appbar.Header>
      <Text>Lemon</Text>
      <Divider />
      <Text>Mango</Text>
      <Divider />
      <Text>Mango</Text>
      <Divider />
      <Text>Mango</Text>
      <Divider />
  </View>
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

export default OverviewComponent;
