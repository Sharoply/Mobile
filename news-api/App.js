import React,{useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

import axios from 'axios';

const fetchNews = async () => {
  const BASE_URL = 
    'https://newsapi.org/v2/top-headlines?country=jp&apiKey=181199859d994ba2b37b60d8678a052a';
  try {
    // fetch
    // const response = await fetch(BASE_URL)
    // const data = await response.json()

    // if(response.status != 200){throw new Error(data.message)}
    //return data.articles

    //axios
    const response = await axios.get(BASE_URL);
    return response.data.articles;
  } catch (error) {
    console.error('Error Fetching News', error.message);
    throw error;
  }
}

export default function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsArticle = await fetchNews()
        setArticles(newsArticle)
      } catch (err) {
        setError(err.message)
      }
    }
    loadNews();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={item => item.url}
        renderItem={({item}) => (
          <View>
            <Text style ={{
              fontSize:18,
              fontWeight:'bold',
              backgroundColor: '#757575',
              padding:5,
              }}>{item.title}</Text>
            <Image style = {styles.image}
              source={{uri : item.urlToImage}}/>
            <Text style = {{
              fontStyle:'italic',
              color:'#424242',
              alignSelf:'flex-end',
              paddingRight:60,
              marginBottom:5,
              }}>{item.author}</Text>
            <Text style ={{marginBottom: 5,}}>{item.description}</Text>
          </View>
        )}
      />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efe5e5',
    padding: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image:{
    width: 250,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom:2,
  },
});
