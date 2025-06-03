import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function UploadScreen() {
  const [message, setMessage] = useState('Welcome to Finance AI 🚀');

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
      });

      if (result.canceled) {
        setMessage('Upload cancelled');
        return;
      }

      const file = result.assets[0];

      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: 'text/csv',
      } as any);

      const response = await axios.post('http://192.168.0.45:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(`Upload success: ${response.data.length} records received`);
    } catch (error) {
      console.error(error);
      setMessage('Upload failed');
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 60 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>{message}</Text>
      <Button title="Upload Bank Statement (CSV)" onPress={handleUpload} />
    </View>
  );
}
