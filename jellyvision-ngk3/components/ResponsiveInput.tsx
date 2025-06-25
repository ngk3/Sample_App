import React from 'react';
import { TextInput, StyleSheet, View, useWindowDimensions, NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

interface ResponsiveInputProps {
    placeholder: string,
    onSubmitEditing: (
        e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
    ) => void;
    value: string;
    onChangeText?: (text: string) => void;
}

const ResponsiveInput = ({ placeholder, onSubmitEditing, value, onChangeText }: ResponsiveInputProps) => {
    const { width } = useWindowDimensions();
    const isSmallScreen = width < 400;

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    { fontSize: isSmallScreen ? 14 : 16, width: width * 0.9 },
                ]}
                placeholder={placeholder}
                placeholderTextColor="black"
                onSubmitEditing={onSubmitEditing}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
});

export default ResponsiveInput;