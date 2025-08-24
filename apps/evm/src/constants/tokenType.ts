import { theme } from 'theme';

export const tokenType = {
    LST: [
         "0x9F0dF7799f6FDAd409300080cfF680f5A23df4b1", //wOS
         "0xE5DA20F15420aD15DE0fa650600aFc998bbE3955", //stS
         
    ],
    PT: [ 
    ],
    "Spectra PT": [ "0x7002383d2305b8f3b2b7786f50c13d132a22076d", // PT scUSD spectra june
        "0x3a7ba84bbe869ed318e654dd9b6ff3cf6d531e91", // PT scETH spectra june
        
    ],
    "Pendle PT": [ 
        "0xbe27993204ec64238f71a527b4c4d5f4949034c3" // PT pendle wstkscusd
    ],
    "StableJack YieldToken": [ 
        "0xd2901D474b351bC6eE7b119f9c920863B0F781b2" // YT scusd
    ],
    Wrapped: [
        "0x50c42deacd8fc9773493ed674b675be577f2634b", // wETH
        "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38", // wS
        "0x3bcE5CB273F0F148010BbEa2470e7b5df84C7812", //scETH
    ],
    aToken: [
    ],
    Stable: [
        "0x29219dd400f2bf60e5a23d13be72b486d4038894", // USDC.e
        "0xd3DCe716f3eF535C5Ff8d041c1A41C3bd89b97aE", //scUSD
        "0xe715cbA7B5cCb33790ceBFF1436809d36cb17E57", //EURC
        "0xB9EA44D1aa76D5Cfd475C2800E186d3Dea2141a4", //veETHEnclabs
        "0xd02962DC00A058a00Fc07A8AA9F760ab6D9Bd163", //veUSDEnclabs
    ],
    "Yield bearing Stable": [
       
        "0x6202b9f02e30e5e1c62cc01e4305450e5d83b926", //xUSD
        "0xaaaaaaaac311d0572bffb4772fe985a750e88805", //wMetaUSD
        "0x3D75F2BB8aBcDBd1e27443cB5CBCE8A668046C81", //hlp0
        "0xC326D1505ce0492276f646B03FE460c43A892185", //u$d
    ],
    "Ecosystem tokens": [
       
        "0x3a516e01f82c1e18916ED69a81Dd498eF64bB157", // snake
        "0x9fDbC3f8Abc05Fa8f3Ad3C17D2F806c1230c4564", //goglz
        
    ],
  
};

