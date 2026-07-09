import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    // TODO: toggle subscription

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id")
    }

    if (channelId === req.user?._id.toString()) {
        throw new ApiError(400, "You cannot subscribe to your own channel")
    }

    const isSubscribed = await Subscription.findOne({
        subscriber: req.user?._id,
        channel: channelId
    })

    if (isSubscribed) {
        await Subscription.findByIdAndDelete(isSubscribed._id)

        return res
            .status(200)
            .json(new ApiResponse(200, { subscribed: false }, "Unsubscribed successfully"))
    }

    await Subscription.create({
        subscriber: req.user?._id,
        channel: channelId
    })

    return res
        .status(200)
        .json(new ApiResponse(200, { subscribed: true }, "Subscribed successfully"))
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel id")
    }

    const subscribers = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscriber",
                pipeline: [
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "channel",
                            as: "subscribedToSubscriber"
                        }
                    },
                    {
                        $addFields: {
                            subscribersCount: {
                                $size: "$subscribedToSubscriber"
                            },
                            isSubscribed: {
                                $cond: {
                                    if: {
                                        $in: [
                                            req.user?._id,
                                            "$subscribedToSubscriber.subscriber"
                                        ]
                                    },
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                            subscribersCount: 1,
                            isSubscribed: 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$subscriber"
        },
        {
            $project: {
                subscriber: 1
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(200, subscribers, "Subscribers fetched successfully")
        )
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber id")
    }

    const subscribedChannels = await Subscription.aggregate([
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "channel",
                foreignField: "_id",
                as: "channel",
                pipeline: [
                    {
                        $lookup: {
                            from: "videos",
                            localField: "_id",
                            foreignField: "owner",
                            as: "videos"
                        }
                    },
                    {
                        $addFields: {
                            latestVideo: { $last: "$videos" }
                        }
                    },
                    {
                        $project: {
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                            latestVideo: {
                                _id: 1,
                                videoFile: 1,
                                thumbnail: 1,
                                title: 1,
                                duration: 1,
                                views: 1,
                                createdAt: 1
                            }
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$channel"
        },
        {
            $project: {
                channel: 1
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                subscribedChannels,
                "Subscribed channels fetched successfully"
            )
        )
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}