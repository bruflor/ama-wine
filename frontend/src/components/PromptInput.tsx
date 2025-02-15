import {ChangeEvent, SyntheticEvent, useState} from "react";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface IPromptInputProps {
    variant?: "small" | "large",
    onSubmit: (question: string) => void,
    isDisabled:boolean,
}
export const PromptInput = ({onSubmit, variant="small", isDisabled=false}:IPromptInputProps) => {
    const [question, setQuestion] = useState("");

    const handleSearch = (event: SyntheticEvent | KeyboardEvent | MouseEvent) => {
        event.preventDefault();
        if (question.trim() !== "") {
            onSubmit(question);
            setQuestion('');
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value);
    };


    const inputProps = variant === 'small' ? {
        endAdornment: (
            <InputAdornment position="end" sx={{ color: "textColor.dark" }}>
                <SearchIcon onClick={handleSearch} sx={{ cursor: 'pointer' }} />
            </InputAdornment>
        ),
    } : undefined;

    const textFieldSx = variant === 'large' ? {
        borderRadius: '8px',
        marginTop: '8px',
    } : {
        marginY: '24px',
        minWidth: { sm: '100%', md: '500px' },
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            borderRadius: '64px',
            borderColor: 'borderColor.light',
        },
    };

    const placeholder = variant === 'small' ? "A question, a curiosity, anything you would like to know" : "";

    return (
        <TextField
            id="search-bar-round"
            fullWidth={variant === 'large'}
            multiline={variant === 'large'}
            minRows={variant === 'large' ? 2 : undefined}
            maxRows={variant === 'large' ? 6 : undefined}
            disabled={isDisabled}
            placeholder={placeholder}
            value={question}
            onChange={handleChange}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    handleSearch(event);
                }
            }}
            slotProps={{ input: inputProps }}
            variant="outlined"
            sx={{ ...textFieldSx}}
        />
    );
}