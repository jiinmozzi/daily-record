export type UserType = {
    uid : string,
    name : string,
    id : string,
    email : string,
    birthday : string,
}

export type SignUpFormType = {
    name : string,
    id : string,
    password : string,
    email : string,
    birthday : string
}

export type ScheduleType = {
    _id : string,    
    user : string,
    dateFrom : Date,
    dateTo : Date,
    title : string,
    content : string,
    createdAt : Date,
    isCompleted : boolean,
    isPublic : boolean,
}