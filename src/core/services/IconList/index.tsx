import {
    AccountBalance, AccountBalanceWallet, AirplanemodeActive,
    Album, AlternateEmail, Apartment, Apps, Apple, DirectionsCar, DirectionsBike, DirectionsWalk,
    Assignment, AttachMoney, Audiotrack, DirectionsBoat,
    BatteryCharging80, BeachAccess, Block, Bluetooth,
    Brightness2, BrightnessHigh, Brush, BugReport, Build,
    BusinessCenter, Cake, Phone, PhoneIphone, CameraAlt,
    AddCircle, CheckCircle, RemoveCircle, Help,
    Info, PlayCircleFilled, Stars, WhatsApp, Facebook, Instagram,
    Cancel, Category, Cloud, Computer, Search,
    Copyright, CreditCard, Create, Dashboard, Delete,
    Description, Dns, Email, EmojiEmotions, EmojiEvents,
    Equalizer, Explore, Extension, Code,
    Fastfood, Favorite, FilterList, Fingerprint, Folder,
    Group, Keyboard, LocalOffer, LocalCafe, LocalHospital,
    LocalGasStation, LocalGroceryStore, LocalPrintshop, LocalShipping, Lock,
    Mic, Notifications, PieChart, Public,
    Restaurant, Save, Store, ThumbDown, ThumbUp, Power, MenuBook,

    ArrowBack, ArrowForward, CompareArrows, Cached, Gamepad, AccessTimeFilled, LocalAtm, Money, Savings, Bolt,
    Today, Settings, ShoppingBasket, FilterAlt, Mouse, Gavel, DeviceThermostat, NetworkWifi, HeadsetMic, Balance, Hardware, Lightbulb, Handyman, RocketLaunch, Visibility, StopCircle, Send, Pix, PauseCircle, VerifiedUser,
    Task,
    AllInclusive,
    CalendarMonth,
    EventAvailable,
    EventBusy,
    EventRepeat,
    Numbers,
    Payments,
    Receipt,
    Scale,
    PushPin,
    CircleNotifications,
    Diamond,
    AcUnit,
    LocalFireDepartment,
    Grade,
    Woman,
    Accessible,
    DocumentScanner,
    InsertPageBreak,
    NewReleases,
    Image,
    RequestPage,
    Calculate,
    Percent,

} from "@mui/icons-material";

const colCount = 6;

export const Icons = [

    // Money
    <LocalAtm />, <Money />, <Payments />, <AttachMoney />, <CreditCard />, <RequestPage />, <Pix />, <AccountBalanceWallet />, <Savings />, <Balance />,
    <Percent />, <Calculate />,

    // Places
    <AccountBalance />, <Apartment />, <Store />,

    // Veicules
    <DirectionsCar />, <AirplanemodeActive />, <DirectionsBoat />, <LocalShipping />, <RocketLaunch />,

    // Pessoas
    <DirectionsBike />, <DirectionsWalk />, <Woman />, <Accessible />,

    // Despesas
    <LocalGroceryStore />, <Restaurant />, <Fastfood />, <LocalGasStation />,

    // Ferramentas
    <Build />, <Handyman />, <Hardware />, <Scale />, <Lightbulb />,

    //Signs
    <LocalHospital />, <AddCircle />, <RemoveCircle />, <CheckCircle />, <Cancel />, <Help />, <Info />, <PlayCircleFilled />, <PauseCircle />,
    <StopCircle />, <Stars />, <Explore />, <CircleNotifications />,

    // Time
    <AccessTimeFilled />, <CalendarMonth />, <Today />, <EventAvailable />, <EventBusy />, <EventRepeat />, <Visibility />, <Public />,

    // Devices
    <MenuBook />, <DocumentScanner />, <InsertPageBreak />, <Power />, <Bolt />, <Computer />, <Phone />, <PhoneIphone />, <CameraAlt />, <Audiotrack />, <BatteryCharging80 />, <Bluetooth />, <LocalPrintshop />, <Keyboard />,
    <Mouse />, <Mic />, <HeadsetMic />, <Notifications />,

    // Internet
    <Cloud />, <Email />, <Send />, <Apple />, <WhatsApp />, <Facebook />, <Instagram />, <ThumbDown />, <ThumbUp />, <Numbers />, <AlternateEmail />,

    // Security
    <Lock />, <Fingerprint />, <VerifiedUser />, <Block />,

    // Lazer
    <LocalCafe />, <Cake />, <DeviceThermostat />, <BrightnessHigh />, <Brightness2 />, <Grade />, <BeachAccess />, <Album />, <Gamepad />, <Favorite />, <EmojiEmotions />, <EmojiEvents />, <Brush />,

    // Formas
    <Category />, <AllInclusive />, <AcUnit />, <LocalFireDepartment />, <Diamond />,

    // Negócios
    <ShoppingBasket />, <Receipt />, <Assignment />, <Equalizer />, <BusinessCenter />, <LocalOffer />, <NewReleases />, <PushPin />, <PieChart />,

    // Develop
    <Apps />, <Dashboard />, <BugReport />, <Extension />, <Code />,

    // Folders and Files
    <Description />, <Task />, <Image />, <Folder />, <Create />, <Save />, <Delete />, <Search />, <FilterAlt />, <FilterList />, <Settings />, <Dns />, <NetworkWifi />, <Copyright />, <Group />,

    // others
    <Gavel />, <ArrowBack />, <ArrowForward />, <CompareArrows />, <Cached />,
];


