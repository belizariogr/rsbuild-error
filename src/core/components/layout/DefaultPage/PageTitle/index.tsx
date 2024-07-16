import { Breadcrumbs, Link, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme as useThemeCore } from '@material-ui/core/styles';
import useStyles from "./styles";
import Config from "../../../../../config";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useLang } from "../../../../services/Lang";
import Utils from "../../../../services/Utils";
import { useUser } from "../../../../services/User";

type PageProps = {
    title: string;
    plural?: string;
    detail?: boolean;
    breakxs?: boolean;
}

const PageTitle: React.FC<PageProps> = ({ title, plural, detail, children, breakxs }) => {

    const classes = useStyles();
    const themeCore = useThemeCore();
    const isMobile = useMediaQuery(themeCore.breakpoints.down('xs'));
    const navigate = useNavigate();
    const { lang } = useLang();
    const { user } = useUser();
    const { id } = useParams();
    const [links, setLinks] = useState(() => Utils.getLinks(plural || title, id, user.routes, lang));

    const haveToBreak = (isMobile && breakxs);

    useEffect(() => {
        setLinks(Utils.getLinks(plural || title, id, user.routes, lang));
    }, [lang, id, plural, title, user.routes]);

    const getBreadcrumbs = () => {
        if (detail)
            return;
        let breadcrumbs: any = <Typography color="textPrimary" className={classes.notlink}>{title}</Typography>;
        if (Array.isArray(links)) {
            breadcrumbs = links.map(l => {
                if (l.path === '')
                    return <Typography key={l} color="textPrimary" className={classes.notlink}>{l.label}</Typography>
                return <Link key={l} color="inherit" onClick={() => navigate(l.path)} className={classes.link}>{l.label}</Link>
            })
        }
        return (
            <div>
                <Breadcrumbs aria-label="breadcrumb" color="primary" className={classes.Breadcrumbs}>
                    <Link color="inherit" onClick={() => navigate('/')} className={classes.link}>
                        {Config.name}
                    </Link>
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
        );
    }

    const hasChildren = !!children;
    return (
        <>
            <div className={classes.root} >
                <div className={classes.Title}>
                    <div>
                        <Typography variant="h4">{title}</Typography>
                    </div>
                    {getBreadcrumbs()}
                </div>
                {!hasChildren || haveToBreak ? undefined : (<div className={classes.Content}>{children}</div>)}
            </div>
            {!hasChildren || !haveToBreak ? undefined : (<div className={classes.Content}>{children}</div>)}
        </>
    );
}

export default PageTitle;