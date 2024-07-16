import { enUS as locale } from 'date-fns/locale';
import { Lang } from "../../services/Lang/types";
import PhoneCodes from "./phonecodes";
import { ReactComponent as Icon } from './icon.svg';

export const en_us: Lang = {
    name: "English (United States)",
    code: "en-us",
    locale,
    countries: [1490, 2496],
    icon: <Icon />,
    phoneCodes: PhoneCodes,
    data: {
        localeCode: "en-US",
        languageCode: "en",
        dialCode: "1",
        masks: {
            date: "99/99/9999",
            time: "99:99:99 AA",
            datetime: "99/99/9999 99:99:99 AA",
            phone: "999-9999;9999-9999;(999) 999-9999;(999) 9999-9999;(999) 99999-9999",
            cpfcnpj: "",
            zip: "",
        },
        formats: {
            date: "MM/dd/yyyy",
            time: "h:mm:ss a",
            shortTime: "h:mm a",
            datetime: "MM/dd/yyyy h:mma",
            fullDatetime: "EE, MMM dd, yyyy",
            dateSperator: "/",
            timeSeparator: ":",
            decimalSeparator: ".",
            thousandSeparator: ",",
            show24Hour: false,
            monthOfYear: "MMMM of YYYY",
            true: 'True',
            false: 'False',
        },
        dates: {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            today: "Today"
        },
        captions: {
            myAccount: 'My Account',
            settings: 'Settings',
            darkMode: 'Dark Mode',
            lightMode: 'Light Mode',
            langs: 'Language',
            logout: 'Logout',
            notifications: 'Notifications',
            noNotifications: 'You don\'t have notifications.',

            confirmation: 'Confirmation',
            information: 'Information',
            warning: 'Warning',
            error: 'Error',

            ok: 'Ok',
            yes: 'Yes',
            no: 'No',
            cancel: 'Cancel',
            close: 'Close',
            clear: 'Clear',
            new: 'New',
            femNew: 'New',
            edit: 'Edit',
            editing: 'Editing',
            viewing: 'Viewing',
            delete: 'Delete',
            save: 'Save',
            apply: 'Apply',
            tryAgain: 'Try Again',
            and: 'and',
            or: 'or',
            add: 'Add',
            to: 'to',
            all: 'All',
            with: 'With',

            page: 'Page',
            noRecordsFound: 'No records found.',
            recordsPerPage: 'Records per page:',

            noOptions: 'No options',
            noOptionsSearch: 'Type to search',
            searching: 'Searching...',
            searchBox: 'Search',

            filterHeader: 'Filters',
            filter: 'Filter',
            noOptionsAvailable: 'No options available.',

            startDate: 'Start Date',
            endDate: 'End Date',
            today: 'Today',

            themeHeader: 'Select a theme',
            langHeader: 'Select your language',

            createAccount: 'Creating an account',
            accountName: 'Account Name',
            company: 'Company Name',
            email: 'Email',
            user: 'Username',
            name: 'Your Full Name',
            createAccButton: 'Create Account',

            enterAccount: 'Enter your account:',
            proceed: 'Proceed',
            dontKnowMyAccount: 'I don\'t know my account name',

            accessAccount: 'You are accessing the account:',
            recoverAccount: 'Recovering password for the account:',
            username: 'Username or e-mail',
            password: 'Password',
            passwordConfirmation: 'Confirm Password',
            remember: 'Remember my credentials',
            login: 'Login',
            recover: 'Recover Password',
            forgotPassword: 'I forgot my password',
            register: 'Register a new account',
            changeAccount: 'Change account',

            importImageButton: 'Select an image',
            importImageLabel: 'Drag and drop images here',

            arrangeFields: 'Arrange Fields',
            arrange: 'Arrange',
            resetToDefault: 'Reset to Default',

            print: 'Print',
            printList: 'Print list',
            exportList: 'Export list',

            more: 'more',
            less: 'less',
            equalsLastPeriod: 'equals than previous period',

            days: 'day(s)',

            phone: 'Phone',
            update: 'Update',
            dismiss: 'Dismiss',

            featuredText: 'Featured',
            promotionText: 'Great Deal',

            bringFront: 'Bring to front',
            sendBack: 'Sento to back',
            copy: 'Copy',
            paste: 'Paste',

            sendEmail: 'Send Email',

        },
        messages: {
            newVersion: 'There is a new version.',

            errorCheckingAccount: 'Cannot access your account. Try again later.',
            accountNotFound: 'Account not found.',
            invalidUserPassword: 'Invalid username or password.',
            accountSuspended: 'Your account is suspended. Call support for more information.',
            errorLogin: 'Cannot login. Try again later.',

            gridErrorHeader: 'Oops! We have a problem.',
            gridErrorText: 'Check your internet connection.',
            gridNotFoundHeader: 'No records found.',
            gridNotFoundText: 'You can also add a new record by clicking the "NEW" button.',

            noRecordsSelected: 'No record(s) selected.',

            deleteMsg: 'Do you really want to delete the selected record(s)?',
            deleteItem: 'Do you really want to delete this item?',
            deleteSuccessMsg: '%s deleted record(s).',
            deleteErrorMsg: 'Error deleting records. Try again later.',
            singleDeleteMsg: 'You can only delete one record at a time on this screen.',

            cancelRecord: 'Do you realy want do cancel?',
            requiredField: 'Required field.',
            saveSuccessMsg: 'Successfully saved.',
            saveValidationError: 'Fill in all required fields before saving.',
            saveErrorMsg: 'Error saving records. Try again later.',

            recoverSuccess: 'The new password has been sent to the user email address.',
            recoverError: 'Error recovering password for this user.',

            registrationError: 'Error creating the new account. Try again later.',
            accountExistsError: 'The account name already exists.',

            fieldTooSmall: 'Value is too small.',
            fieldTooLong: 'Value is too long.',
            invalidFieldValue: 'Invalid value.',
            invalidDateFilter: 'Invalid date range.',
            invalidEmail: 'Invalid email',
            canContainsLettersNumbers: 'The value can only contains letters and numbers.',
            passwordConfirmationDoesntMatch: 'The confirmation doesn`t match.',


            uploadImageDeleteConfirmation: 'Are you sure you want to delete?',
            uploadImageError: 'Error uploading the image.',
            uploadImageTypesWarning: 'Only image files (%s) are acceptable.',
            uploadImageLimitWarning: 'You can only upload %s image(s).',
            uploadImageSizeWarning: 'The max size of the image is %s MB.',
            uploadImageMaxDimensionsWarning: 'The max dimensions of the image is %s.',
            uploadImageMinDimensionsWarning: 'The min dimensions of the image is %s.',

            noItems: 'No items added.',
            duplicatedItems: 'There are duplicate items.',
            noOptions: 'No options',

            errorGettingData: 'Error getting data from server. Try again later.',

            emailSent: 'Email sent.',
            errorSendingEmail: 'Error sending email. Check the email address and try again.',

        },
        coreModules: {
            dashboard: {
                name: "Dashboard"
            },
        }
    },
    modules: {}
}