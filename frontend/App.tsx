/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {launchImageLibrary} from 'react-native-image-picker';
import {ImagePickerResponse} from 'react-native-image-picker';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
    // asset.uri = "file:///Users/shima/Downloads/dalle.png"
    console.log('result.assets[0].uri: ', result.assets[0].uri);
    const blobPromise = (await fetch(asset.uri as string)).blob();
    let blob = await blobPromise;

    console.log('blob: ', blob);

    const formData = new FormData();
    // const blobURL = URL.createObjectURL(blob)
    let file = new File([blob], asset.uri, {
      type: asset.type as string,
      lastModified: new Date().getTime(), // ファイルの最終更新時間
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
	console.log(blob)

	console.log('response:', response);
  };

  return (
    <>
      <SafeAreaView style={backgroundStyle}></SafeAreaView>
      <Button title="upload image" onPress={onPress} />
    </>
  );
}

export default App;
