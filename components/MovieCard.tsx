import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons';

const MovieCard = ({id ,poster_path,overview,title,vote_average,release_date,original_language}:Movie) => {
    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://via.placeholder.com/600x400/1a1a1a/ffffff.png';

    return (
        <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className="w-[30%] -mx-0.5">
            <Image
            source={{ uri: imageUrl }}
            className="w-full h-48 rounded-lg mb-2"
            resizeMode="cover"
            />
            <Text className="text-sm text-white font-bold" numberOfLines={1}>{title}</Text>
            <View className='flex-row items-center justify-start gap-x-1'>
                <Image source={icons.star} className='size-4'/>
                <Text className='text-xs text-white font-bold uppercase'>{Math.round(vote_average)}</Text>
            </View>
            <View className='flex-row items-center justify-between '>
                <Text className='text-xs text-light-300 mt-1'>{release_date?.split('-')[0]}</Text>
                {/* <Text className='text-xs font-medium text-light-300 uppercase'>movie</Text> */}
                <Text className='text-xs font-medium text-light-300 uppercase'>{original_language}</Text>
            </View>
            <View className='mx-1'>
                <Text className='text-xs text-light-200 mt-1' numberOfLines={2}>{overview}</Text>
            </View>
        </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
