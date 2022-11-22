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

export type BookType = {
    authors : string[],
    title : string,
    contents : string,
    isbn : string,
    datetime : string,
    price : number,
    thumbnail : string,
}

export type UsersBookType = {
    title : string,
    author : string[],
    genre : string
    imageUrl : string,
    contetns : string,
    comment : string,
    from : Number,
    to : Number,
    createdAt : Date,
    datetime : string,
    rating : Number,
    isCompleted : {type : Boolean, default : false},
    isPublic : {type : Boolean, default : true},
    price : Number,
    
}
export type UsersBookWishListType = {
    title : string,
    authors : string[],
    contents : string,
    datetime : string,
    genre : string,
    imageUrl : string,
    createdAt : string,
    isCompleted : {type : Boolean, default : false},
    ispublic : {type : Boolean, default : true},
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