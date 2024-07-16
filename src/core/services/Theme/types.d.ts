import { Theme } from "@material-ui/core";
import { ReactElement } from "react";

export interface CustomTheme extends Theme {
    logo: {
        backgroundColor: string;
        color: string;
        tag: {
            backgroundColor: string;
            textColor: string;
        }
    },
    SideBar: {
        subItemsBackgroundColor: string;
        background?: string;
        borderColor?: string;
        hoverBackground?: string;
        hoverBorder?: string;
        selectedBackground?: string;
        selectedBorder?: string;
    }
    navbar: {
        backgroundColor: string;
        textColor: string;
    },
    others: {
        iconColor: string;
        tagIconColor: string;
        borderColor: string;

        positiveBackground: string;
        negativeBackground: string;
        positiveValue: string;
        negativeValue: string;

        green: string;
        blue: string;
        red: string;
        organge: string;
        purple: string;
        gray: string;
        secondaryHightlightColor: string;
        hoverColor?: string;

    },
}

export type BGTheme = {
    name: string;
    theme: CustomTheme;
    logo: ReactElement;
    hideLogoText?: boolean;
    hideLogoVersion?: boolean;
}

export type ThemeContextType = {
    theme: BGTheme;
    setTheme: (theme: BGTheme) => void;
}