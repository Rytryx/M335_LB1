import * as React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Appbar, Divider, DataTable } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const OverviewComponent = () => {
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const [reflections] = React.useState([
    { key: 1, title: 'Reflection 1', imageUrl: 'https://example.com/image1.jpg', date: '2024-01-01' },
    { key: 2, title: 'Reflection 2', imageUrl: 'https://example.com/image2.jpg', date: '2024-01-02' },
  ]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, reflections.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="My Reflexions" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="calendar" onPress={() => {}} />
      </Appbar.Header>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title>Image</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
        </DataTable.Header>

        {reflections.slice(from, to).map((reflection) => (
          <DataTable.Row key={reflection.key}>
            <DataTable.Cell>{reflection.title}</DataTable.Cell>
            <DataTable.Cell>
              <Image source={{ uri: reflection.imageUrl }} style={{ width: 50, height: 50 }} />
            </DataTable.Cell>
            <DataTable.Cell>{reflection.date}</DataTable.Cell>
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

const styles = StyleSheet.create({
  // Stylesheet for Styling if needed in the Future
});

export default OverviewComponent;
