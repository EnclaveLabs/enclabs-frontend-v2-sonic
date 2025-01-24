import { theme } from 'theme';

export const tokenType = {
    LST: [
         "0x9F0dF7799f6FDAd409300080cfF680f5A23df4b1", //wOS
    ],
    PT: [
    ],
    Wrapped: [
        "0x50c42deacd8fc9773493ed674b675be577f2634b", // wETH
        "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38", // wS
    ],
    aToken: [
    ],
    Stable: [
        "0x29219dd400f2bf60e5a23d13be72b486d4038894", // USDC.e
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
        color: theme.colors.tagTextOrange, // Orange
        borderColor: theme.colors.tagTextOrange,
        backgroundColor: theme.colors.tagBgOrange,
        hoverColor: theme.colors.hoverOrange,
        buttonClassName: 'bg-tagTextOrange bg-tagTextOrange border-tagTextOrange hover:border-tagTextOrange hover:bg-hoverOrange text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverOrange',
        getUrl:  (tokenAddress: string, chain: string) => 
            `https://app.uniswap.org/swap?chain=${chain}&inputCurrency=${tokenAddress}`,
    },
    PT: {
        color: theme.colors.tagTextGreen, // Green
        borderColor: theme.colors.tagTextGreen,
        backgroundColor: theme.colors.tagBgGreen,
        hoverColor: theme.colors.hoverGreen,
        buttonClassName: 'bg-tagTextGreen bg-tagTextGreen border-tagTextGreen hover:border-tagTextGreen hover:bg-hoverGreen text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverGreen',
        getUrl:  (tokenAddress: string, chain: string) => 
            `https://app.pendle.finance/trade/markets/${tokenAddress}/swap?view=pt&chain=${chain}`,
    },
    Wrapped: {
        color: theme.colors.tagTextYellow, // Yellow
        borderColor: theme.colors.tagTextYellow,
        backgroundColor: theme.colors.tagBgYellow,
        hoverColor: theme.colors.hoverYellow,
        buttonClassName: 'bg-tagTextYellow bg-tagTextYellow border-tagTextYellow hover:border-tagTextYellow hover:bg-hoverYellow text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverYellow',
        getUrl: (tokenAddress: string, chain: string) =>
            `https://app.uniswap.org/swap?chain=${chain}&inputCurrency=${tokenAddress}`,
    },
    aToken: {
        color: theme.colors.tagTextRed, // Red
        borderColor: theme.colors.tagTextRed,
        backgroundColor: theme.colors.tagBgRed,
        hoverColor: theme.colors.hoverRed,
        buttonClassName: 'bg-tagTextRed bg-tagTextRed border-tagTextRed hover:border-tagTextRed hover:bg-hoverRed text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverRed',
        getUrl:  (tokenAddress: string, chain: string) => 
            ``,
    },
    Stable: {
        color: theme.colors.tagTextBlue, // Blue
        borderColor: theme.colors.tagTextBlue,
        backgroundColor: theme.colors.tagBgBlue,
        hoverColor: theme.colors.hoverBlue,
        buttonClassName: 'bg-tagTextBlue bg-tagTextBlue border-tagTextBlue hover:border-tagTextBlue hover:bg-hoverBlue text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverBlue',
        getUrl:  (tokenAddress: string, chain: string) => 
            `https://app.uniswap.org/swap?chain=${chain}&inputCurrency=${tokenAddress}`,
    },
    Unknown: {
        color: theme.colors.tagTextGrey,
        borderColor: theme.colors.tagTextRed,
        backgroundColor: theme.colors.tagBgGrey,
        hoverColor: theme.colors.hoverGrey,
        buttonClassName: 'bg-tagTextGrey bg-tagTextGrey border-tagTextGrey hover:border-tagTextGrey hover:bg-hoverGrey text-lightBlack',
        shadowClassName: 'shadow-md shadow-hoverGrey',
        getUrl:  (tokenAddress: string, chain: string) => 
            `https://app.uniswap.org/swap?chain=${chain}&inputCurrency=${tokenAddress}`,
    }
};