import { Public } from '@mui/icons-material';
import { PhoneCountryList } from '../../services/Lang/types';
import { ReactComponent as BR } from '../../static/flags/br.svg';
import { ReactComponent as US } from '../../static/flags/us.svg';


export const PhoneCodes: PhoneCountryList = {
    "55" :{
        code: "BR",
        dial: "55",
        name: "Brasil",
        mask: "9999-9999;99999-9999;(99) 9999-9999;(99) 99999-9999",
        flag: <BR />
    },
    "1": {
        code: "US",
        dial: "1",
        name: "Estados Unidos / Canadá",
        mask: "999-9999;9999-9999;(999) 999-9999;(999) 9999-9999;(999) 99999-9999",
        flag: <US />,
    },
    "*": {
        name: "Outros",
        code: "",
        dial: "*",
        mask: "",
        flag: <Public color="action" />
    }

};

export default PhoneCodes;