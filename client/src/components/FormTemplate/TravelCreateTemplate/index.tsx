import "./TravelCreateTemplate.scss";
import country from "../../../assets/country.json";
import {useState, useEffect, useRef} from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FileButton from "../../FileButton";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Autocomplete, Stack, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";

const TravelCreateTemplate = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [dateTo, setDateTo] = useState<Date>(new Date());
    const [dateFrom, setDateFrom] = useState<Date>(new Date());
    const [formData, setFormData] = useState<FormData>(new FormData());

    const [dateToValue, setDateToValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const [dateFromValue, setDateFromValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [date, setDate] = useState<Date>();
    

    const handleChangeDateFrom = (newValue: Dayjs | null) => {
        setDateFromValue(newValue);
        if (newValue){
        setDateFrom(new Date(newValue.toString()));
        }
    };
    const handleChangeDateTo = (newValue: Dayjs | null) => {
        setDateToValue(newValue);
        if (newValue){
        setDateTo(new Date(newValue.toString()));
        }
    };

    useEffect(() => {
        console.log(country);
    }, [])

    return (
        <div className="travel-create-template-wrapper">
            <form>
                <label id="visited-country" htmlFor="country">다녀온 국가</label>
                <Stack spacing={2} sx={{ width: 450 }}>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={country}
                        limitTags={3}
                        
                        defaultValue={[country[0]]}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            // label="Multiple values"
                            placeholder="Visited"
                            
                        />
                        )}
                    />
                </Stack>

                <div id="visited-city" className="create-travel-flex-column">
                    <div className="create-travel-text">다녀온 도시</div>
                    <input name="city" id="city" type="text" />
                    <label htmlFor="city" id="city-label">여러 개의 도시일 경우, 쉼표로 구분하여 기입해주세요.( ex. 파리,뮌헨,빈 )</label>
                </div>
                
                
                <div className="create-travel-text">스토리 썸네일</div>
                <FileButton formData={formData} setFormData={setFormData} backgroundColor={"rgba(119,94,226, 0.7)"}/>
                <div className="create-travel-text" >스토리 제목</div>
                <input type="text" className="create-travel-form" id="create-travel-title-form" ref={titleRef} />
                <div className="create-travel-text">스토리 내용</div>
                <textarea className="create-travel-form" id="travel-content-textarea" ref={contentRef} cols={57} ></textarea>

                <div id="create-travel-date-wrapper">
                    <div className="create-travel-form-date-wrapper">
                        <div className="create-travel-date-text">시작일</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Diary Diary"
                                inputFormat="MM/DD/YYYY"
                                value={dateFromValue}
                                onChange={handleChangeDateFrom}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="create-travel-form-data-wrapper">
                        <div className="create-travel-date-text">종료일</div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Diary Diary"
                                inputFormat="MM/DD/YYYY"
                                value={dateToValue}
                                onChange={handleChangeDateTo}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TravelCreateTemplate;