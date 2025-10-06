"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
exports.Constants = {
    public: {
        Enums: {
            conversationType: ["partly", "self", "manager", "exile", "firefighter"],
            conversationTyped: [
                "self",
                "manager",
                "exile",
                "firefighter",
                "vent",
                "partly",
            ],
            feedbackType: ["conversation"],
            insightType: [
                "self",
                "manager",
                "firefighter",
                "exile",
                "noteFromSelf",
                "mixed",
            ],
            journeyTag: ["anger", "anxiety", "confidence", "shame"],
            messageSender: [
                "user",
                "self",
                "exile",
                "manager",
                "firefighter",
                "partly",
            ],
            momentTag: [
                "exile",
                "manager",
                "firefighter",
                "self",
                "regular",
                "reflection",
            ],
            noteColors: ["yellow", "white", "purple", "grey", "green", "red", "blue"],
            parts: ["self", "manager", "firefighter", "exile"],
            progressStatus: ["inProgress", "completed", "unlocked"],
            stepType: [
                "titleFade",
                "cardSwipe",
                "plainText",
                "image",
                "breather",
                "input",
                "quote",
                "answerReveal",
                "showcaseChat",
                "choice",
                "endGain",
            ],
            subscriptionStatus: ["active", "inactive", "trialing"],
        },
    },
};
