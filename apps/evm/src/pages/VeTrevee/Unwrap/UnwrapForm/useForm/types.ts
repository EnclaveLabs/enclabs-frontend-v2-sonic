import type { Token } from "types";

export interface FormValues {
  fromToken: Token;
  amountTokens: string;
}

export type FormErrorCode =
  | "EMPTY_TOKEN_AMOUNT"
  | "HIGHER_THAN_UNWRAPPABLE_AMOUNT";
