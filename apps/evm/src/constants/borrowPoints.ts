import BigNumber from 'bignumber.js';
import ringsLogo from 'libs/tokens/img/rings.svg';
import sonicLogo from 'libs/tokens/img/sonic.svg';
import enclabsPointsLogo from 'libs/tokens/img/enclabspoints.svg';


export const pointType = {
    sonicRingsPointsEligibleAddressesX1_5: [
        
        

    ],
    enclabsPointsX1: [
       "0x7D47cBf5FE9cCF2F99D0C2E8a3c59FB3498bc21b", //scusd spectra pool
       "0x6770aF27FC5233A70B85BFf631061400a09d2e1c", //scusd core pool
        '0x87c69a8fb7f04b7890f48a1577a83788683a2036', //usdc core
         '0xb64b8585cece0e314d344c7f6437d97bf1eb0fe7', //usdc slst
           //'0xd1e8ec6eaed325006731f816f41fd5483373a8f2', //PTscusd spectrapool
           //"0xBFF8cf17b04A057D9A8Ce5796a85c60D1F614eaB", //PTsceth spectrapool
           "0x8bC35Aee955E2D05C13e4Ff503294676508668B5", //sceth spectrapool"
           '0x6fFD0B54E2B74FdaFBceC853145372066FE98fC1', //eurc core
        

    ],
    enclabsPointsX2: [
        '0x7fd79432cc704582235df11b92b783f07ed40e13', //wos Slst
        '0x876e062420fb9a4861968ec2e0ff91be88142343', // ws slst
        "0x76463494e39e259470301aA1c2B48E2Ca4Ac9b13", //usdc ecostystem
        "0x730935e4F45610Ca07DBA1B5f3649Fa34464d5eD", //ws ecosystem


    ],
    enclabsPointsX4: [
       
        "0x04568dB12221D60C93e1db9Cb7933aD6b7c4280C", //sceth core pool
        '0x52260ad4cb690c6b22629166f4d181477a9c157c', //eth core
        "0xe544e51bf20ab186b6b7b1a9095c8bc1e3f203f5", //sts core
        '0xc96a4cd13c8fcb9886de0cdf7152b9f930d67e96', //wS core
        "0xf50466320de462627f929f7F631206653c10C0b7", //goglz ecosystem
        "0xdDe5262d257BB26DCd6Ea482f489078eD020CD7C", //snake ecosystem

    ],
    enclabsPointsX6: [
       
        

    ],
    enclabsPointsX8: [
       
        

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
    
   
};

