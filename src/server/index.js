const express = require('express');
const router = express();
var cors = require('cors');
const mongoose = require('mongoose');
const port = 3500;
var moment = require('moment');
const user = require('./user/user');
const bodyParser = require('body-parser');

router.use(cors());
router.use(express.urlencoded());

router.use(express.json());
router.use(bodyParser.json());
router.use('/user', user);

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

var MyModel = mongoose.model(
  'Works_Dailies',
  new Schema({
    userId: String,
    title: {
      type: String,
      text: true,
    },
    isCompleted: Boolean,
    date: Date,
  })
);

const courses = [];

router.get('/:userId/:page/:isSearching/:dataSearching', async (req, res) => {
  try {
    var getToken = false;
    var perPage = 10;
    const uid = req.params.userId;
    const pages = req.params.page;
    const isSearching = req.params.isSearching;
    if (isSearching == 'true') {
      getToken = true;
    } else {
      getToken = false;
    }
    const dataSearching = req.params.dataSearching;
    const fetchData = await MyModel.find({userId: uid});
    console.log('fetchdata:', fetchData);
    const resultSearching = fetchData.find(
      item => item.title !== `${dataSearching}`
    );
    console.log('resultSearching', resultSearching);
    const total_page = Math.floor(Object.keys(fetchData).length / perPage) + 1;
    console.log('Skip value:', Math.abs(perPage * pages) - perPage);
    // const data = await MyModel.find({
    //   title: !getToken ? /.*.*/ : {$regex: `${dataSearching}`},
    // })
    // .skip(perPage * pages - perPage)
    // .limit(perPage);
    const data = !getToken ? fetchData : resultSearching
    res.send({data, total_page});
  } catch (error) {
    console.log('error', error);
  }
});

router.post('/', (req, res) => {
  const course = {
    userId: req.body.userId,
    title: req.body.title,
    isCompleted: req.body.isCompleted,
    date: moment().valueOf(),
  };

  MyModel.create(course)
    .then(() => {
      res.status(200);
      res.send({message: 'successfully', data: course});
      console.log('successfully');
      console.log(courses);
    })
    .catch(err => {
      res.status(404);
      res.send({err});
    });
  courses.push(course);
});

//register to DB
router.post('/register');
router.delete('/', (req, res) => {
  MyModel.deleteOne({_id: req.query.id})
    .then(() => {
      res.status(200);
      res.send({message: 'Successful deletion'});
      console.log('successfully');
    })
    .catch(err => {
      res.status(404);
      res.send({err});
    });
  //   , function (err) {
  //   if (err) console.log(err);
  //   console.log('Successful deletion');
  //   res.send('stupid');
  // });
});

router.put('/:_id', (req, res) => {
  MyModel.findOneAndUpdate(
    {_id: req.params._id},
    {
      $set: {
        isCompleted: req.body.params.isCompleted,
      },
    },
    {
      new: true,
    }
  )
    .then(() => {
      res.status(200);
      res.send({message: 'Successful change'});
      console.log('successful change');
    })
    .catch(err => {
      res.status(404);
      res.send(err);
    });
});

router.listen(port, () => console.log(`Listerning on port ${port}`));

// router.get('/searching/:title',async(req,res)=> {
//    const fetchData = await MyModel.find();
//   var result  = fetchData.filter((item) => {
//     return item.title.toLowerCase().indexOf(req.params.title.toLowerCase()) !== -1
//   })
//   res.send(result);
// })
