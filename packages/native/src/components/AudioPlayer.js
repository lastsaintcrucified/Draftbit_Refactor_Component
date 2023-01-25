import * as React from "react";
import { Text, View, TouchableHighlight, StyleSheet, } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
function formatDuration(duration) {
    if (duration === 0 || duration === 1)
        return "00:00";
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const renderedHours = hours < 10 ? "0" + hours : hours;
    const renderedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const renderedSeconds = seconds < 10 ? "0" + seconds : seconds;
    if (hours > 0) {
        return renderedHours + ":" + renderedMinutes + ":" + renderedSeconds;
    }
    return renderedMinutes + ":" + renderedSeconds;
}
export default function AudioPlayer({ source, style = {}, sliderColor = "black", completedTrackColor = "black", remainingTrackColor = "black", playSize = 24, playColor = "black", }) {
    const [sound, setSound] = React.useState();
    const [playing, setPlay] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [durationMillis, setDurationMillis] = React.useState(1);
    const [isDraggingSlider, setIsDraggingSlider] = React.useState(false);
    const [sliderPositionMillis, setSliderPositionMillis] = React.useState(0);
    const { color, fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, textTransform, textAlign, textDecorationLine, textDecorationColor, textDecorationStyle, ...viewStyles } = StyleSheet.flatten(style || {});
    const textStyles = {
        color,
        fontFamily,
        fontWeight,
        fontSize,
        lineHeight,
        letterSpacing,
        textTransform,
        textAlign,
        textDecorationLine,
        textDecorationColor,
        textDecorationStyle,
    };
    const onPlaybackStatusUpdate = async (status) => {
        if (status.isLoaded) {
            if (durationMillis !== (status === null || status === void 0 ? void 0 : status.durationMillis)) {
                setDurationMillis((status === null || status === void 0 ? void 0 : status.durationMillis) || 1);
            }
            if (status.isPlaying) {
                setSliderPositionMillis(status.positionMillis);
            }
            if (status.didJustFinish) {
                setSound(undefined);
                setPlay(false);
                setSliderPositionMillis(0);
                if (sound) {
                    await sound.unloadAsync();
                }
            }
        }
    };
    const setOnPlaybackStatusUpdate = () => {
        if (sound) {
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }
    };
    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    async function loadAudio() {
        setLoading(true);
        const { sound: s, status } = await Audio.Sound.createAsync(source);
        setSound(s);
        setLoading(false);
        setOnPlaybackStatusUpdate();
        if (status.isLoaded && status.durationMillis) {
            setDurationMillis(status.durationMillis);
        }
        s.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await s.playAsync();
        setPlay(true);
    }
    async function playSound() {
        if (sound && playing) {
            await sound.pauseAsync();
            setPlay(false);
            return;
        }
        if (sound && !playing) {
            await sound.playAsync();
            setPlay(true);
            return;
        }
        await loadAudio();
    }
    const setTrackPosition = async (positionMillis) => {
        if (sound) {
            await sound.setPositionAsync(positionMillis);
        }
    };
    const onSlidingComplete = (sliderValue) => {
        if (isDraggingSlider) {
            setIsDraggingSlider(false);
        }
        setTrackPosition(sliderValue);
    };
    const onSliderChange = () => {
        if (!isDraggingSlider) {
            setIsDraggingSlider(true);
        }
    };
    const iconName = loading ? "loading1" : !sound || !playing ? "play" : "pause";
    return (React.createElement(View, { style: [styles.container, viewStyles] },
        React.createElement(TouchableHighlight, { onPress: playSound, style: { marginRight: 8 } },
            React.createElement(AntDesign, { name: iconName, size: playSize, color: playColor })),
        React.createElement(Text, { style: { marginRight: 8, ...textStyles } },
            formatDuration(sliderPositionMillis !== null && sliderPositionMillis !== void 0 ? sliderPositionMillis : 0),
            " /",
            " ",
            formatDuration(durationMillis || 0)),
        React.createElement(Slider, { style: { flex: 1 }, minimumTrackTintColor: completedTrackColor, maximumTrackTintColor: remainingTrackColor, thumbTintColor: sliderColor, minimumValue: 0, value: sliderPositionMillis, maximumValue: durationMillis, onValueChange: onSliderChange, onSlidingComplete: onSlidingComplete })));
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});
