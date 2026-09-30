import Banner from "../models/banner.model.js";
import cloudinary from "../config/cloudinary.js";

export const createBanneServicer = async (data) => {

    const lastbanner = await Banner.findOne({
        type: data.type
    }).sort({ order: -1 });





    if (lastbanner && Number(data.order) !== lastbanner.order + 1) {
        throw new Error("order is already exist or order must exactaly one greater than last ");

    }

    const banner = await Banner.create(data);

    return {
        message: "Banner created",
        data: {
            banner
        }
    }
}

export const getBannerService = async () => {
    const banner = await Banner.find().lean();
    return {
        message: "Banner fetch successfully",
        data: {
            banner
        }
    }
}

export const getBannerByIdService = async (Id) => {


    const banner = await Banner.findById(Id).lean();
    return {
        message: "Banner fetch successfully",
        data: {
            banner
        }
    }
};

export const updateBannerByIdService = async (Id, data) => {


    const exist = await Banner.findById(Id);
    if (!exist) {
        throw new Error("banner not found");
    };

    const oldUrlPublicId = exist.urlPublicId;

    await Banner.findByIdAndUpdate(Id, {
        order: -1
    })

    if (exist.order >= data.order) {
        await Banner.updateMany({
            type: data.type,
            order: {
                $gte: data.order,
                $lt: exist.order
            }
        },
            {
                $inc: {
                    order: 1
                }
            });
    } else {
        await Banner.updateMany({
            type: data.type,
            order: {
                $gt: exist.order,
                $lte: data.order
            }
        },
            {
                $inc: {
                    order: -1
                }
            });
    }


    const banner = await Banner.findByIdAndUpdate(Id, data, {
        new: true, runValidators: true
    })

    // only remove the old image when a new one replaced it
    if (data.urlPublicId && data.urlPublicId !== oldUrlPublicId) {
        await cloudinary.uploader.destroy(oldUrlPublicId);
    }
    return {
        message: "Banner updated successfully",
        data: {
            banner
        }
    }
}


export const deleteBannerByIdService = async (Id) => {


    const exist = await Banner.findById(Id);
    if (!exist) {
        throw new Error("banner not found");
    };


    const oldUrlPublicId = exist.urlPublicId;
    const oldMobilePublicId = exist.mobileUrlPublicId;
    const banner = await Banner.findByIdAndDelete(Id);

    await Banner.updateMany({
        type: exist.type,
        order: {
            $gt: exist.order,
        }
    },
        {
            $inc: {
                order: -1
            }
        });




    if (oldUrlPublicId) {
        await cloudinary.uploader.destroy(oldUrlPublicId);
    }

    if (oldMobilePublicId) {
        await cloudinary.uploader.destroy(oldMobilePublicId);
    }
    return {
        message: "Banner delete successfully",
        data: {
            banner
        }
    }
}


