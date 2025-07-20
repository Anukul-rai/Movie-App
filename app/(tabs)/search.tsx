import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false); // manual fetch

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        refetch();
      } else {
        reset(); // clear results
      }
    }, 500); // debounce input

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <View className="flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies || []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchTerm}
                onChangeText={setSearchTerm} 
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
            {!loading &&
              !error &&
              movies?.length === 0 &&
              searchTerm.trim() && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-accent">{searchTerm}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default Search;
