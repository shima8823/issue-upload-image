import React from 'react';
import {Button, SafeAreaView} from 'react-native';

import {launchImageLibrary, ImagePickerResponse} from 'react-native-image-picker';

function App(): React.JSX.Element {
  const onPress = async () => {
    let result: ImagePickerResponse | undefined;

    result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result === undefined || result.assets === undefined)
      return;

    let asset = result.assets[0];
    console.log('result.assets[0].uri: ', result.assets[0].uri);

    const blob = await (await fetch(asset.uri as string)).blob();
    console.log('blob.size: ', blob.size);

    const formData = new FormData();

    const blobURL = URL.createObjectURL(blob);
    let file = new File([blob], asset.uri, {
      type: asset.type as string,
      lastModified: new Date().getTime(),
    });
    formData.append('file',

        file,
        // name: asset.fileName!,
        // type: asset.type!,
        // uri: asset.uri!,
    );
    

    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!response.ok) {
      console.error('Error:', response);
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
