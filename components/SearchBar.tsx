import { View, TextInput, Image } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props {
    onPress?: () => void;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
}

const SearchBar = ({onPress, value, onChangeText, placeholder }: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
        <Image
            source={icons.search}
            className="size-5"
            resizeMode="contain"
            tintColor="#ab8bff"
        />
        <TextInput
            onPress={onPress}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#a8b5db"
            className="ml-2 text-white flex-1"
        />
        </View>
    );
};

export default SearchBar;
