import React from 'react';
import {Button, SafeAreaView} from 'react-native';

import {launchImageLibrary, ImagePickerResponse} from 'react-native-image-picker';

const correctMode = true;

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
    console.log('asset.uri: ', asset.uri);

    const blob = await (await fetch(asset.uri as string)).blob();
    console.log('blob.size: ', blob.size);

    const formData = new FormData();

    if (correctMode) {
        // correct file size
        formData.append('file', {
                name: asset.fileName!,
                uri: asset.uri!,
            }
        );
    } else {
        // file size 0 
        let file = new File(
            [blob],
            asset.fileName!, 
            {
                type: asset.type as string,
                lastModified: new Date().getTime(),
            }
        );
        formData.append('file', file);
    }

    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
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
