import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function camera() {
  const [hasGalleryPermission, sethasGalleryPermission] = useState(null);
  const [hasCamerPermission, sethasCamerPermission] = useState(null);
  const [camera, setcamera ] = useState(null);
  const [image, setimage ] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);


console.log(image)

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      sethasCamerPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      sethasGalleryPermission(galleryStatus.status === 'granted');
      
    })();
  }, []);

  const takePicture = async () => {
if(camera){
  const data = await camera.takePictureAsync(null)
  setimage(data.uri);
}
  }
  const DeletePhoto = async () => {
    if(camera){
      
      setimage(null);
    }
      }

     

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    

    if (result.cancelled) {
      setImage(result.uri);
     
    }
  
  };

  if (hasCamerPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCamerPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
      <Camera ref={ref => setcamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'}/>
      </View>
    
      <Button
     
      title="Flip Image"
      onPress={() => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
      }}>
      <Text style={styles.text}> Flip </Text>
    </Button> 
    <Button title="take picture" onPress={()=> takePicture()}/>
    <Button title="Delete" onPress={() =>DeletePhoto()}/>
    <Button title="Pick Image From Gallery" onPress={()=> pickImage()}/>
    {image && <Image source={{uri: image}} style={{flex: 1.50}}/>}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },

  cameraContainer:{
    flex:1,
    flexDirection: 'row'
  },
  fixedRatio:{
    flex:1,
    aspectRatio:1.06
  }
});
