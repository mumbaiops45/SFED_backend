import { createBanneServicer, getBannerService, getBannerByIdService, updateBannerByIdService, deleteBannerByIdService } from "../services/banner.service.js";

export const createBannerController = async (req, res) => {
    let allData = req.body;
    if (req.files?.image?.[0]) {
        allData = { ...allData, url: req.files.image[0].path, urlPublicId: req.files.image[0].filename }
    };
    if (req.files?.mobileImage?.[0]) {
        allData = { ...allData, mobileUrl: req.files.mobileImage[0].path, mobileUrlPublicId: req.files.mobileImage[0].filename }
    }


    const { message, data } = await createBanneServicer(allData);
    res.json({
        success: true,
        message,
        data
    })
}

export const getBannerController = async (req, res) => {

    const { message, data } = await getBannerService();
    res.json({
        success: true,
        message,
        data
    })
}

export const getBannerByIdController = async (req, res) => {
    const { id } = req.params;

    const { message, data } = await getBannerByIdService(id);
    res.json({
        success: true,
        message,
        data
    })
}

export const updateBannerByIdController = async (req, res) => {
    const { id } = req.params;
    let allData = req.body;



    if (req.files?.image?.[0]) {
        allData = { ...allData, url: req.files.image[0].path, urlPublicId: req.files.image[0].filename }
    };
    if (req.files?.mobileImage?.[0]) {
        allData = { ...allData, mobileUrl: req.files.mobileImage[0].path, mobileUrlPublicId: req.files.mobileImage[0].filename }
    }




    const { message, data } = await updateBannerByIdService(id, allData);
    res.json({
        success: true,
        message,
        data
    })
}


export const deleteBannerByIdController = async (req, res) => {
    const { id } = req.params;

    const { message, data } = await deleteBannerByIdService(id);
    res.json({
        success: true,
        message,
        data
    })
}

