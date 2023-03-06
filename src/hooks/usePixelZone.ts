import { Cloudinary } from "@cloudinary/url-gen";
import { quality } from "@cloudinary/url-gen/actions/delivery";
import { pixelate } from "@cloudinary/url-gen/actions/effect";
import { crop, fill, scale } from "@cloudinary/url-gen/actions/resize";
import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import { custom } from "@cloudinary/url-gen/qualifiers/region";
import { usePixelZoneArgs } from "../types";

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: 'dundmk7vd'
    },
    url: {
        secure: true
    }
});

export default function usePixelZone({ pixelSize, publicId, userWidth, userHeight, x, y}: usePixelZoneArgs, newWidth:number) {
    const qualityImg = cloudinary
                    .image(publicId)
                    .delivery(quality(auto()));
    
    const resizeImg = qualityImg.resize(fill().width(newWidth)).toURL();

    const pixelateImg = qualityImg
                        .effect(
                            pixelate(pixelSize)
                            .region(custom()
                            .width(userWidth )
                            .height(userHeight)
                            .x(x)
                            .y(y)))
                            .toURL()

    return {pixelateImg, resizeImg};
}