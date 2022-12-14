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
import saveImage from "../../../api/saveImage";
import createTravelHistory from "../../../api/createTravelHistory";

const TravelCreateTemplate = () => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const cityRef = useRef<HTMLInputElement>(null); 
    const [countries, setCountries] = useState<string[]>([]);

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

    const onChangeCountry = (e : React.SyntheticEvent) => {
        const target = e.target as HTMLElement;
        if (target?.textContent){
            setCountries([...countries, target?.textContent]);
        }
    }
    const createTravel = async(e : React.FormEvent) => {
        e.preventDefault();
        // send image
        const imageRes = await saveImage(formData);
        const imageUrl = imageRes.data.url;
        
        const title = titleRef?.current?.value;
        const content = contentRef?.current?.value;

        if (!title || !content) return;
        
        let cities : string[] = [];
        const _cities = cityRef?.current?.value;
        if (_cities){
            cities = _cities.replaceAll(" ", "").split(',');
        }

        let _dateFrom : Date = new Date(Date.now());
        let _dateTo : Date = new Date(Date.now());
        if ( dateFrom ){
            _dateFrom = new Date(dateFrom.toString());
        }
        if ( dateTo ){
            _dateTo = new Date(dateTo.toString());
        }
        const duration = Math.ceil((_dateTo.getTime() - _dateFrom.getTime()) / (3600*24*1000) + 1);
        const res = await createTravelHistory(accessToken, {
            country : countries,
            city : cities, 
            title : title, 
            comment : content,
            departureDate : _dateFrom,
            arrivalDate : _dateTo,
            duration,
            isPublic : false,
            imageUrl,
        })
        console.log(res);
    }
    
    return (
        <div className="travel-create-template-wrapper">
            <form onSubmit={createTravel}>
                <label id="visited-country" htmlFor="country">????????? ??????</label>
                <Stack spacing={2} sx={{ width: 450 }}>
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={country}
                        limitTags={3}
                        onChange={onChangeCountry}
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
                    <div className="create-travel-text">????????? ??????</div>
                    <input name="city" id="city" type="text" ref={cityRef}/>
                    <label htmlFor="city" id="city-label">?????? ?????? ????????? ??????, ????????? ???????????? ??????????????????.( ex. ??????,??????,??? )</label>
                </div>
                <div className="create-travel-text">????????? ?????????</div>
                <FileButton formData={formData} setFormData={setFormData} backgroundColor={"rgba(119,94,226, 0.7)"}/>
                <div className="create-travel-text" >????????? ??????</div>
                <input type="text" className="create-travel-form" id="create-travel-title-form" ref={titleRef} />
                <div className="create-travel-text">????????? ??????</div>
                <textarea className="create-travel-form" id="travel-content-textarea" ref={contentRef} cols={57} ></textarea>

                <div id="create-travel-date-wrapper">
                    <div className="create-travel-form-date-wrapper">
                        <div className="create-travel-date-text">?????????</div>
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
                        <div className="create-travel-date-text">?????????</div>
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
                <button type="submit" id="create-travel-submit-btn">????????????</button>
            </form>
        </div>
    )
}

export default TravelCreateTemplate;