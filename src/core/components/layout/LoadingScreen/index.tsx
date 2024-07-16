import { Theme } from "@material-ui/core";
import { HTMLAttributes } from "react";
import { RingLoader } from "react-spinners";
import useStyles from "./styles";

interface Props extends HTMLAttributes<HTMLElement> {
    theme: Theme
}

const LoadingScreen: React.FC<Props> = ({ theme, ...props }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <RingLoader size={120} color={theme.palette.primary.main} />
        </div>
    );
};
export default LoadingScreen;