export const Names = [

    // Money
    'LocalAtm', 'Money', 'Payments', 'AttachMoney', 'CreditCard', 'RequestPage', 'Pix', 'AccountBalanceWallet', 'Savings', 'Balance', 'Percent', 'Calculate',

    // Places
    'AccountBalance', 'Apartment', 'Store',

    // Veicules
    'DirectionsCar', 'AirplanemodeActive', 'DirectionsBoat', 'LocalShipping', 'RocketLaunch',

    // Pessoas
    'DirectionsBike', 'DirectionsWalk', 'Woman', 'Accessible',

    // Despesas
    'LocalGroceryStore', 'Restaurant', 'Fastfood', 'LocalGasStation',

    // Ferramentas
    'Build', 'Handyman', 'Hardware', 'Scale', 'Lightbulb',

    //Signs
    'LocalHospital', 'AddCircle', 'RemoveCircle', 'CheckCircle', 'Cancel', 'Help', 'Info', 'PlayCircleFilled', 'PauseCircle', 'StopCircle', 'Stars', 'Explore', 'CircleNotifications',

    // Time
    'AccessTimeFilled', 'CalendarMonth', 'Today', 'EventAvailable', 'EventBusy', 'EventRepeat', 'Visibility', 'Public',

    // Devices
    'MenuBook', 'DocumentScanner', 'InsertPageBreak', 'Power', 'Bolt', 'Computer', 'Phone', 'PhoneIphone', 'CameraAlt', 'Audiotrack', 'BatteryCharging80', 'Bluetooth', 'LocalPrintshop', 'Keyboard',
    'Mouse', 'Mic', 'HeadsetMic', 'Notifications',

    // Internet
    'Cloud', 'Email', 'Send', 'Apple', 'WhatsApp', 'Facebook', 'Instagram', 'ThumbDown', 'ThumbUp', 'Numbers', 'AlternateEmail',

    // Security
    'Lock', 'Fingerprint', 'VerifiedUser', 'Block',

    // Lazer
    'LocalCafe', 'Cake', 'DeviceThermostat', 'BrightnessHigh', 'Brightness2', 'Grade', 'BeachAccess', 'Album', 'Gamepad', 'Favorite', 'EmojiEmotions', 'EmojiEvents', 'Brush',

    // Formas
    'Category', 'AllInclusive', 'AcUnit', 'LocalFireDepartment', 'Diamond',

    // Negócios
    'ShoppingBasket', 'Receipt', 'Assignment', 'Equalizer', 'BusinessCenter', 'LocalOffer', 'NewReleases', 'PushPin', 'PieChart',

    // Develop
    'Apps', 'Dashboard', 'BugReport', 'Extension', 'Code',

    // Folder and Files
    'Description', 'Task', 'Image', 'Folder', 'Create', 'Save', 'Delete', 'Search', 'FilterAlt', 'FilterList', 'Settings', 'Dns', 'NetworkWifi', 'Copyright', 'Group',

    // others
    'Gavel', 'ArrowBack', 'ArrowForward', 'CompareArrows', 'Cached',
];

export const getIconLine = (index: number) => {
    let idx = index;
    if (idx === -1)
        idx = 0;
    const rest = idx % colCount;
    const min = idx - rest;
    let list: number[] = [];
    for (let i = 0; i < colCount; i++)
        list.push(i + min);
    return list;
};

export const getIconIndex = (name: string) => {
    return Names.indexOf(name);
}

export const getIcon = (name?: string) => {
    if (!name)
        return undefined;
    const idx = getIconIndex(name);
    if (idx > 0)
        return Icons[idx];
    return undefined;
}

const IconList = {
    Icons,
    Names,
    getIconLine
};

export default IconList;