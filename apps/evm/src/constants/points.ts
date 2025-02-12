import BigNumber from 'bignumber.js';
import ringsLogo from 'libs/tokens/img/rings.svg';
import sonicLogo from 'libs/tokens/img/sonic.svg';


export const pointType = {
    sonicRingsPointsEligibleAddressesX1_5: [
        "0x7D47cBf5FE9cCF2F99D0C2E8a3c59FB3498bc21b", //scusd spectra pool
        "0x04568dB12221D60C93e1db9Cb7933aD6b7c4280C", //sceth core pool
        "0x6770aF27FC5233A70B85BFf631061400a09d2e1c", //scusd core pool
        

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
        multiplier: "x1.5",
        tooltiptext: "36 Rings Points / $ value / day",
        tooltipLink: "https://app.rings.money/#/points",
    },
    
   
};

