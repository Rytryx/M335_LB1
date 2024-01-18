import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import AddComponent from '../sites/AddReflexionSite';
import OverviewComponent from '../sites/OverviewSite';
import AchievmentsComponent from '../sites/SearchReflexionSite';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Define routes for different components
const AddRoute = () => 
  <SafeAreaProvider>
    <AddComponent />
  </SafeAreaProvider>;
const OverviewRoute = () => 
  <SafeAreaProvider>
    <OverviewComponent />
  </SafeAreaProvider>;
const SearchReflexionRoute = () => 
  <SafeAreaProvider>
    <AchievmentsComponent />
  </SafeAreaProvider>;

// Define the main content component
const AppContent = () => {
  // Define state variables for navigation
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'add', title: 'Add a Reflexion', focusedIcon: 'plus'},
    { key: 'overview', title: 'Reflexion Overview', focusedIcon: 'view-dashboard' },
    { key: 'searchreflexion', title: 'Search Reflexion', focusedIcon: 'paperclip' },
  ]);
  // Define a function to render different scenes based on the selected route
  const renderScene = BottomNavigation.SceneMap({
    add: AddRoute,
    overview: OverviewRoute,
    searchreflexion: SearchReflexionRoute,
  });
// Render the BottomNavigation component with navigation state and scene rendering
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default AppContent;
