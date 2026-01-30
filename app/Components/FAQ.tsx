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

  // FAQ States
  const [showFaq1, setShowFaq1] = useState(false);
  const [showFaq2, setShowFaq2] = useState(false);
  const [showFaq3, setShowFaq3] = useState(false);
  const [showFaq4, setShowFaq4] = useState(false);
  const [showFaq5, setShowFaq5] = useState(false);
  const [showFaq6, setShowFaq6] = useState(false);
  const [showFaq7, setShowFaq7] = useState(false);
  const [showFaq8, setShowFaq8] = useState(false);
  const [showFaq9, setShowFaq9] = useState(false);
  const [showFaq10, setShowFaq10] = useState(false);

  return (
    <ScrollView style={[CSS.FAQContainer]}>
      {/* Back Button */}
      <Pressable onPress={BackHome} style={[CSS.BackBox]}>
        <Image
          style={[CSS.FaqBackIcon]}
          source={require("@/assets/images/icons/back.png")}
        />
        <Text style={[CSS.FaqBackTxt]}>BACK</Text>
      </Pressable>

      {/* Title */}
      <View style={[CSS.FaqTittleBar]}>
        <Image
          style={[CSS.FaqTittleIcon]}
          source={require("@/assets/images/icons/faq.png")}
        />
        <Text style={[CSS.FaqTittleMainTxt]}>FAQ</Text>
      </View>

      <View style={[CSS.Faqs]}>
        {/* FAQ 1 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq1((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>How does App Request work?</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq1 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq1 && (
            <Text style={[CSS.FAQAns]}>
              App Request allows you to submit your app or website idea, after careful review the developer will approve your request (or may reject). After approval and confirming upfront payment, the
              development begins and you can track progress, receive updates,
              and communicate with the developer throughout the project.
            </Text>
          )}
        </View>

        {/* FAQ 2 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq2((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>
                Is the displayed price final?
              </Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq2 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq2 && (
            <Text style={[CSS.FAQAns]}>
              No. The price shown during submission is only an estimate based on
              your selected features. After reviewing the full project scope,
              complexity, and timeline, the final price may increase or
              decrease white taking your specified budget into consideration. 
            </Text>
          )}
        </View>

        {/* FAQ 3 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq3((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>When do I make payments?</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq3 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq3 && (
            <Text style={[CSS.FAQAns]}>
              Payments are divided into three stages. You pay 20% after
              approval/review, 30% in mid development progress, and the remaining 50% when
              the project is completed.
            </Text>
          )}
        </View>

        {/* FAQ 4 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq4((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>Can I cancel my project?</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq4 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq4 && (
            <Text style={[CSS.FAQAns]}>
              Yes. You may cancel your project at any time. Refunds depend on
              the development phase. Full refunds are available in Phase 1 (early development),
              while phases 2 and 3 include minor service deductions.
            </Text>
          )}
        </View>

        {/* FAQ 5 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq5((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>
                How will I receive updates?
              </Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq5 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq5 && (
            <Text style={[CSS.FAQAns]}>
              You will receive regular progress reports through the app and via
              agreed communication channels such as email or WhatsApp. This
              helps you stay informed at every stage.
            </Text>
          )}
        </View>

        {/* FAQ 6 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq6((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>
                What happens if there are delays?
              </Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq6 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq6 && (
            <Text style={[CSS.FAQAns]}>
              Delays may occur due to a variety of unforeseen circumstances. In such cases, deadlines
              may be extended and you will be informed in advance.
            </Text>
          )}
        </View>

        {/* FAQ 7 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq7((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>
                Who owns the final project?
              </Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq7 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq7 && (
            <Text style={[CSS.FAQAns]}>
              After all payments are completed, full ownership of the source
              code, designs, and final application is transferred to you.
            </Text>
          )}
        </View>

        {/* FAQ 8 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq8((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>Can I request changes?</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq8 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq8 && (
            <Text style={[CSS.FAQAns]}>
              Yes. You are allowed to request a limited number of reasonable
              changes during development at no extra cost. Major changes may
              require additional fees.
            </Text>
          )}
        </View>

        {/* FAQ 9 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq9((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>Do you offer maintenance?</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq9 ? { transform: [{ rotateZ: "180deg" }] } : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq9 && (
            <Text style={[CSS.FAQAns]}>
              After project
              completion maintenance is available. These may include bug fixes, updates, and feature
              improvements at a fixed monthly fee.
            </Text>
          )}
        </View>

        {/* FAQ 10 */}
        <View style={[CSS.FAQItem]}>
          <Pressable onPress={() => setShowFaq10((x) => !x)}>
            <View style={[CSS.FaqTittleBox]}>
              <Text style={[CSS.FaqTittleTxt]}>Is my data secure?</Text>
              <Image
                style={[
                  CSS.dropIcon,
                  showFaq10
                    ? { transform: [{ rotateZ: "180deg" }] }
                    : undefined,
                ]}
                source={require("@/assets/images/icons/drop.png")}
              />
            </View>
          </Pressable>

          {showFaq10 && (
            <Text style={[CSS.FAQAns]}>
              We use reasonable security measures to protect your account and
              project data. Your information is never shared without permission,
              except where required by law.
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
