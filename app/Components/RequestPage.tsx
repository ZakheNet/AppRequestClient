import RatesPage, { RatesType } from "@/app/Components/RatesPage";
import CSS from "@/app/CSS";
import { ActivityType, Android, Steps } from "@/app/index";
import { useEffect, useState } from "react";
import GoodResult from "@/app/Components/GoodResult";
import { TypeResult } from "@/app/Components/GoodResult";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
const CheckedIcon = require("@/assets/images/CheckedS.png");
const UnCheckedIcon = require("@/assets/images/UncheckedS.png");

const descriptionIcon = require("@/assets/images/icons/description.png");
const completeIcon = require("@/assets/images/icons/complete.png");
const deadlineIcon = require("@/assets/images/icons/deadline.png");
const featureIcon = require("@/assets/images/icons/feature.png");
const categoryIcon = require("@/assets/images/icons/category.png");
const typeIcon = require("@/assets/images/icons/type.png");
const commsIcon = require("@/assets/images/icons/communication.png");
const pointIcon = require("@/assets/images/icons/pointCheck.png");

const icons = [
  typeIcon,
  categoryIcon,
  descriptionIcon,
  featureIcon,
  deadlineIcon,
  commsIcon,
  completeIcon,
];

export default function Request({
  User,
  Rates,
  onStep,
  setOnStep,
  setActivity,
}: {
  Rates: RatesType;
  User: any;
  onStep: number;
  setOnStep: (x: number) => void;
  setActivity: (x: ActivityType) => void;
}) {
  const [canNext, setCanNext] = useState(false);
  const [QzContacts, setQzContacts] = useState({
    email: User.email,
    whatsapp: "",
    otherName: "",
    otherLink: "",
  });
  const [Fee, setFee] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [QzDescription, setQzDescription] = useState("");
  const [Results, setResults] = useState(TypeResult.none);
  const [QzFeatures, setQzFeatures] = useState({
    auth: false,
    database: false,
    IAP: false,
    maintanance: false,
    deployment: false,
    domain: false,
    server: false,
    emails: false,
  });
  const [QzDeadline, setQzDeadline] = useState<
    "none" | "3 Days" | "1 Week" | "2 Weeks" | "4 Weeks" | "2 Months"
  >("none");
  const [QzType, setQzType] = useState<"app" | "website" | "both" | "none">(
    "none"
  );

  const [QzName, setQzName] = useState("");
  const [Submiting, setSubmiting] = useState(false);
  const [SubmitBudget, setSubmitBudget] = useState("");
  const [SubmitError, setSubmitError] = useState("");

  const [QzCategory, setQzCategory] = useState<
    | "none"
    | "blog"
    | "game"
    | "management"
    | "tool"
    | "portfolio"
    | "other"
    | "landingPage"
    | "figmaPSDtoCode"
    | "educational"
    | "business"
  >("none");

  function GoBack() {
    if (onStep > 0) {
      setOnStep(onStep - 1);
    }
    setCanSubmit(false);
    setSubmitError("");
  }

  function GoNext() {
    if (onStep < Steps.length - 1 && canNext) {
      setOnStep(onStep + 1);
    }

    if (onStep === Steps.length - 2) {
      setTimeout(() => {
        setCanSubmit(true);
      }, 1500);
    }
  }

  async function GoSubmit() {
    try {
      setSubmiting(true);
      setSubmitError("");
      function emailFix(text: string) {
        return (text || "").toLowerCase().replace(/\s+/g, "");
      }
      function GetCategoryName() {
        switch (QzCategory) {
          case "blog":
            return "Blog";
          case "business":
            return "Business";
          case "educational":
            return "Educational";
          case "game":
            return "Game";
          case "figmaPSDtoCode":
            return "Translate Design";
          case "management":
            return "Management";
          case "landingPage":
            return "Landing Page";
          case "other":
            return "Other";
          case "portfolio":
            return "Portfolio";
          case "tool":
            return "Tool";
          case "none":
            return "None";
          default:
            return "Other";
        }
      }

      const newSubmittion = {
        task: "sendRequest",
        from: emailFix(User.email),
        password: User.password,
        username:User.username,
        deadline:
          QzDeadline === "3 Days"
            ? "3"
            : QzDeadline === "1 Week"
            ? "7"
            : QzDeadline === "2 Weeks"
            ? "14"
            : QzDeadline === "4 Weeks"
            ? "30"
            : "60",
        budget: SubmitBudget,
        fee: Fee,
        features: `${QzFeatures.auth ? "Auth" : ""}-${
          QzFeatures.IAP ? "In App Purchase" : ""
        }-${QzFeatures.server ? "Server" : ""}-${
          QzFeatures.database ? "Database" : ""
        }-${QzFeatures.emails ? "Email System" : ""}-${
          QzFeatures.deployment ? "Deploy" : ""
        }-${QzFeatures.domain ? "Domain Name" : ""}-${
          QzFeatures.maintanance ? "Maintanance" : ""
        }`,
        appName: QzName,
        projectType: QzType === "both" ? "Native" : QzType,
        description: QzDescription,
        category: GetCategoryName(),
        contactEmail: QzContacts.email,
        contactWhatsApp: QzContacts.whatsapp,
        contactOtherName: QzContacts.otherName,
        contactOtherLink: QzContacts.otherLink,
      };

      const res: any = await fetch(
        "https://apprequestserver.netlify.app/.netlify/functions/request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSubmittion),
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        console.log(data.reason);
        if (data.state === "good") {
          setResults(TypeResult.requested);
        } else if (data.state === "bad") {
          setSubmitError(data.reason);
        }
      } else {
        setSubmitError("Submission failed, please try again later");
      }
    } catch (error) {
      setSubmitError("Submission failed, please try again later");
    } finally {
      setSubmiting(false);
    }
  }

  useEffect(() => {
    switch (onStep) {
      case 0:
        setCanNext(QzType !== "none" && QzName !== "");
        break;
      case 1:
        setCanNext(QzCategory !== "none");
        break;
      case 2:
        setCanNext(QzDescription !== "");
        break;
      case 3:
        setCanNext(true);
        break;
      case 4:
        setCanNext(QzDeadline !== "none");
        break;
      case 5:
        setCanNext(
          QzContacts.email.length > 4 ||
            QzContacts.whatsapp.length > 9 ||
            (QzContacts.otherLink.length > 0 && QzContacts.otherName.length > 0)
        );
        break;

      default:
        setCanNext(false);
        break;
    }
  }, [
    QzName,
    QzType,
    QzCategory,
    QzDescription,
    onStep,
    canNext,
    QzDeadline,
    QzContacts,
  ]);

  useEffect(() => {
    ProcessFee();
    async function ProcessFee() {
      let amount: number = 0.0;
      amount =
        QzType === "app"
          ? Rates.app.other
          : QzType === "website"
          ? Rates.web.other
          : QzType === "both"
          ? Rates.both.other
          : 0;
      /* "none"
    | "blog"
    | "game"
    | "management"
    | "tool"
    | "portfolio"
    | "other"
    | "landingPage"
    | "figmaPSDtoCode"
    | "educational"
    | "business" */
      if (QzCategory === "other") {
        amount = 0;
      }
      if (QzType === "app") {
        switch (QzCategory) {
          case "tool":
            amount = Rates.app.tool;
            break;
          case "management":
            amount = Rates.app.management;
            break;
          case "business":
            amount = Rates.app.business;
            break;
          case "educational":
            amount = Rates.app.educational;
            break;
          case "game":
            amount = Rates.app.game;
            break;
          case "other":
            amount = Rates.app.other;
            break;
          default:
            break;
        }
      }
      if (QzType === "website") {
        switch (QzCategory) {
          case "landingPage":
            amount = Rates.web.landingPage;
            break;
          case "management":
            amount = Rates.web.management;
            break;
          case "business":
            amount = Rates.web.business;
            break;
          case "educational":
            amount = Rates.web.educational;
            break;
          case "game":
            amount = Rates.web.game;
            break;
          case "blog":
            amount = Rates.web.blog;
            break;
          case "portfolio":
            amount = Rates.web.portfolio;
            break;
          case "figmaPSDtoCode":
            amount = Rates.web.designToWeb;
            break;
          case "other":
            amount = Rates.web.other;
            break;
          default:
            break;
        }
      }
      if (QzType === "both") {
        switch (QzCategory) {
          case "tool":
            amount = Rates.both.tool;
            break;
          case "management":
            amount = Rates.both.management;
            break;
          case "business":
            amount = Rates.both.business;
            break;
          case "educational":
            amount = Rates.both.educational;
            break;
          case "game":
            amount = Rates.both.game;
            break;
          case "other":
            amount = Rates.both.other;
            break;
          default:
            break;
        }
      }

      if (QzFeatures.auth) {
        amount += Rates.features.authentication;
      }
      if (QzFeatures.IAP) {
        amount += Rates.features.IAP;
      }
      if (QzFeatures.database) {
        amount += Rates.features.database;
      }
      if (QzFeatures.deployment) {
        amount += Rates.features.deployment;
      }
      if (QzFeatures.domain) {
        amount += Rates.features.domain;
      }
      if (QzFeatures.emails) {
        amount += Rates.features.emails;
      }
      if (QzFeatures.maintanance) {
        amount += Rates.features.maintanance;
      }
      if (QzFeatures.server) {
        amount += Rates.features.server;
      }

      switch (QzDeadline) {
        case "3 Days":
          amount += Rates.deadline.threedays;
          break;
        case "1 Week":
          amount += Rates.deadline.oneWeek;
          break;
        case "2 Weeks":
          amount += Rates.deadline.twoWeeks;
          break;
        case "4 Weeks":
          amount += Rates.deadline.fourWeeks;
          break;
        case "2 Months":
          amount += Rates.deadline.twoMonths;
          break;
        default:
          break;
      }

      setFee(amount);
    }
  }, [QzType, QzCategory, QzFeatures, QzDeadline]);

  function BackHome() {
    setActivity(ActivityType.Home);
  }

  function QuizType() {
    return (
      <ScrollView style={CSS.ContentBox}>
        <Text
          style={[
            CSS.Text,
            {
              textDecorationLine: "underline",
            },
          ]}
        >
          {QzType === "app"
            ? "APP"
            : QzType === "website"
            ? "WEBSITE"
            : "PROJECT"}{" "}
          NAME?
        </Text>

        <TextInput
          defaultValue={QzName === "" ? undefined : QzName}
          onChangeText={(text) => {
            setQzName(text);
          }}
          placeholder="Name of your app/website"
          placeholderTextColor={"silver"}
          maxLength={35}
          style={[CSS.AuthInputTxt, { margin: 5, marginBottom: 15 }]}
        />
        <Text
          style={[
            CSS.Text,
            {
              textDecorationLine: "underline",
            },
          ]}
        >
          WHAT TYPE OF PROJECT?
        </Text>
        <View>
          <Pressable
            onPress={() => {
              setQzType("app");
              setQzCategory("none");
            }}
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzType === "app" ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>Android App</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setQzType("website");
              setQzCategory("none");
            }}
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzType === "website" ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>Website</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setQzType("both");
              setQzCategory("none");
            }}
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzType === "both" ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>Both</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  function QuizCategory() {
    return (
      <ScrollView style={CSS.ContentBox}>
        <Text
          style={[
            CSS.Text,
            {
              textDecorationLine: "underline",
            },
          ]}
        >
          {`${
            QzType === "app"
              ? "APP"
              : QzType === "website"
              ? "WEBSITE"
              : "PROJECT"
          } CATEGORY`}
        </Text>

        {QzType === "app" ? (
          <View>
            <Pressable
              onPress={() => setQzCategory("tool")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "tool" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Tool</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("management")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={
                  QzCategory === "management" ? CheckedIcon : UnCheckedIcon
                }
              />
              <Text style={[CSS.Text]}>Management</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("business")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "business" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Business</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("educational")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={
                  QzCategory === "educational" ? CheckedIcon : UnCheckedIcon
                }
              />
              <Text style={[CSS.Text]}>Educational</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("game")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "game" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Game</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("other")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "other" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Other</Text>
            </Pressable>
          </View>
        ) : QzType === "website" ? (
          <View>
            <Pressable
              onPress={() => setQzCategory("landingPage")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={
                  QzCategory === "landingPage" ? CheckedIcon : UnCheckedIcon
                }
              />
              <Text style={[CSS.Text]}>Landing Page</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("blog")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "blog" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Blog</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("business")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "business" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Business</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("educational")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={
                  QzCategory === "educational" ? CheckedIcon : UnCheckedIcon
                }
              />
              <Text style={[CSS.Text]}>Educational</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("game")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "game" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Game</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("portfolio")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={
                  QzCategory === "portfolio" ? CheckedIcon : UnCheckedIcon
                }
              />
              <Text style={[CSS.Text]}>Portfolio</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("figmaPSDtoCode")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={
                  QzCategory === "figmaPSDtoCode" ? CheckedIcon : UnCheckedIcon
                }
              />
              <Text style={[CSS.Text]}>Figma/PSD to Website</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("tool")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "tool" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Management</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("other")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "other" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Other</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Pressable
              onPress={() => setQzCategory("tool")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "tool" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Tool</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("management")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={
                  QzCategory === "management" ? CheckedIcon : UnCheckedIcon
                }
              />
              <Text style={[CSS.Text]}>Management</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("business")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "business" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Business</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("educational")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={
                  QzCategory === "educational" ? CheckedIcon : UnCheckedIcon
                }
              />
              <Text style={[CSS.Text]}>Educational</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("game")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "game" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Game</Text>
            </Pressable>
            <Pressable
              onPress={() => setQzCategory("other")}
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzCategory === "other" ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>Other</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    );
  }

  function QuizDescription() {
    return (
      <KeyboardAvoidingView style={[{ flex: 1 }]} behavior="height">
        <View style={CSS.ContentBox}>
          <Text
            style={[
              CSS.Text,
              {
                textDecorationLine: "underline",
              },
            ]}
          >
            {`${
              QzType === "app"
                ? "APP"
                : QzType === "website"
                ? "WEBSITE"
                : "PROJECT"
            } DESCRIPTION`}
          </Text>
          <View>
            <Text style={[CSS.Text]}>
              Give a full and well detailed description for this{" "}
              {QzType === "both" ? "project" : QzType}:
            </Text>
            <TextInput
              defaultValue={QzDescription === "" ? undefined : QzDescription}
              onChangeText={(text) => setQzDescription(text)}
              multiline
              placeholder={` Write the description for your ${
                QzType === "both" ? "project" : QzType
              }...`}
              placeholderTextColor={"silver"}
              textAlignVertical="top"
              style={[
                CSS.DescriptionInput,
                Platform.OS === "web"
                  ? { height: Dimensions.get("window").height * 0.5 }
                  : undefined,
              ]}
            />
            {/*  <Text style={[CSS.Text,{marginTop:17}]}>Notes for developer:</Text>
        <TextInput multiline placeholder="Optional... " placeholderTextColor={"silver"}  style={[CSS.AdditionalInput]}/> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  function QuizFeatures() {
    return (
      <ScrollView style={CSS.ContentBox}>
        <Text
          style={[
            CSS.Text,
            {
              textDecorationLine: "underline",
            },
          ]}
        >
          {/* `${
            QzType === "app"
              ? "APP"
              : QzType === "website"
              ? "WEBSITE"
              : "PROJECT"
          } FEATURES` */}
          FEATURES / SERVICES
        </Text>
        <View>
          <Pressable
            onPress={() =>
              setQzFeatures({ ...QzFeatures, auth: !QzFeatures.auth })
            }
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzFeatures.auth ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>Authentication</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setQzFeatures({ ...QzFeatures, server: !QzFeatures.server })
            }
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzFeatures.server ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>{"Server (Backend)"}</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setQzFeatures({ ...QzFeatures, database: !QzFeatures.database })
            }
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzFeatures.database ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>{"Database"}</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              setQzFeatures({
                ...QzFeatures,
                deployment: !QzFeatures.deployment,
              })
            }
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzFeatures.deployment ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>
              {QzType === "app"
                ? "Publish to PlayStore"
                : QzType === "website"
                ? "Deploy for me"
                : "Deploy for me"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              setQzFeatures({ ...QzFeatures, emails: !QzFeatures.emails })
            }
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzFeatures.emails ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>Emails to users</Text>
          </Pressable>

          {QzType === "app" ? undefined : QzFeatures.deployment? (
            <Pressable
              onPress={() =>
                setQzFeatures({ ...QzFeatures, domain: !QzFeatures.domain })
              }
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzFeatures.domain ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>{"Website name (Domain)"}</Text>
            </Pressable>
          ):undefined}
          {QzType === "website" ? undefined : (
            <Pressable
              onPress={() =>
                setQzFeatures({ ...QzFeatures, IAP: !QzFeatures.IAP })
              }
              style={[CSS.RowView]}
            >
              <Image
                style={[CSS.quizCheckIcon]}
                source={QzFeatures.IAP ? CheckedIcon : UnCheckedIcon}
              />
              <Text style={[CSS.Text]}>{"In-App-Purchase (IAP)"}</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() =>
              setQzFeatures({
                ...QzFeatures,
                maintanance: !QzFeatures.maintanance,
              })
            }
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzFeatures.maintanance ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>Maintanance</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  function QuizDeadline() {
    return (
      <ScrollView style={CSS.ContentBox}>
        <Text
          style={[
            CSS.Text,
            {
              textDecorationLine: "underline",
            },
          ]}
        >
          DEADLINE?
        </Text>
        <View>
          <Pressable
            onPress={() => setQzDeadline("3 Days")}
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzDeadline === "3 Days" ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>3 Days</Text>
          </Pressable>
          <Pressable
            onPress={() => setQzDeadline("1 Week")}
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzDeadline === "1 Week" ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>1 Week</Text>
          </Pressable>
          <Pressable
            onPress={() => setQzDeadline("2 Weeks")}
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzDeadline === "2 Weeks" ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>2 Weeks</Text>
          </Pressable>
          <Pressable
            onPress={() => setQzDeadline("4 Weeks")}
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzDeadline === "4 Weeks" ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>4 Weeks</Text>
          </Pressable>
          <Pressable
            onPress={() => setQzDeadline("2 Months")}
            style={[CSS.RowView]}
          >
            <Image
              style={[CSS.quizCheckIcon]}
              source={QzDeadline === "2 Months" ? CheckedIcon : UnCheckedIcon}
            />
            <Text style={[CSS.Text]}>2 Months</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  function QuizContacts() {
    return (
      <ScrollView style={CSS.ContentBox}>
        <Text
          style={[
            CSS.Text,
            {
              textDecorationLine: "underline",
            },
          ]}
        >
          CONTACTS?
        </Text>
        <View>
          <View style={[CSS.contactItem]}>
            <Text style={[CSS.Text]}>Email:</Text>
            <TextInput
              defaultValue={
                QzContacts.email === "" ? User.email : QzContacts.email
              }
              onChangeText={(text) => {
                setQzContacts({ ...QzContacts, email: text });
              }}
              placeholderTextColor={"silver"}
              inputMode="email"
              placeholder={"example@email.com"}
              maxLength={40}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.contactItem]}>
            <Text style={[CSS.Text]}>WhatsApp:</Text>
            <TextInput
              defaultValue={
                QzContacts.whatsapp === "" ? undefined : QzContacts.whatsapp
              }
              onChangeText={(text) => {
                setQzContacts({ ...QzContacts, whatsapp: text });
              }}
              placeholderTextColor={"silver"}
              placeholder={"+01 999 999 999"}
              maxLength={20}
              style={[CSS.AuthInputTxt]}
            />
          </View>

          <View style={[CSS.contactItem]}>
            <Text style={[CSS.Text]}>Other:</Text>
            <TextInput
              defaultValue={
                QzContacts.otherName === "" ? undefined : QzContacts.otherName
              }
              onChangeText={(text) => {
                setQzContacts({ ...QzContacts, otherName: text });
              }}
              placeholderTextColor={"silver"}
              placeholder={"eg: Telegram"}
              maxLength={20}
              style={[CSS.AuthInputTxt, { marginBottom: 10 }]}
            />
            <TextInput
              defaultValue={
                QzContacts.otherLink === "" ? undefined : QzContacts.email
              }
              onChangeText={(text) => {
                setQzContacts({ ...QzContacts, otherLink: text });
              }}
              placeholderTextColor={"silver"}
              placeholder={"Link/Number/Handle"}
              maxLength={20}
              style={[CSS.AuthInputTxt]}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  function QuizSubmit() {
    const [linesDescription, setLinesDescription] = useState(3);

    return (
      <ScrollView style={CSS.ContentBox}>
        <Text
          style={[
            CSS.Text,
            {
              textDecorationLine: "underline",
            },
          ]}
        >
          SUBMIT REQUEST
        </Text>
        <View>
          <View style={[CSS.RowView]}>
            <Image style={[CSS.quizPointIcon]} source={pointIcon} />
            <Text style={[CSS.Text]}>Name: {QzName}</Text>
          </View>
          <View style={[CSS.RowView]}>
            <Image style={[CSS.quizPointIcon]} source={pointIcon} />
            <Text style={[CSS.Text]}>
              {QzType === "app"
                ? "Android App"
                : QzType === "website"
                ? "Website"
                : "Android App & Website"}
            </Text>
          </View>
          <View style={[CSS.RowView]}>
            <Image style={[CSS.quizPointIcon]} source={pointIcon} />
            <Text style={[CSS.Text]}>Category: {QzCategory.toUpperCase()}</Text>
          </View>
          <View style={[CSS.RowView]}>
            <View style={[{ borderWidth: 1, padding: 5 }]}>
              <Text style={[CSS.Text]}>Features:</Text>
              <View style={[CSS.submitFeaturesBox]}>
                {QzFeatures.auth ? (
                  <View style={[CSS.RowView]}>
                    <Image
                      style={[CSS.quizPointFeatureIcon]}
                      source={pointIcon}
                    />
                    <Text style={[CSS.Text]}>Authentication</Text>
                  </View>
                ) : undefined}

                {QzFeatures.server ? (
                  <View style={[CSS.RowView]}>
                    <Image
                      style={[CSS.quizPointFeatureIcon]}
                      source={pointIcon}
                    />
                    <Text style={[CSS.Text]}>{"Server (Backend)"}</Text>
                  </View>
                ) : undefined}

                {QzFeatures.database ? (
                  <View style={[CSS.RowView]}>
                    <Image
                      style={[CSS.quizPointFeatureIcon]}
                      source={pointIcon}
                    />
                    <Text style={[CSS.Text]}>Database</Text>
                  </View>
                ) : undefined}

                {QzFeatures.IAP ? (
                  <View style={[CSS.RowView]}>
                    <Image
                      style={[CSS.quizPointFeatureIcon]}
                      source={pointIcon}
                    />
                    <Text style={[CSS.Text]}>In-App-Purchase</Text>
                  </View>
                ) : undefined}

                {QzFeatures.emails ? (
                  <View style={[CSS.RowView]}>
                    <Image
                      style={[CSS.quizPointFeatureIcon]}
                      source={pointIcon}
                    />
                    <Text style={[CSS.Text]}>Emails to Users</Text>
                  </View>
                ) : undefined}

                {QzFeatures.deployment ? (
                  <View style={[CSS.RowView]}>
                    <Image
                      style={[CSS.quizPointFeatureIcon]}
                      source={pointIcon}
                    />
                    <Text style={[CSS.Text]}>
                      {QzType === "app"
                        ? "Publish to PlayStore"
                        : QzType === "website"
                        ? "Deploy to web"
                        : "Deploy and Publish"}
                    </Text>
                  </View>
                ) : undefined}

                {QzFeatures.domain ? (
                  <View style={[CSS.RowView]}>
                    <Image
                      style={[CSS.quizPointFeatureIcon]}
                      source={pointIcon}
                    />
                    <Text style={[CSS.Text]}>Domain (Website name)</Text>
                  </View>
                ) : undefined}

                {QzFeatures.maintanance ? (
                  <View style={[CSS.RowView]}>
                    <Image
                      style={[CSS.quizPointFeatureIcon]}
                      source={pointIcon}
                    />
                    <Text style={[CSS.Text]}>Maintanance</Text>
                  </View>
                ) : undefined}
              </View>
              {QzFeatures.IAP ||
              QzFeatures.auth ||
              QzFeatures.database ||
              QzFeatures.deployment ||
              QzFeatures.domain ||
              QzFeatures.emails ||
              QzFeatures.maintanance ||
              QzFeatures.server ? undefined : (
                <Text style={[{ fontSize: 20 }]}>--None--</Text>
              )}
            </View>
          </View>
          <View style={[CSS.RowView]}>
            <Image style={[CSS.quizPointIcon]} source={pointIcon} />
            <Text style={[CSS.Text]}>Deadline: {QzDeadline.toUpperCase()}</Text>
          </View>
          <View>
            <View style={[CSS.RowView]}>
              <Image style={[CSS.quizPointIcon]} source={pointIcon} />
              <Text style={[CSS.Text]}>Description:</Text>
            </View>
            <Pressable
              onPress={() => {
                if (linesDescription === 0) {
                  setLinesDescription(3);
                } else {
                  setLinesDescription(0);
                }
              }}
            >
              <Text style={[CSS.showDescription]}>
                {linesDescription === 0
                  ? "Hide description"
                  : "Show full description"}
              </Text>
            </Pressable>
            <ScrollView nestedScrollEnabled={true}>
              <Text
                numberOfLines={linesDescription}
                style={[CSS.Text, CSS.subDescriptionText]}
              >
                {QzDescription}
              </Text>
            </ScrollView>
          </View>
          <View style={[{ borderWidth: 1, marginTop: 5, padding: 3 }]}>
            <Text style={[CSS.Text]}>Contacts</Text>
            {QzContacts.email === "" ? undefined : (
              <View style={[CSS.RowView]}>
                <Image style={[CSS.quizPointIcon]} source={pointIcon} />
                <Text style={[CSS.Text]}>Email: {QzContacts.email}</Text>
              </View>
            )}
            {QzContacts.whatsapp === "" ? undefined : (
              <View style={[CSS.RowView]}>
                <Image style={[CSS.quizPointIcon]} source={pointIcon} />
                <Text style={[CSS.Text]}>WhatsApp: {QzContacts.whatsapp}</Text>
              </View>
            )}
            {QzContacts.otherName !== "" ? (
              <View style={[CSS.RowView]}>
                <Image style={[CSS.quizPointIcon]} source={pointIcon} />
                <Text style={[CSS.Text]}>
                  {QzContacts.otherName}: {QzContacts.otherLink}
                </Text>
              </View>
            ) : undefined}
          </View>
          <View style={[CSS.estimationBox]}>
            <Text style={[CSS.submitTotalTxt]}>TOTAL: ${Fee}</Text>
            <Text style={[CSS.noteEstimationTxt]}>
              NB: This amount is an estimation and not final.
            </Text>
          </View>
          <View style={[CSS.clientBudgetBox]}>
            <Text style={[CSS.Text]}>Your Budget:</Text>
            <TextInput
              defaultValue={SubmitBudget}
              onChangeText={(text) => setSubmitBudget(text)}
              maxLength={15}
              placeholder="Enter your budget"
              placeholderTextColor={"silver"}
              style={[
                CSS.AuthInputTxt,
                { width: Dimensions.get("window").width * 0.5 },
              ]}
            />
            <Text></Text>
            <Text></Text>
          </View>
        </View>
      </ScrollView>
    );
  }

  const Quiz = [
    QuizType(),
    QuizCategory(),
    QuizDescription(),
    QuizFeatures(),
    QuizDeadline(),
    QuizContacts(),
    QuizSubmit(),
  ];

  return (
    <View>
      {Results === TypeResult.none ? undefined : (
        <GoodResult setActivity={setActivity} state={Results} />
      )}
      <View style={[CSS.RowView, { justifyContent: "space-between" }]}>
        <Pressable onPress={BackHome} style={[CSS.BackBox]}>
          <Image
            style={[CSS.FaqBackIcon]}
            source={require("@/assets/images/icons/back.png")}
          />
          <Text style={[CSS.FaqBackTxt]}>BACK</Text>
        </Pressable>
        <View>
          <Text style={[CSS.feeText]}>${Fee.toFixed(2)}</Text>
        </View>
      </View>

      <View style={CSS.QuizBox}>
        <View style={[CSS.RowViewCenter, { marginTop: 11 }]}>
          <Image style={[CSS.requestIcon]} source={icons[onStep]} />
          <Text style={CSS.QzTittle}>{Steps[onStep]}</Text>
        </View>

        {Quiz[onStep]}
        {SubmitError === "" ? undefined : (
          <Text
            style={[
              {
                fontSize: 20,
                color: "red",
                fontWeight: "bold",
                textAlign: "center",
              },
            ]}
          >
            {SubmitError}
          </Text>
        )}

        {!Submiting ? (
          <View style={CSS.QzActionBox}>
            <Pressable onPress={GoBack}>
              <Text
                style={
                  onStep > 0 ? [CSS.QzAction, CSS.QzABack] : CSS.QzActionBlank
                }
              >
                {onStep > 0 ? "BACK" : ""}
              </Text>
            </Pressable>

            {onStep < Steps.length - 1 ? (
              <Pressable onPress={GoNext}>
                <Text
                  style={
                    onStep < Steps.length - 1
                      ? [
                          CSS.QzAction,
                          CSS.QzANext,
                          canNext ? undefined : CSS.NextDisabled,
                        ]
                      : CSS.QzActionBlank
                  }
                >
                  {onStep < Steps.length - 1 ? "NEXT" : ""}
                </Text>
              </Pressable>
            ) : canSubmit ? (
              <Pressable onPress={GoSubmit}>
                <Text
                  style={[
                    CSS.QzAction,
                    CSS.QzANext,
                    { width: 150, backgroundColor: "rgb(86, 170, 69)" },
                  ]}
                >
                  {onStep === Steps.length - 1 ? "SUBMIT" : ""}
                </Text>
              </Pressable>
            ) : (
              <Text style={[CSS.QzActionBlank]}></Text>
            )}
          </View>
        ) : (
          <ActivityIndicator
            color={"green"}
            style={[{ margin: 10 }]}
            size={"large"}
          />
        )}
      </View>
    </View>
  );
}
