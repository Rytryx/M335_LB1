import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import AddComponent from '../sites/AddReflexionSite';
import OverviewComponent from '../sites/OverviewSite';
import AchievmentsComponent from '../sites/SearchReflectionsComponent';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AddRoute = () => 
  <SafeAreaProvider>
    <AddComponent />
  </SafeAreaProvider>;
const OverviewRoute = () => 
  <SafeAreaProvider>
    <OverviewComponent />
  </SafeAreaProvider>;
const AchievmentsRoute = () => 
  <SafeAreaProvider>
    <AchievmentsComponent />
  </SafeAreaProvider>;

const AppContent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'add', title: 'Add a Reflexion', focusedIcon: 'plus'},
    { key: 'overview', title: 'Reflexion Overview', focusedIcon: 'view-dashboard' },
    { key: 'achievments', title: 'Search Reflexion', focusedIcon: 'magnifier' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    add: AddRoute,
    overview: OverviewRoute,
    achievments: AchievmentsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default AppContent;
