import mongoose from "mongoose";

export const SocialSchema = new mongoose.Schema({
    githubUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    facebookUrl: { type: String, default: "" },
});