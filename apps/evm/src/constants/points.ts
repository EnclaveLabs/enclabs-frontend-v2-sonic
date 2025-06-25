import BigNumber from 'bignumber.js';
import ringsLogo from 'libs/tokens/img/rings.svg';
import sonicLogo from 'libs/tokens/img/sonic-token.svg';
import enclabsPointsLogo from 'libs/tokens/img/enclabspoints.svg';


export const pointType = {
    sonicRingsPointsEligibleAddressesX1_5: [
        "0x7D47cBf5FE9cCF2F99D0C2E8a3c59FB3498bc21b", //scusd spectra pool
        "0x04568dB12221D60C93e1db9Cb7933aD6b7c4280C", //sceth core pool
        "0x6770aF27FC5233A70B85BFf631061400a09d2e1c", //scusd core pool
        "0x8bC35Aee955E2D05C13e4Ff503294676508668B5", //sceth spectrapool


    ],
    enclabsPointsX1: [
        '0xd1e8ec6eaed325006731f816f41fd5483373a8f2', //PTscusd spectrapool
        "0xBFF8cf17b04A057D9A8Ce5796a85c60D1F614eaB", //PTsceth spectrapool
        '0x7fd79432cc704582235df11b92b783f07ed40e13', //wos Slst
        "0xe544e51bf20ab186b6b7b1a9095c8bc1e3f203f5", //sts core
        "0x2df4dC7cf362E56e128816BE0f1F4CEb07904Bb0", //PT pendle wstkscusd
        "0xAb1fbEE94D9ba79269B3e479cE5D78C60F148716", //YT scusd stablejack
        "0x13d79435F306D155CA2b9Af77234c84f80506045", //xusd core
        "0x1D801dC616C79c499C5d38c998Ef2D0D6Cf868e8", //wmetausd

    ],
    enclabsPointsX2: [



    ],
    enclabsPointsX4: [
        '0xb64b8585cece0e314d344c7f6437d97bf1eb0fe7', //usdc slst
        "0x04568dB12221D60C93e1db9Cb7933aD6b7c4280C", //sceth core pool
        '0x52260ad4cb690c6b22629166f4d181477a9c157c', //eth core


    ],
    enclabsPointsX6: [

        '0xc96a4cd13c8fcb9886de0cdf7152b9f930d67e96', //wS core

    ],
    enclabsPointsX8: [
        '0x87c69a8fb7f04b7890f48a1577a83788683a2036', //usdc core
        "0x6770aF27FC5233A70B85BFf631061400a09d2e1c", //scusd core pool
        "0x7D47cBf5FE9cCF2F99D0C2E8a3c59FB3498bc21b", //scusd spectra pool
        "0x8bC35Aee955E2D05C13e4Ff503294676508668B5", //sceth spectrapool
        '0x876e062420fb9a4861968ec2e0ff91be88142343', // ws slst
        '0x6fFD0B54E2B74FdaFBceC853145372066FE98fC1', //eurc core
        "0x3f0c9dcCa72058950327b5D4a5783fB0CbA520Ce", //veEnclabs
    ],



    SonicPointsX2: [ 
        '0x52260ad4cb690c6b22629166f4d181477a9c157c', // wETH_Core
    ],
    SonicPointsX4: [
        "0x876e062420fb9a4861968ec2e0ff91be88142343", // wS_LiquidStakedS
        "0xe544e51bf20ab186b6b7b1a9095c8bc1e3f203f5", // stS_Core
        "0xc96a4cd13c8fcb9886de0cdf7152b9f930d67e96", // wS_Core
        "0x04568db12221d60c93e1db9cb7933ad6b7c4280c", // scETH_Core
        "0x8bc35aee955e2d05c13e4ff503294676508668b5", // scETH
        "0x7fd79432cc704582235df11b92b783f07ed40e13", // wOS
    ],
    SonicPointsX5: [
        
        
    ],
    SonicPointsX6: [
        "0xb64b8585cece0e314d344c7f6437d97bf1eb0fe7", // USDCe_LiquidStakedS
        "0x87c69a8fb7f04b7890f48a1577a83788683a2036", // USDCe_Core
        "0x6770aF27FC5233A70B85BFf631061400a09d2e1c", // scUSD_Core
        "0x7d47cbf5fe9ccf2f99d0c2e8a3c59fb3498bc21b", // scUSD_SpectraPTscUSDPool
    ],
};
export const pointTypeInfo: {
    [key: string]: {
        logo: string;
        multiplier: string;
        tooltiptext: string;
        tooltipLink: string;
    };
} = {
    sonicRingsPointsEligibleAddressesX1_5: {
        logo: ringsLogo,
        multiplier: "x1",
        tooltiptext: "24 Rings Points / $ value / day",
        tooltipLink: "https://app.rings.money/#/points",
    },
    enclabsPointsX1: {
        logo: enclabsPointsLogo,
        multiplier: "x1",
        tooltiptext: "1 Enclabs Point / $ value / day",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/enclabs-points",
    },
    enclabsPointsX2: {
        logo: enclabsPointsLogo,
        multiplier: "x2",
        tooltiptext: "2 Enclabs Point / $ value / day",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/enclabs-points",
    },
    enclabsPointsX4: {
        logo: enclabsPointsLogo,
        multiplier: "x4",
        tooltiptext: "4 Enclabs Point / $ value / day",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/enclabs-points",
    },
    enclabsPointsX6: {
        logo: enclabsPointsLogo,
        multiplier: "x6",
        tooltiptext: "6 Enclabs Point / $ value / day",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/enclabs-points",
    },
    enclabsPointsX8: {
        logo: enclabsPointsLogo,
        multiplier: "x8",
        tooltiptext: "8 Enclabs Point / $ value / day",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/enclabs-points",
    },


    SonicPointsX2: { 
        logo: sonicLogo,
        multiplier: "x4",
        tooltiptext: "You earn 4x Sonic Points (2x * 2x = 4x)",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/sonic-points",
    },
    SonicPointsX4: {
        logo: sonicLogo,
        multiplier: "x8",
        tooltiptext: "You earn 8x Sonic Points (4x * 2x = 8x)",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/sonic-points",
    },
    SonicPointsX5: {
        logo: sonicLogo,
        multiplier: "x10",
        tooltiptext: "You earn 10x Sonic Points (5x * 2x = 10x)",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/sonic-points",
    },
    SonicPointsX6: {
        logo: sonicLogo,
        multiplier: "x12",
        tooltiptext: "You earn 12x Sonic Points (6x * 2x = 12x)",
        tooltipLink: "https://enclabs.gitbook.io/enclabs-documentation/enclabs-on-sonic/sonic-points",
    },
};

