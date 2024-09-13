import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={"gray"}/>
    </View>
  );
}
