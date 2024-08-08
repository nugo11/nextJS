import axios from 'axios';

const decodeBase64 = (base64Data) => {
  const binaryString = atob(base64Data);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(uint8Array);
};

export default async (req, res) => {
  try {
    const { url } = req.query; 
    const response = await axios.get(url);
    const base64Data = response.data;
    const utf8String = decodeBase64(base64Data);
    const jsonData = JSON.parse(utf8String);

    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Failed to fetch or decode data:', error);
    res.status(500).json({ articles: [], totalPages: 0 });
  }
};
