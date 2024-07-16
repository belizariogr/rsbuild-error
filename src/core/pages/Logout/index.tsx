import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from "../../services/Api";

import { useUser } from "../../services/User";
import { User } from "../../services/User/types";
import Utils from '../../services/Utils';
import Config from '../../../config';

const Logout = () => {
    const api = useApi();
    api.notifications.close();
    const { setUser } = useUser();

    const navigate = useNavigate();
    const [account] = useState(() => Utils.getAccount(Config));

    const doLogout = async () => {

    }

    useEffect(() => {
        doLogout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <></>;
};

export default Logout;
