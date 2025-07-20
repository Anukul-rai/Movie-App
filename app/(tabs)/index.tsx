import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";



export default function App() {
  const router =useRouter()

  const { 
    data:movies,
    loading:moviesLoading,
    error:moviesError
    } =useFetch(()=> 
      fetchMovies({query:''})
    )
    console.log("Fetched movies:", movies);

  return (
    <View className="flex-1  bg-primary">
      <Image
      source={images.bg}
      className="absolute w-full z-0"/>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
        minHeight:'100%', paddingBottom:10
      }}>
        <Image
        source={icons.logo}
        className="w-12 h-10 mt-20 mx-auto mb-5"/>

        { moviesLoading ? (
          <ActivityIndicator
          size={'large'}
          color="#0000ff"
          className="mt-10 self-center"/>
        ): moviesError ? (
          <Text className="text-red-500 text-center mt-10">
            {moviesError?.message}
          </Text>
        ):(
        <View className="flex-1 mt-2">
          <SearchBar
            value=""
            onChangeText={() => {}}
            onPress={()=> router.push('/search')}
            placeholder='Search for movies, series, and more...'
          />
          <>
          <Text className="text-lg text-white font-bold mt-5 mb-3 ">Latest Movies</Text>
          <FlatList
            data={movies}
            renderItem={({item})=>(
            <MovieCard
                {...item}
            />
          )}
            keyExtractor={(item)=> item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              marginBottom: 10,
              gap:20,
              }}
          />
          </>
        </View>
        )}
      </ScrollView>

    </View>
  );
}