import * as React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { Appbar, DataTable } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getAllReflections } from '../storage/AsyncStorage';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const OverviewComponent = () => {
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState(0);
  const itemsPerPage = 6;
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

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, reflections.length);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="My Reflections" />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>

      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title><Text style={styles.headerText}>Title</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.headerText}>Image</Text></DataTable.Title>
          <DataTable.Title><Text style={styles.headerText}>Date</Text></DataTable.Title>
        </DataTable.Header>

        {reflections.slice(from, to).map((reflection, index) => (
          <DataTable.Row style={styles.row} key={index}>
            <DataTable.Cell>
              <Text style={styles.text}>{reflection.title}</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {reflection.image && (
                <Image source={{ uri: reflection.image }} style={styles.image} />
              )}
            </DataTable.Cell>
            <DataTable.Cell>
              <Text style={styles.text}>
                {new Date(reflection.date).toLocaleDateString()}
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(reflections.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${reflections.length}`}
          showFastPaginationControls
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 80,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  header: {
    backgroundColor: '#f4f4f4',
  },
  headerText: {
    fontWeight: 'bold',
  },
});

export default OverviewComponent;