export const tokenTypeInfo: {
    [key: string]: {
        color: string;
        borderColor: string;
        backgroundColor: string;
        hoverColor: string;
        buttonClassName: string;
        shadowClassName: string;
        getUrl: (tokenAddress: string, chain: string) => string;
    };
} = {
    LST: {
        color: theme.extend.colors.tagTextOrange, // Orange
        borderColor: theme.extend.colors.tagTextOrange,
        backgroundColor: theme.extend.colors.tagBgOrange,
        hoverColor: theme.extend.colors.hoverOrange,
        buttonClassName: 'bg-tagTextOrange bg-tagTextOrange border-tagTextOrange hover:border-tagTextOrange hover:bg-hoverOrange text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverOrange',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    },
    PT: {
        color: theme.extend.colors.tagTextGreen, // Green
        borderColor: theme.extend.colors.tagTextGreen,
        backgroundColor: theme.extend.colors.tagBgGreen,
        hoverColor: theme.extend.colors.hoverGreen,
        buttonClassName: 'bg-tagTextGreen bg-tagTextGreen border-tagTextGreen hover:border-tagTextGreen hover:bg-hoverGreen text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverGreen',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    },
    "Spectra PT": {
        color: theme.extend.colors.tagTextGreen, // Green
        borderColor: theme.extend.colors.tagTextGreen,
        backgroundColor: theme.extend.colors.tagBgGreen,
        hoverColor: theme.extend.colors.hoverGreen,
        buttonClassName: 'bg-tagTextGreen bg-tagTextGreen border-tagTextGreen hover:border-tagTextGreen hover:bg-hoverGreen text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverGreen',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    },
    "Pendle PT": {
        color: theme.extend.colors.tagTextGreen, // Green
        borderColor: theme.extend.colors.tagTextGreen,
        backgroundColor: theme.extend.colors.tagBgGreen,
        hoverColor: theme.extend.colors.hoverGreen,
        buttonClassName: 'bg-tagTextGreen bg-tagTextGreen border-tagTextGreen hover:border-tagTextGreen hover:bg-hoverGreen text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverGreen',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    },
    "StableJack YieldToken": {
        color: theme.extend.colors.tagTextGreen, // Green
        borderColor: theme.extend.colors.tagTextGreen,
        backgroundColor: theme.extend.colors.tagBgGreen,
        hoverColor: theme.extend.colors.hoverGreen,
        buttonClassName: 'bg-tagTextGreen bg-tagTextGreen border-tagTextGreen hover:border-tagTextGreen hover:bg-hoverGreen text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverGreen',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    },
    Wrapped: {
        color: theme.extend.colors.tagTextYellow, // Yellow
        borderColor: theme.extend.colors.tagTextYellow,
        backgroundColor: theme.extend.colors.tagBgYellow,
        hoverColor: theme.extend.colors.hoverYellow,
        buttonClassName: 'bg-tagTextYellow bg-tagTextYellow border-tagTextYellow hover:border-tagTextYellow hover:bg-hoverYellow text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverYellow',
        getUrl: (tokenAddress: string, chain: string) =>
            `swap`,
    },
     "Ecosystem tokens": {
        color: theme.extend.colors.tagTextYellow, // Yellow
        borderColor: theme.extend.colors.tagTextYellow,
        backgroundColor: theme.extend.colors.tagBgYellow,
        hoverColor: theme.extend.colors.hoverYellow,
        buttonClassName: 'bg-tagTextYellow bg-tagTextYellow border-tagTextYellow hover:border-tagTextYellow hover:bg-hoverYellow text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverYellow',
        getUrl: (tokenAddress: string, chain: string) =>
            `swap`,
    },
    aToken: {
        color: theme.extend.colors.tagTextRed, // Red
        borderColor: theme.extend.colors.tagTextRed,
        backgroundColor: theme.extend.colors.tagBgRed,
        hoverColor: theme.extend.colors.hoverRed,
        buttonClassName: 'bg-tagTextRed bg-tagTextRed border-tagTextRed hover:border-tagTextRed hover:bg-hoverRed text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverRed',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    },
    "Yield bearing Stable": {
        color: theme.extend.colors.tagTextBlue, // Blue
        borderColor: theme.extend.colors.tagTextBlue,
        backgroundColor: theme.extend.colors.tagBgBlue,
        hoverColor: theme.extend.colors.hoverBlue,
        buttonClassName: 'bg-tagTextBlue bg-tagTextBlue border-tagTextBlue hover:border-tagTextBlue hover:bg-hoverBlue text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverBlue',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    },
    Stable: {
        color: theme.extend.colors.tagTextBlue, // Blue
        borderColor: theme.extend.colors.tagTextBlue,
        backgroundColor: theme.extend.colors.tagBgBlue,
        hoverColor: theme.extend.colors.hoverBlue,
        buttonClassName: 'bg-tagTextBlue bg-tagTextBlue border-tagTextBlue hover:border-tagTextBlue hover:bg-hoverBlue text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverBlue',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    },
    Unknown: {
        color: theme.extend.colors.tagTextGrey,
        borderColor: theme.extend.colors.tagTextRed,
        backgroundColor: theme.extend.colors.tagBgGrey,
        hoverColor: theme.extend.colors.hoverGrey,
        buttonClassName: 'bg-tagTextGrey bg-tagTextGrey border-tagTextGrey hover:border-tagTextGrey hover:bg-hoverGrey text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverGrey',
        getUrl:  (tokenAddress: string, chain: string) => 
            `swap`,
    }
};