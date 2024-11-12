import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, Text, View, ActivityIndicator, Image} from 'react-native';


import postData from './data.json';

export default function App() {
  const [postlist, setPostlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(5);
  
  const getImageSource = (imagePath) => {
    switch(imagePath) {
      case './assets/facebook.png':
        return require('./assets/facebook.png');
      case './assets/instagram.webp':
        return require('./assets/instagram.webp');
      case './assets/youtube.jpg':
        return require('./assets/youtube.jpg');
      case './assets/tiktok.webp':
        return require('./assets/tiktok.webp');
      case './assets/spotify.png':
        return require('./assets/spotify.png');
      case './assets/tandem.png':
        return require('./assets/tandem.png');
      case './assets/telegram.webp':
        return require('./assets/telegram.webp');
      case './assets/gcash.png':
        return require('./assets/gcash.png');
      case './assets/shopee.png':
        return require('./assets/shopee.png');
      case './assets/lazada.jpg':
        return require('./assets/lazada.jpg');
      default:
        return require('./assets/adaptive-icon.png');
    }
  };

  const fetchData = () => {
    setPostlist(postData.slice(0, limit)); 
    setIsLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setLimit(prevLimit => prevLimit + 5 );
    setRefreshing(false);
  }
  

  useEffect(() => {
    fetchData(); 
  }, [limit]); 

  if (isLoading){
    return(
      <SafeAreaView style={styles.loadingCon}>
        <ActivityIndicator size="large" color="#0000ff"/>
        <Text>Loading.....</Text>
      </SafeAreaView>
    )
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postlist}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Image source={getImageSource(item.image)} 
                       style={styles.logo}
                       resizeMode="cover"
                       />
                <Text style={styles.titletxt}>{item.title}</Text>
                <Text style={styles.deftxt}>{item.definition}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 16,
              }}
            />
          )}
          ListEmptyComponent={<Text>No Posts Found</Text>}
          ListHeaderComponent={<Text style={styles.headerText}>Post List</Text>}
          ListFooterComponent={<Text style={styles.footerText}>End of list</Text>}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "hotpink",
    paddingTop: StatusBar.currentHeight,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: "center",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
  },
  footerText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  titletxt: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 10,
  },
  deftxt: {
    fontSize: 22,
    textAlign: "center",
  },
  logo: {
    height: 120,
    width: 120,
  },
  loadingCon: {
    flex: 1,
    backgroundColor: "#F5F5E5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  }
})
