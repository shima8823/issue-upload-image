import React from 'react';
import {Button, SafeAreaView} from 'react-native';

import {launchImageLibrary, ImagePickerResponse} from 'react-native-image-picker';

function App(): React.JSX.Element {
  const onPress = async () => {
    console.log('Button pressed');

    let result: ImagePickerResponse | undefined;

    result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 3,
    });
    if (result === undefined || result.assets === undefined)
      return;

    let asset = result.assets[0];
    // asset.uri = "file:///Users/{username}/Downloads/example.png"
    console.log('result.assets[0].uri: ', result.assets[0].uri);
    const blobPromise = (await fetch(asset.uri as string)).blob();
    let blob = await blobPromise;

    console.log('blob: ', blob);

    const formData = new FormData();
    // const blobURL = URL.createObjectURL(blob)
    let file = new File([blob], asset.uri, {
      type: asset.type as string,
      lastModified: new Date().getTime(),
    });
    formData.append('file', file);

    console.log('formData:', formData);

    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
      headers: {
	  },
    });

    if (!response.ok) {
      console.log('response not ok');
      return;
    }

	console.log('response:', response);
  };

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <Button title="upload image" onPress={onPress} />
    </>
  );
}

export default App;
