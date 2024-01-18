import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Define a functional component called ImagePickerComponent
export default function ImagePickerComponent({ onImageSelected }) {
  // Initialize a state variable 'image' with null
  const [image, setImage] = useState(null);

  // Define a function called 'pickImage' for picking an image from the camera roll
  const pickImage = async () => {
    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // Check if an image was selected (not cancelled)
    if (!result.cancelled) {
      // Set the selected image URI in the state and log it
      setImage(result.assets[0].uri);
      console.log('setimage:', setImage);

      // Call the 'onImageSelected' callback function with the selected image URI
      onImageSelected(result.assets[0].uri);
    }
  };

  // Render the component with a button to pick an image and display the selected image if available
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      
      {/* Display the selected image if 'image' state is not null */}
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
