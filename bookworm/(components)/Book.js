import { View } from "react-native"
/* Props:
    title: "",
    subtitle: "",
    author: "",
    description: "",
    coverImage: null,
    genres: [],
    numPages: 0,
*/
// This component is supposed to be used in a modal that slides up from the bottom of the phone screen when a barcode has been detected
// barcode detection should happen only once
export default function Book(props) {
    return (
        <View>
            <Text>
                {props.title}
            </Text>
            <Text>

            </Text>
        </View>
    )
}