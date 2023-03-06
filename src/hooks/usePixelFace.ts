import { Cloudinary } from '@cloudinary/url-gen'
import { pixelate } from '@cloudinary/url-gen/actions/effect';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import { faces } from '@cloudinary/url-gen/qualifiers/region';

const cloudinary = new Cloudinary({
    cloud: {
        cloudName: 'dundmk7vd'
    },
    url:{
         secure:true
    }
});

export default function usePixelFace(publicId:string, pixelSize:number) {
    const imgLowerQuality = cloudinary
                        .image(publicId)
                        .delivery(quality(auto()));


    const imgPixelateFace = imgLowerQuality
                            .effect(pixelate(pixelSize)
                            .region(faces()))
                            .toURL();

    return imgPixelateFace;
}


