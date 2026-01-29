import { View, Text, Image, Pressable, ScrollView } from "react-native";
import CSS from "@/app/CSS";
import { useState } from "react";
import { ActivityType } from "@/app/index";

export default function FAQ({
  setActivity,
}: {
  setActivity: (Activity: ActivityType) => void;
}) {
  function BackHome() {
    setActivity(ActivityType.Home);
  }

  const [showFaq1, setShowFaq1] = useState(false);
  const [showFaq2, setShowFaq2] = useState(false);
  const [showFaq3, setShowFaq3] = useState(false);

  return (
    <ScrollView style={[CSS.FAQContainer]}>
      <Pressable onPress={BackHome} style={[CSS.BackBox]}>
        <Image
          style={[CSS.FaqBackIcon]}
          source={require("@/assets/images/icons/back.png")}
        />
        <Text style={[CSS.FaqBackTxt]}>BACK</Text>
      </Pressable>

      <View style={[CSS.FaqTittleBar]}>
        <Image
          style={[CSS.FaqTittleIcon]}
          source={require("@/assets/images/icons/about.png")}
        />
        <Text style={[CSS.FaqTittleMainTxt]}>ABOUT</Text>
      </View>
      <View style={[CSS.Faqs]}>
        <Text style={[CSS.Text,{padding:15,textAlign:"center"}]}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima consequatur nulla temporibus consequuntur ex, ab minus, laudantium quos repudiandae, non quae esse maxime? Esse totam molestiae vel sint, voluptate facere!
          Sapiente sequi, quas ratione porro sed assumenda cupiditate ducimus aut odit eligendi nesciunt eius tenetur quidem vero molestias deleniti deserunt laboriosam amet unde harum vel non. Eligendi excepturi deserunt iste?
          Ratione tempora maxime ipsa quas culpa esse, iste recusandae a. Sit nisi modi nesciunt est, doloribus officiis veritatis aperiam ex totam excepturi voluptates in expedita nemo saepe, dolorum, possimus voluptate!
          Sunt nisi molestiae id eligendi distinctio consequuntur sed a beatae laudantium nostrum aliquid eius officiis veritatis laboriosam, suscipit commodi odio, rerum debitis? Ratione nostrum iusto sunt, dolorum consequatur quaerat eius.
          Incidunt corporis deleniti itaque sint repellat sed ea facilis asperiores ab possimus sapiente totam eveniet repellendus deserunt, quibusdam iure consectetur commodi odio. Ipsum commodi iusto pariatur nulla doloribus labore delectus!
          Culpa itaque consequuntur sit nostrum sapiente nesciunt quidem, sunt magni saepe nisi dolorum molestias perferendis recusandae rem odit deserunt quia ea repellat praesentium libero perspiciatis incidunt minima rerum! Nobis, alias?
          Laboriosam, voluptatibus! Inventore aspernatur numquam repellendus rem perferendis quas recusandae illo deserunt, odit corrupti eligendi veniam accusamus necessitatibus quo alias illum cupiditate quidem facilis. Minus iusto unde explicabo qui reiciendis?
          Laboriosam eos inventore, pariatur necessitatibus dignissimos molestias neque! Ea eligendi quam laudantium minus ut veritatis, tempora delectus. Eius facere esse sint, quo, qui fuga veniam quidem quasi dicta quos voluptates?
        </Text>
        </View>
    </ScrollView>
  );
}
