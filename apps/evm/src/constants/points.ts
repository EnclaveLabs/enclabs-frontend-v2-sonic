import BigNumber from 'bignumber.js';
import ringsLogo from 'libs/tokens/img/rings.svg';
import sonicLogo from 'libs/tokens/img/sonic.svg';


export const pointType = {
    sonicRingsPointsEligibleAddressesX1_5: [
         "0xd3DCe716f3eF535C5Ff8d041c1A41C3bd89b97aE", 
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

