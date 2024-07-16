import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import ColorButton from '../../ui/ColorButton';


type DialogProps = {
    caption: string;
    text: string;
    onClickYes?: () => void;
    onClickNo?: () => void;
    isOpen: boolean;
    setOpen?: (val: boolean) => void;
}

const BGDialog: React.FC<DialogProps> = ({ caption, text, onClickYes, onClickNo, isOpen, setOpen }) => {

    const handleClose = (res: boolean) => {
        if (res) {
            if (!!onClickYes)
                onClickYes()
            return;
        }
        if (!!onClickNo)
            onClickNo();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="question-dialog-title"
            aria-describedby="question-dialog-description"
        >
            <DialogTitle id="question-dialog-title">{caption}</DialogTitle>
            <DialogContent>
                <DialogContentText id="question-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ColorButton label="Não" onClick={() => handleClose(false)} color="primary" />
                <ColorButton label="Sim" onClick={() => handleClose(true)} color="primary" />
            </DialogActions>
        </Dialog>
    );
}

export default BGDialog;