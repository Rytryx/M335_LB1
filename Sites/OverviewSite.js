import * as React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Appbar, DataTable } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAllReflections } from '../storage/AsyncStorage';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const OverviewComponent = () => {
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const [reflections, setReflections] = React.useState([]);

  const loadReflections = async () => {
    try {
      const loadedReflections = await getAllReflections();
      setReflections(loadedReflections);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    loadReflections();
  }, []);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, reflections.length);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="My Reflections" />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title>Image</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {reflections.slice(from, to).map((reflection, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{reflection.title}</DataTable.Cell>
            <DataTable.Cell>
              <Image source={{ uri: reflection.image }} style={{ width: 50, height: 50 }} />
            </DataTable.Cell>
            <DataTable.Cell>{new Date(reflection.date).toLocaleDateString()}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(reflections.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${reflections.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </View>
  );
};

export default OverviewComponent;
