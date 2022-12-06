import React, {useState, useEffect, FormEvent} from "react";
import { useRef } from "react";
import "./ScheduleCreateModal.scss";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import createSchedule from "../../../api/createSchedule";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../store/atom";
import dayjs, { Dayjs } from 'dayjs';


import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

type ScheduleCreateModalPropsType = {
    modalShow : any,
    setModalShow : any,
    schedules : any,
    setSchedules : any,
}

const ScheduleCreateModal = ({modalShow, setModalShow, schedules, setSchedules} : ScheduleCreateModalPropsType) => {
    const [accessToken, setAccessToken] = useRecoilState<string>(accessTokenState);
    const [dateFrom, setDateFrom] = React.useState<Dayjs | null>( dayjs(Date.now()) );
    const [dateTo, setDateTo] = React.useState<Dayjs | null>( dayjs(Date.now()) );
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState<boolean>(true);
    // const [showModal, setShowModal] = useState<string>("");

    const modalRef = useRef<HTMLDivElement>(null);

    const onClickOutsideModal = ({e, target} : any) => { 
        e.stopPropagation();
        if (modalShow === "" && (!modalRef.current?.contains(target))){
            setModalShow("none");
        } 
    } 
    
    const onChange = ( e : React.ChangeEvent ) => {
        const target = e.target as HTMLInputElement;
        if (target.id === "title"){
            setTitle(target.value);
        }   
        else if ( target.id === "content" ){
            setContent(target.value);
        }
    }

    const onChangeFromDate = (newValue: Dayjs | null) => {
        setDateFrom(newValue);
    };
    const onChangeToDate = (newValue: Dayjs | null) => {
        setDateTo(newValue);
    };
    useEffect(() => {
        setDateTo(dateFrom);
    }, [dateFrom]);

    const onClickBtn = async( e : React.MouseEvent ) => {
        e.preventDefault();
        
        let _dateFrom : Date = new Date(Date.now());
        let _dateTo : Date = new Date(Date.now());
        if ( dateFrom ){
            _dateFrom = new Date(dateFrom.toString());
        }
        if ( dateTo ){
            _dateTo = new Date(dateTo.toString());
        }
        const res = await createSchedule(accessToken, {dateFrom : _dateFrom, dateTo : _dateTo, title, content, isCompleted, isPublic})
        console.log(res);
        setSchedules([...schedules, res.data]);
        setTitle((prev) => "");
        setContent((prev) =>"");
        setIsCompleted((prev) => false);
        setIsPublic((prev) => true);
        setModalShow((prev : string) => "none");
    }
    
    return (
        <div className="schedule-create-outer-wrapper" onClick={onClickOutsideModal} style={{display : modalShow}}>
            <div className="schedule-create-inner-wrapper" ref={modalRef}>
                <div id="schedule-modal-header">
                    일정 만들기
                    <CloseRoundedIcon className="close-icon" onClick={() => setModalShow("none")}/>
                </div>
                
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" onChange={onChange} value={title}/>
                        <Form.Text className="text-muted">
                        Your schedule will be shown as above.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" placeholder="Content" onChange={onChange} value={content}/>
                        <Form.Text className="text-muted">
                        Write content detail here.
                        </Form.Text>
                    </Form.Group>

                    <LocalizationProvider className="date-picker" dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        value={dateFrom}
                        onChange={onChangeFromDate}
                        renderInput={(params) => <TextField {...params} />}
                        className="date-picker"
                        />
                        <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        value={dateTo}
                        onChange={onChangeToDate}
                        renderInput={(params) => <TextField {...params} />}
                        className="date-picker"
                        />
                        {/* <MobileDatePicker
                        label="Date mobile"
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                        /> */}
                        
                    </Stack>
                    </LocalizationProvider>

                    <FormLabel id="demo-row-radio-buttons-group-label" className="completed-span">Completed ?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="notYet"
                    >   
                        <FormControlLabel value="notYet" control={<Radio />} label="Not yet" onClick={() => setIsCompleted(false)}/>
                        <FormControlLabel value="completed" control={<Radio />} label="Completed" onClick={() => setIsCompleted(true)}/>
                    </RadioGroup>

                    
                    <FormLabel id="demo-row-radio-buttons-group-label" className="public-span">Show public?</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="public"
                    >
                        <FormControlLabel value="public" control={<Radio />} label="Set public" onClick={() => setIsPublic(true)} />
                        <FormControlLabel value="private" control={<Radio />} label="Set private" onClick={() => setIsPublic(false)}/>
                    </RadioGroup>
                    
                    <Button className="submit-btn" variant="primary" type="submit" onClick={onClickBtn}>
                    {/* <Button className="submit-btn" variant="primary" type="submit"> */}
                        Submit
                    </Button>
                </Form>                
            </div>
        </div>
    )
}

export default ScheduleCreateModal;