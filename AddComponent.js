import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button, IconButton } from 'react-native-paper';

const AddComponent = () => {
  const insets = useSafeAreaInsets();

  const [title, setTitle] = React.useState('');
  const [reflectionText, setReflectionText] = React.useState('');
  const [reflectionDate, setReflectionDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const pickImage = () => {/* Placeholder */};
  const startRecording = () => {/* Placeholder */};
  const submitReflection = () => {/* Placeholder */};

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Pick an Image</Text>
            <IconButton icon="camera" color="black" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Select Date</Text>
            <IconButton icon="calendar" color="black" size={20} />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={reflectionDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || reflectionDate;
              setShowDatePicker(false);
              setReflectionDate(currentDate);
            }}
          />
        )}
        <TextInput
          label="Your Reflection"
          value={reflectionText}
          onChangeText={setReflectionText}
          mode="outlined"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.button} onPress={startRecording}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Start Recording</Text>
            <IconButton icon="microphone" color="black" size={20} />
          </View>
        </TouchableOpacity>
        <Button mode="contained" onPress={submitReflection} color="lightgray" style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Reflection</Text>
        </Button>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    marginBottom: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    width: '100%',
  },
  submitButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default AddComponent;
