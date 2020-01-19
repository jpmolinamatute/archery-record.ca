/*
global
db: false,
ObjectId: false
*/
db.targets.drop();
db.bows.drop();

db.targets.insert({
    _id: ObjectId().str,
    userid: 'imRbmJQYnMMZAr45w',
    name: 'tactical',
    diameter: '18',
    rings: [
        {
            _id: ObjectId().str,
            color: '#000000',
            label: 'Black',
            point: -1
        },
        {
            _id: ObjectId().str,
            color: '#FFFFFF',
            label: 'White',
            point: 0
        },
        {
            _id: ObjectId().str,
            color: '#0000FF',
            label: 'Blue',
            point: 1
        },
        {
            _id: ObjectId().str,
            color: '#FF0000',
            label: 'Red',
            point: 2
        },
        {
            _id: ObjectId().str,
            color: '#FFFF00',
            label: 'Yellow',
            point: 3
        }
    ]
});

db.targets.insert({
    _id: ObjectId().str,
    userid: 'imRbmJQYnMMZAr45w',
    name: 'official',
    diameter: '18',
    rings: [
        {
            _id: ObjectId().str,
            color: '#FFFFFF',
            label: 'Missed',
            point: 0
        },
        {
            _id: ObjectId().str,
            color: '#FFFFFF',
            label: 'White',
            point: 1
        },
        {
            _id: ObjectId().str,
            color: '#FFFFFF',
            label: 'White',
            point: 2
        },
        {
            _id: ObjectId().str,
            color: '#000000',
            label: 'Black',
            point: 3
        },
        {
            _id: ObjectId().str,
            color: '#000000',
            label: 'Black',
            point: 4
        },
        {
            _id: ObjectId().str,
            color: '#0000FF',
            label: 'Blue',
            point: 5
        },
        {
            _id: ObjectId().str,
            color: '#0000FF',
            label: 'Blue',
            point: 6
        },
        {
            _id: ObjectId().str,
            color: '#FF0000',
            label: 'Red',
            point: 7
        },
        {
            _id: ObjectId().str,
            color: '#FF0000',
            label: 'Red',
            point: 8
        },
        {
            _id: ObjectId().str,
            color: '#FFFF00',
            label: 'Yellow',
            point: 9
        },
        {
            _id: ObjectId().str,
            color: '#FFFF00',
            label: 'Yellow',
            point: 10
        }
    ]
});

db.bows.insert({
    _id: ObjectId().str,
    userid: 'imRbmJQYnMMZAr45w',
    bowtype: 'recurved',
    bowweitght: 34,
    name: 'Awesome'
});
