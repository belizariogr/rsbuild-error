import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Drawer, IconButton, ListItemIcon, Typography } from '@material-ui/core';
import { getFieldLabel, useLang } from '../../../services/Lang';
import { Search } from '../../../services/Search/types';
import { Close, DragIndicator } from '@mui/icons-material';

import { Field } from '../../../types';


type ArrangeBarProps = {
    open: boolean;
    doClose: () => void;
    search: Search;
}

type FieldItemProps = {
    field: Field;
    index: number;
    dataset: any;
}

const FieldItem: React.FC<FieldItemProps> = ({ field, index, dataset }) => {
   return <></>
}

const ArrangeBar: React.FC<ArrangeBarProps> = ({ open, doClose, search }) => {


    return (
        <></>
    );
};

export default ArrangeBar;