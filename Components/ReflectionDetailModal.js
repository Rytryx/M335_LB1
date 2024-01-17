import * as React from 'react';
import { Modal, Portal, Text, View, Image, StyleSheet } from 'react-native-paper';

const ReflectionDetailModal = ({ visible, onHide, reflection }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onHide} contentContainerStyle={containerStyle}>
        {reflection && (
          <View>
            <Text style={styles.title}>{reflection.title}</Text>
            {reflection.image && (
              <Image source={{ uri: reflection.image }} style={styles.image} />
            )}
            <Text>Date: {new Date(reflection.date).toLocaleDateString()}</Text>
          </View>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%', 
    height: 200,   
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default ReflectionDetailModal;
