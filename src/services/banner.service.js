import Banner from "../models/banner.model";

export const createBanner=async (data) => {
    const lastbanner = await Banner.findOne({
        type:data.type
    }).sort({order:-1});


    if (lastbanner &&  data.order !== lastbanner.order + 1) {
        throw new Error("order is already exist or order must exactaly one greater than last ");
        
    }

    const Banner = await Banner.create(data);

    return{
        message:"Banner created",
        data:{
            Banner
        }
    }
}

