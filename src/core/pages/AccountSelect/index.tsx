import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Config from '../../../config';
import useStyles from './styles';
import { Box, Button, Container, Link, Typography, Grid, FormControl, OutlinedInput, InputAdornment, Card, FormHelperText } from '@material-ui/core';
import { useApi } from '../../services/Api';
// import Utils from '../../services/Utils';
import LangMenu from '../../components/layout/MainNavbar/LangMenu';

import packageJson from '../../../../package.json';

import { removeDiacritics, removeSpecial } from '../../services/Utils/strings';
import { useLang } from '../../services/Lang';

const AccountSelect = () => {

    return <>
    Account Select
    </>;
};

export default AccountSelect;
